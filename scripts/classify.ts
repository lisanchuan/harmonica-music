import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

// Types
enum HarmonicaType {
  CHROMATIC_12_HOLE = 'chromatic_12_hole',
  DIATONIC_10_HOLE = 'diatonic_10_hole',
  UNKNOWN = 'unknown'
}

enum Style {
  FOLK = 'folk',
  BLUES = 'blues',
  CLASSICAL = 'classical',
  POP = 'pop',
  JAZZ = 'jazz',
  ROCK = 'rock',
  COUNTRY = 'country',
  WORLD = 'world',
  CHILDREN = 'children',
  SACRED = 'sacred',
  OTHER = 'other'
}

interface Song {
  resource_id: string;
  title: string;
  img_url: string;
  view_count: string;
  price: number;
  line_price: number;
  localImage?: string;
  localAudio?: string;
  localAccompaniment?: string;
  src_id?: string;
  jump_url?: string;
  type?: string;
  spu_id?: string;
  payment_type?: string;
  lesson_start_at?: string;
  is_public?: boolean;
  has_buy?: boolean;
  harmonicaType?: HarmonicaType;
  style?: Style[];
}

// Paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const SONGS_FILE = path.join(DATA_DIR, 'songs.json');
const OCR_CACHE_FILE = path.join(__dirname, 'ocr-cache.json');
const MB_CACHE_FILE = path.join(__dirname, 'musicbrainz-cache.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Baidu OCR config
const BAIDU_API_KEY = process.env.BAIDU_OCR_API_KEY || '';
const BAIDU_SECRET_KEY = process.env.BAIDU_OCR_SECRET_KEY || '';

// Load songs
function loadSongs(): Song[] {
  const data = fs.readFileSync(SONGS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save songs
function saveSongs(songs: Song[]): void {
  fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2), 'utf-8');
}

// Load cache
function loadCache(file: string): Record<string, any> {
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  return {};
}

// Save cache
function saveCache(file: string, cache: Record<string, any>): void {
  fs.writeFileSync(file, JSON.stringify(cache, null, 2), 'utf-8');
}

// HTTP/HTTPS request helper
function httpRequest(url: string, method: string = 'GET', data?: string, headers?: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    const options: any = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method,
      headers: data
        ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(data) }
        : {}
    };

    // Merge custom headers
    if (headers) {
      options.headers = { ...options.headers, ...headers };
    }

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(body));
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Get Baidu access token
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getBaiduToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  console.log('Getting Baidu access token...');
  const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`;
  const response = await httpRequest(url);
  const data = JSON.parse(response);

  if (data.access_token) {
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return data.access_token;
  }

  throw new Error(`Failed to get Baidu token: ${JSON.stringify(data)}`);
}

// OCR image using Baidu
async function ocrImage(imagePath: string): Promise<string> {
  const token = await getBaiduToken();
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString('base64');

  // Use webimage endpoint which supports general OCR
  const url = `https://aip.baidubce.com/rest/2.0/ocr/v1/webimage?access_token=${token}`;
  const body = `image=${encodeURIComponent(base64Image)}`;

  const response = await httpRequest(url, 'POST', body);
  const data = JSON.parse(response);

  if (data.error_code) {
    console.error(`OCR API error: ${data.error_code} - ${data.error_msg}`);
    return '';
  }

  if (data.words_result) {
    return data.words_result.map((w: any) => w.words).join(' ');
  }

  return '';
}

// Classify harmonica type from OCR text
function classifyHarmonicaType(text: string): HarmonicaType {
  const upperText = text.toUpperCase();
  const lowerText = text.toLowerCase();

  // Explicit chromatic keywords
  if (/半音阶|十二孔|12孔|chromatic/i.test(text)) {
    return HarmonicaType.CHROMATIC_12_HOLE;
  }

  // Explicit diatonic keywords
  if (/十孔|diatonic|paddy|蓝调口琴/i.test(text)) {
    return HarmonicaType.DIATONIC_10_HOLE;
  }

  // If "口琴" is mentioned but not chromatic, assume diatonic
  if (/口琴/i.test(text)) {
    return HarmonicaType.DIATONIC_10_HOLE;
  }

  return HarmonicaType.UNKNOWN;
}

// Query MusicBrainz for style
async function queryMusicBrainz(title: string): Promise<Style[]> {
  const cache = loadCache(MB_CACHE_FILE);
  const cacheKey = title.toLowerCase().trim();

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    // Encode title for URL
    const encodedTitle = encodeURIComponent(title);
    const url = `https://musicbrainz.org/ws/2/recording/?query=title:"${encodedTitle}"&fmt=json&limit=1`;

    // MusicBrainz requires a User-Agent header
    const response = await httpRequest(url, 'GET', undefined, {
      'User-Agent': 'HarmonicaMusicClassifier/1.0.0 (harmonica-music@example.com)'
    });
    const data = JSON.parse(response);

    const styles: Style[] = [];

    if (data.recordings && data.recordings.length > 0) {
      const recording = data.recordings[0];

      // MusicBrainz tags to Style mapping
      const tagMap: Record<string, Style> = {
        folk: Style.FOLK,
        blues: Style.BLUES,
        classical: Style.CLASSICAL,
        'symphony': Style.CLASSICAL,
        pop: Style.POP,
        'pop rock': Style.POP,
        jazz: Style.JAZZ,
        rock: Style.ROCK,
        country: Style.COUNTRY,
        world: Style.WORLD,
        'children': Style.CHILDREN,
        'children\'s': Style.CHILDREN,
        sacred: Style.SACRED,
        hymn: Style.SACRED,
      };

      if (recording.tags) {
        for (const tag of recording.tags) {
          const normalizedTag = tag.name.toLowerCase();
          if (tagMap[normalizedTag]) {
            styles.push(tagMap[normalizedTag]);
          }
        }
      }
    }

    // Deduplicate
    const uniqueStyles = [...new Set(styles)];

    // Cache result (even if empty)
    cache[cacheKey] = uniqueStyles;
    saveCache(MB_CACHE_FILE, cache);

    return uniqueStyles;
  } catch (error) {
    console.error(`MusicBrainz error for "${title}":`, error);
    return [];
  }
}

// Phase 1: OCR only - classify harmonicaType
async function phase1OCR(startIndex: number = 0, limit?: number): Promise<void> {
  const songs = loadSongs();
  const ocrCache = loadCache(OCR_CACHE_FILE);

  const total = limit ? Math.min(startIndex + limit, songs.length) : songs.length;
  let ocrCount = 0;

  console.log(`[Phase 1] OCR classification: ${total - startIndex} songs (${startIndex} to ${total})`);

  for (let i = startIndex; i < total; i++) {
    const song = songs[i];
    const imageName = `${song.resource_id}.jpg`;
    const imagePath = path.join(IMAGES_DIR, imageName);

    // Progress log
    if ((i - startIndex + 1) % 50 === 0 || i === total - 1) {
      console.log(`[Phase 1] Progress: ${i - startIndex + 1}/${total - startIndex}`);
    }

    // Skip if already classified
    if (song.harmonicaType && song.harmonicaType !== HarmonicaType.UNKNOWN) {
      continue;
    }

    if (!ocrCache[song.resource_id]) {
      if (fs.existsSync(imagePath)) {
        try {
          const ocrText = await ocrImage(imagePath);
          ocrCache[song.resource_id] = ocrText;
          saveCache(OCR_CACHE_FILE, ocrCache);
          ocrCount++;
        } catch (error) {
          console.error(`OCR error for ${song.resource_id}:`, error);
        }
      }
    }

    const ocrText = ocrCache[song.resource_id] || '';
    if (ocrText) {
      song.harmonicaType = classifyHarmonicaType(ocrText);
    }
  }

  saveSongs(songs);
  console.log(`[Phase 1] Complete! OCR calls: ${ocrCount}`);
}

// Phase 2: MusicBrainz only - get style
async function phase2MusicBrainz(startIndex: number = 0, limit?: number): Promise<void> {
  const songs = loadSongs();
  const mbCache = loadCache(MB_CACHE_FILE);

  const total = limit ? Math.min(startIndex + limit, songs.length) : songs.length;
  let mbCount = 0;

  console.log(`[Phase 2] MusicBrainz classification: ${total - startIndex} songs (${startIndex} to ${total})`);

  for (let i = startIndex; i < total; i++) {
    const song = songs[i];

    // Progress log
    if ((i - startIndex + 1) % 10 === 0 || i === total - 1) {
      console.log(`[Phase 2] Progress: ${i - startIndex + 1}/${total - startIndex}`);
    }

    // Skip if already has style
    if (song.style && song.style.length > 0) {
      continue;
    }

    const styles = await queryMusicBrainz(song.title);
    if (styles.length > 0) {
      song.style = styles;
      mbCount++;
    }

    // Rate limiting for MusicBrainz (1 req/sec)
    await new Promise(resolve => setTimeout(resolve, 1100));
  }

  saveSongs(songs);
  console.log(`[Phase 2] Complete! MusicBrainz calls: ${mbCount}`);
}

// Main classification
async function classifySongs(startIndex: number = 0, limit?: number): Promise<void> {
  await phase1OCR(startIndex, limit);
  await phase2MusicBrainz(startIndex, limit);
  console.log(`\nAll phases complete!`);
}

// CLI args: node classify.ts <phase> <start> <limit>
// phase: 1 = OCR only, 2 = MusicBrainz only, all = both (default)
const phase = process.argv[2] || 'all';
const startIndex = parseInt(process.argv[3] || '0', 10);
const limit = process.argv[4] ? parseInt(process.argv[4], 10) : undefined;

async function main() {
  switch (phase) {
    case '1':
      await phase1OCR(startIndex, limit);
      break;
    case '2':
      await phase2MusicBrainz(startIndex, limit);
      break;
    default:
      await classifySongs(startIndex, limit);
  }
}

main().catch(console.error);
