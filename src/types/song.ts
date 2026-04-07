export enum HarmonicaType {
  CHROMATIC_12_HOLE = 'chromatic_12_hole',
  DIATONIC_10_HOLE = 'diatonic_10_hole',
  UNKNOWN = 'unknown'
}

export enum Style {
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

export type Instrument = 'harmonica' | 'ukulele';
export type SongSource = 'original' | 'wechat_mp';

export interface Song {
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

  // 扩展字段：支持微信公众号来源
  source?: SongSource;
  mp_id?: string;
  mp_name?: string;
  summary?: string;
  content?: string;          // HTML曲谱内容（白熊音乐）
  external_url?: string;     // 原文链接
  published_at?: string;     // 发布时间
  instrument?: Instrument;   // 乐器类型
}
