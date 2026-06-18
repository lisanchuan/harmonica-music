function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const formatDistanceLocale$u = {
  lessThanXSeconds: {
    one: "أقل من ثانية واحدة",
    two: "أقل من ثانتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية واحدة",
    two: "ثانتين",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نصف دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقائق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة واحدة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقائق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة واحدة تقريباً",
    two: "ساعتين تقريباً",
    threeToTen: "{{count}} ساعات تقريباً",
    other: "{{count}} ساعة تقريباً"
  },
  xHours: {
    one: "ساعة واحدة",
    two: "ساعتين",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم واحد",
    two: "يومين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "أسبوع واحد تقريباً",
    two: "أسبوعين تقريباً",
    threeToTen: "{{count}} أسابيع تقريباً",
    other: "{{count}} أسبوع تقريباً"
  },
  xWeeks: {
    one: "أسبوع واحد",
    two: "أسبوعين",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوع"
  },
  aboutXMonths: {
    one: "شهر واحد تقريباً",
    two: "شهرين تقريباً",
    threeToTen: "{{count}} أشهر تقريباً",
    other: "{{count}} شهر تقريباً"
  },
  xMonths: {
    one: "شهر واحد",
    two: "شهرين",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  },
  xYears: {
    one: "عام واحد",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من عام",
    two: "أكثر من عامين",
    threeToTen: "أكثر من {{count}} أعوام",
    other: "أكثر من {{count}} عام"
  },
  almostXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  }
};
const formatDistance$u = (token, count, options) => {
  options = options || {};
  const usageGroup = formatDistanceLocale$u[token];
  let result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace("{{count}}", String(count));
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في خلال " + result;
    } else {
      return "منذ " + result;
    }
  }
  return result;
};
const dateFormats$v = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats$v = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$v = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$v = {
  date: buildFormatLongFn({
    formats: dateFormats$v,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$v,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$v,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$u = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: "P"
};
const formatRelative$u = (token, _date, _baseDate, _options) => {
  return formatRelativeLocale$u[token];
};
const eraValues$u = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
const quarterValues$u = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
const monthValues$u = {
  narrow: ["ج", "ف", "م", "أ", "م", "ج", "ج", "أ", "س", "أ", "ن", "د"],
  abbreviated: [
    "جانـ",
    "فيفـ",
    "مارس",
    "أفريل",
    "مايـ",
    "جوانـ",
    "جويـ",
    "أوت",
    "سبتـ",
    "أكتـ",
    "نوفـ",
    "ديسـ"
  ],
  wide: [
    "جانفي",
    "فيفري",
    "مارس",
    "أفريل",
    "ماي",
    "جوان",
    "جويلية",
    "أوت",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
  ]
};
const dayValues$u = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنـ", "ثلا", "أربـ", "خميـ", "جمعة", "سبت"],
  wide: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  ]
};
const dayPeriodValues$u = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  }
};
const formattingDayPeriodValues$p = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "في الصباح",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  }
};
const ordinalNumber$u = (dirtyNumber) => {
  return String(dirtyNumber);
};
const localize$u = {
  ordinalNumber: ordinalNumber$u,
  era: buildLocalizeFn({
    values: eraValues$u,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$u,
    defaultWidth: "wide",
    argumentCallback: (quarter) => Number(quarter) - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$u,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$u,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$u,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$p,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$u = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$u = /\d+/i;
const matchEraPatterns$u = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
const parseEraPatterns$u = {
  any: [/^قبل/i, /^بعد/i]
};
const matchQuarterPatterns$u = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
const parseQuarterPatterns$u = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$u = {
  narrow: /^[جفمأسند]/i,
  abbreviated: /^(جان|فيف|مار|أفر|ماي|جوا|جوي|أوت|سبت|أكت|نوف|ديس)/i,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/i
};
const parseMonthPatterns$u = {
  narrow: [
    /^ج/i,
    /^ف/i,
    /^م/i,
    /^أ/i,
    /^م/i,
    /^ج/i,
    /^ج/i,
    /^أ/i,
    /^س/i,
    /^أ/i,
    /^ن/i,
    /^د/i
  ],
  any: [
    /^جان/i,
    /^فيف/i,
    /^مار/i,
    /^أفر/i,
    /^ماي/i,
    /^جوا/i,
    /^جوي/i,
    /^أوت/i,
    /^سبت/i,
    /^أكت/i,
    /^نوف/i,
    /^ديس/i
  ]
};
const matchDayPatterns$u = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
const parseDayPatterns$u = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [
    /^الأحد/i,
    /^الاثنين/i,
    /^الثلاثاء/i,
    /^الأربعاء/i,
    /^الخميس/i,
    /^الجمعة/i,
    /^السبت/i
  ],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
const matchDayPeriodPatterns$u = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns$u = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match$u = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$u,
    parsePattern: parseOrdinalNumberPattern$u,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$u,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$u,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$u,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$u,
    defaultParseWidth: "any",
    valueCallback: (index) => Number(index) + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$u,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$u,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$u,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$u,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$u,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$u,
    defaultParseWidth: "any"
  })
};
const arDZ = {
  code: "ar-DZ",
  formatDistance: formatDistance$u,
  formatLong: formatLong$v,
  formatRelative: formatRelative$u,
  localize: localize$u,
  match: match$u,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$t = {
  lessThanXSeconds: {
    one: "bir saniyədən az",
    other: "{{count}} bir saniyədən az"
  },
  xSeconds: {
    one: "1 saniyə",
    other: "{{count}} saniyə"
  },
  halfAMinute: "yarım dəqiqə",
  lessThanXMinutes: {
    one: "bir dəqiqədən az",
    other: "{{count}} bir dəqiqədən az"
  },
  xMinutes: {
    one: "bir dəqiqə",
    other: "{{count}} dəqiqə"
  },
  aboutXHours: {
    one: "təxminən 1 saat",
    other: "təxminən {{count}} saat"
  },
  xHours: {
    one: "1 saat",
    other: "{{count}} saat"
  },
  xDays: {
    one: "1 gün",
    other: "{{count}} gün"
  },
  aboutXWeeks: {
    one: "təxminən 1 həftə",
    other: "təxminən {{count}} həftə"
  },
  xWeeks: {
    one: "1 həftə",
    other: "{{count}} həftə"
  },
  aboutXMonths: {
    one: "təxminən 1 ay",
    other: "təxminən {{count}} ay"
  },
  xMonths: {
    one: "1 ay",
    other: "{{count}} ay"
  },
  aboutXYears: {
    one: "təxminən 1 il",
    other: "təxminən {{count}} il"
  },
  xYears: {
    one: "1 il",
    other: "{{count}} il"
  },
  overXYears: {
    one: "1 ildən çox",
    other: "{{count}} ildən çox"
  },
  almostXYears: {
    one: "demək olar ki 1 il",
    other: "demək olar ki {{count}} il"
  }
};
const formatDistance$t = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$t[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " sonra";
    } else {
      return result + " əvvəl";
    }
  }
  return result;
};
const dateFormats$u = {
  full: "EEEE, do MMMM y 'il'",
  long: "do MMMM y 'il'",
  medium: "d MMM y 'il'",
  short: "dd.MM.yyyy"
};
const timeFormats$u = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$u = {
  full: "{{date}} {{time}} - 'də'",
  long: "{{date}} {{time}} - 'də'",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$u = {
  date: buildFormatLongFn({
    formats: dateFormats$u,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$u,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$u,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$t = {
  lastWeek: "'sonuncu' eeee p -'də'",
  yesterday: "'dünən' p -'də'",
  today: "'bugün' p -'də'",
  tomorrow: "'sabah' p -'də'",
  nextWeek: "eeee p -'də'",
  other: "P"
};
const formatRelative$t = (token, _date, _baseDate, _options) => formatRelativeLocale$t[token];
const eraValues$t = {
  narrow: ["e.ə", "b.e"],
  abbreviated: ["e.ə", "b.e"],
  wide: ["eramızdan əvvəl", "bizim era"]
};
const quarterValues$t = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1ci kvartal", "2ci kvartal", "3cü kvartal", "4cü kvartal"]
};
const monthValues$t = {
  narrow: ["Y", "F", "M", "A", "M", "İ", "İ", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Yan",
    "Fev",
    "Mar",
    "Apr",
    "May",
    "İyun",
    "İyul",
    "Avq",
    "Sen",
    "Okt",
    "Noy",
    "Dek"
  ],
  wide: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr"
  ]
};
const dayValues$t = {
  narrow: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
  short: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
  abbreviated: ["Baz", "Baz.e", "Çər.a", "Çər", "Cüm.a", "Cüm", "Şə"],
  wide: [
    "Bazar",
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə"
  ]
};
const dayPeriodValues$t = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  }
};
const formattingDayPeriodValues$o = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  }
};
const suffixes = {
  1: "-inci",
  5: "-inci",
  8: "-inci",
  70: "-inci",
  80: "-inci",
  2: "-nci",
  7: "-nci",
  20: "-nci",
  50: "-nci",
  3: "-üncü",
  4: "-üncü",
  100: "-üncü",
  6: "-ncı",
  9: "-uncu",
  10: "-uncu",
  30: "-uncu",
  60: "-ıncı",
  90: "-ıncı"
};
const getSuffix = (number) => {
  if (number === 0) {
    return number + "-ıncı";
  }
  const a = number % 10;
  const b = number % 100 - a;
  const c = number >= 100 ? 100 : null;
  if (suffixes[a]) {
    return suffixes[a];
  } else if (suffixes[b]) {
    return suffixes[b];
  } else if (c !== null) {
    return suffixes[c];
  }
  return "";
};
const ordinalNumber$t = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const suffix = getSuffix(number);
  return number + suffix;
};
const localize$t = {
  ordinalNumber: ordinalNumber$t,
  era: buildLocalizeFn({
    values: eraValues$t,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$t,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$t,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$t,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$t,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$o,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$t = /^(\d+)(-?(ci|inci|nci|uncu|üncü|ncı))?/i;
const parseOrdinalNumberPattern$t = /\d+/i;
const matchEraPatterns$t = {
  narrow: /^(b|a)$/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)$/i,
  wide: /^(bizim eradan əvvəl|bizim era)$/i
};
const parseEraPatterns$t = {
  any: [/^b$/i, /^(a|c)$/i]
};
const matchQuarterPatterns$t = {
  narrow: /^[1234]$/i,
  abbreviated: /^K[1234]$/i,
  wide: /^[1234](ci)? kvartal$/i
};
const parseQuarterPatterns$t = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$t = {
  narrow: /^[(?-i)yfmaisond]$/i,
  abbreviated: /^(Yan|Fev|Mar|Apr|May|İyun|İyul|Avq|Sen|Okt|Noy|Dek)$/i,
  wide: /^(Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avgust|Sentyabr|Oktyabr|Noyabr|Dekabr)$/i
};
const parseMonthPatterns$t = {
  narrow: [
    /^[(?-i)y]$/i,
    /^[(?-i)f]$/i,
    /^[(?-i)m]$/i,
    /^[(?-i)a]$/i,
    /^[(?-i)m]$/i,
    /^[(?-i)i]$/i,
    /^[(?-i)i]$/i,
    /^[(?-i)a]$/i,
    /^[(?-i)s]$/i,
    /^[(?-i)o]$/i,
    /^[(?-i)n]$/i,
    /^[(?-i)d]$/i
  ],
  abbreviated: [
    /^Yan$/i,
    /^Fev$/i,
    /^Mar$/i,
    /^Apr$/i,
    /^May$/i,
    /^İyun$/i,
    /^İyul$/i,
    /^Avg$/i,
    /^Sen$/i,
    /^Okt$/i,
    /^Noy$/i,
    /^Dek$/i
  ],
  wide: [
    /^Yanvar$/i,
    /^Fevral$/i,
    /^Mart$/i,
    /^Aprel$/i,
    /^May$/i,
    /^İyun$/i,
    /^İyul$/i,
    /^Avgust$/i,
    /^Sentyabr$/i,
    /^Oktyabr$/i,
    /^Noyabr$/i,
    /^Dekabr$/i
  ]
};
const matchDayPatterns$t = {
  narrow: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  short: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  abbreviated: /^(Baz\.e|Çər|Çər\.a|Cüm|Cüm\.a|Şə)$/i,
  wide: /^(Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə)$/i
};
const parseDayPatterns$t = {
  narrow: [
    /^B\.$/i,
    /^B\.e$/i,
    /^Ç\.a$/i,
    /^Ç\.$/i,
    /^C\.a$/i,
    /^C\.$/i,
    /^Ş\.$/i
  ],
  abbreviated: [
    /^Baz$/i,
    /^Baz\.e$/i,
    /^Çər\.a$/i,
    /^Çər$/i,
    /^Cüm\.a$/i,
    /^Cüm$/i,
    /^Şə$/i
  ],
  wide: [
    /^Bazar$/i,
    /^Bazar ertəsi$/i,
    /^Çərşənbə axşamı$/i,
    /^Çərşənbə$/i,
    /^Cümə axşamı$/i,
    /^Cümə$/i,
    /^Şənbə$/i
  ],
  any: [
    /^B\.$/i,
    /^B\.e$/i,
    /^Ç\.a$/i,
    /^Ç\.$/i,
    /^C\.a$/i,
    /^C\.$/i,
    /^Ş\.$/i
  ]
};
const matchDayPeriodPatterns$t = {
  narrow: /^(a|p|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i,
  any: /^(am|pm|a\.m\.|p\.m\.|AM|PM|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i
};
const parseDayPeriodPatterns$t = {
  any: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /^gecəyarı$/i,
    noon: /^gün$/i,
    morning: /səhər$/i,
    afternoon: /gündüz$/i,
    evening: /axşam$/i,
    night: /gecə$/i
  }
};
const match$t = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$t,
    parsePattern: parseOrdinalNumberPattern$t,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$t,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$t,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$t,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$t,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$t,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$t,
    defaultParseWidth: "narrow"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$t,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$t,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$t,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$t,
    defaultParseWidth: "any"
  })
};
const az = {
  code: "az",
  formatDistance: formatDistance$t,
  formatLong: formatLong$u,
  formatRelative: formatRelative$t,
  localize: localize$t,
  match: match$t,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const constructFromSymbol = Symbol.for("constructDateFrom");
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
}
const formatDistanceLocale$s = {
  lessThanXSeconds: {
    one: {
      regular: "méně než 1 sekunda",
      past: "před méně než 1 sekundou",
      future: "za méně než 1 sekundu"
    },
    few: {
      regular: "méně než {{count}} sekundy",
      past: "před méně než {{count}} sekundami",
      future: "za méně než {{count}} sekundy"
    },
    many: {
      regular: "méně než {{count}} sekund",
      past: "před méně než {{count}} sekundami",
      future: "za méně než {{count}} sekund"
    }
  },
  xSeconds: {
    one: {
      regular: "1 sekunda",
      past: "před 1 sekundou",
      future: "za 1 sekundu"
    },
    few: {
      regular: "{{count}} sekundy",
      past: "před {{count}} sekundami",
      future: "za {{count}} sekundy"
    },
    many: {
      regular: "{{count}} sekund",
      past: "před {{count}} sekundami",
      future: "za {{count}} sekund"
    }
  },
  halfAMinute: {
    type: "other",
    other: {
      regular: "půl minuty",
      past: "před půl minutou",
      future: "za půl minuty"
    }
  },
  lessThanXMinutes: {
    one: {
      regular: "méně než 1 minuta",
      past: "před méně než 1 minutou",
      future: "za méně než 1 minutu"
    },
    few: {
      regular: "méně než {{count}} minuty",
      past: "před méně než {{count}} minutami",
      future: "za méně než {{count}} minuty"
    },
    many: {
      regular: "méně než {{count}} minut",
      past: "před méně než {{count}} minutami",
      future: "za méně než {{count}} minut"
    }
  },
  xMinutes: {
    one: {
      regular: "1 minuta",
      past: "před 1 minutou",
      future: "za 1 minutu"
    },
    few: {
      regular: "{{count}} minuty",
      past: "před {{count}} minutami",
      future: "za {{count}} minuty"
    },
    many: {
      regular: "{{count}} minut",
      past: "před {{count}} minutami",
      future: "za {{count}} minut"
    }
  },
  aboutXHours: {
    one: {
      regular: "přibližně 1 hodina",
      past: "přibližně před 1 hodinou",
      future: "přibližně za 1 hodinu"
    },
    few: {
      regular: "přibližně {{count}} hodiny",
      past: "přibližně před {{count}} hodinami",
      future: "přibližně za {{count}} hodiny"
    },
    many: {
      regular: "přibližně {{count}} hodin",
      past: "přibližně před {{count}} hodinami",
      future: "přibližně za {{count}} hodin"
    }
  },
  xHours: {
    one: {
      regular: "1 hodina",
      past: "před 1 hodinou",
      future: "za 1 hodinu"
    },
    few: {
      regular: "{{count}} hodiny",
      past: "před {{count}} hodinami",
      future: "za {{count}} hodiny"
    },
    many: {
      regular: "{{count}} hodin",
      past: "před {{count}} hodinami",
      future: "za {{count}} hodin"
    }
  },
  xDays: {
    one: {
      regular: "1 den",
      past: "před 1 dnem",
      future: "za 1 den"
    },
    few: {
      regular: "{{count}} dny",
      past: "před {{count}} dny",
      future: "za {{count}} dny"
    },
    many: {
      regular: "{{count}} dní",
      past: "před {{count}} dny",
      future: "za {{count}} dní"
    }
  },
  aboutXWeeks: {
    one: {
      regular: "přibližně 1 týden",
      past: "přibližně před 1 týdnem",
      future: "přibližně za 1 týden"
    },
    few: {
      regular: "přibližně {{count}} týdny",
      past: "přibližně před {{count}} týdny",
      future: "přibližně za {{count}} týdny"
    },
    many: {
      regular: "přibližně {{count}} týdnů",
      past: "přibližně před {{count}} týdny",
      future: "přibližně za {{count}} týdnů"
    }
  },
  xWeeks: {
    one: {
      regular: "1 týden",
      past: "před 1 týdnem",
      future: "za 1 týden"
    },
    few: {
      regular: "{{count}} týdny",
      past: "před {{count}} týdny",
      future: "za {{count}} týdny"
    },
    many: {
      regular: "{{count}} týdnů",
      past: "před {{count}} týdny",
      future: "za {{count}} týdnů"
    }
  },
  aboutXMonths: {
    one: {
      regular: "přibližně 1 měsíc",
      past: "přibližně před 1 měsícem",
      future: "přibližně za 1 měsíc"
    },
    few: {
      regular: "přibližně {{count}} měsíce",
      past: "přibližně před {{count}} měsíci",
      future: "přibližně za {{count}} měsíce"
    },
    many: {
      regular: "přibližně {{count}} měsíců",
      past: "přibližně před {{count}} měsíci",
      future: "přibližně za {{count}} měsíců"
    }
  },
  xMonths: {
    one: {
      regular: "1 měsíc",
      past: "před 1 měsícem",
      future: "za 1 měsíc"
    },
    few: {
      regular: "{{count}} měsíce",
      past: "před {{count}} měsíci",
      future: "za {{count}} měsíce"
    },
    many: {
      regular: "{{count}} měsíců",
      past: "před {{count}} měsíci",
      future: "za {{count}} měsíců"
    }
  },
  aboutXYears: {
    one: {
      regular: "přibližně 1 rok",
      past: "přibližně před 1 rokem",
      future: "přibližně za 1 rok"
    },
    few: {
      regular: "přibližně {{count}} roky",
      past: "přibližně před {{count}} roky",
      future: "přibližně za {{count}} roky"
    },
    many: {
      regular: "přibližně {{count}} roků",
      past: "přibližně před {{count}} roky",
      future: "přibližně za {{count}} roků"
    }
  },
  xYears: {
    one: {
      regular: "1 rok",
      past: "před 1 rokem",
      future: "za 1 rok"
    },
    few: {
      regular: "{{count}} roky",
      past: "před {{count}} roky",
      future: "za {{count}} roky"
    },
    many: {
      regular: "{{count}} roků",
      past: "před {{count}} roky",
      future: "za {{count}} roků"
    }
  },
  overXYears: {
    one: {
      regular: "více než 1 rok",
      past: "před více než 1 rokem",
      future: "za více než 1 rok"
    },
    few: {
      regular: "více než {{count}} roky",
      past: "před více než {{count}} roky",
      future: "za více než {{count}} roky"
    },
    many: {
      regular: "více než {{count}} roků",
      past: "před více než {{count}} roky",
      future: "za více než {{count}} roků"
    }
  },
  almostXYears: {
    one: {
      regular: "skoro 1 rok",
      past: "skoro před 1 rokem",
      future: "skoro za 1 rok"
    },
    few: {
      regular: "skoro {{count}} roky",
      past: "skoro před {{count}} roky",
      future: "skoro za {{count}} roky"
    },
    many: {
      regular: "skoro {{count}} roků",
      past: "skoro před {{count}} roky",
      future: "skoro za {{count}} roků"
    }
  }
};
const formatDistance$s = (token, count, options) => {
  let pluralResult;
  const tokenValue = formatDistanceLocale$s[token];
  if (tokenValue.type === "other") {
    pluralResult = tokenValue.other;
  } else if (count === 1) {
    pluralResult = tokenValue.one;
  } else if (count > 1 && count < 5) {
    pluralResult = tokenValue.few;
  } else {
    pluralResult = tokenValue.many;
  }
  const suffixExist = options?.addSuffix === true;
  const comparison = options?.comparison;
  let timeResult;
  if (suffixExist && comparison === -1) {
    timeResult = pluralResult.past;
  } else if (suffixExist && comparison === 1) {
    timeResult = pluralResult.future;
  } else {
    timeResult = pluralResult.regular;
  }
  return timeResult.replace("{{count}}", String(count));
};
const dateFormats$t = {
  full: "EEEE, d. MMMM yyyy",
  long: "d. MMMM yyyy",
  medium: "d. M. yyyy",
  short: "dd.MM.yyyy"
};
const timeFormats$t = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$t = {
  full: "{{date}} 'v' {{time}}",
  long: "{{date}} 'v' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$t = {
  date: buildFormatLongFn({
    formats: dateFormats$t,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$t,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$t,
    defaultWidth: "full"
  })
};
const accusativeWeekdays$3 = [
  "neděli",
  "pondělí",
  "úterý",
  "středu",
  "čtvrtek",
  "pátek",
  "sobotu"
];
const formatRelativeLocale$s = {
  lastWeek: "'poslední' eeee 've' p",
  yesterday: "'včera v' p",
  today: "'dnes v' p",
  tomorrow: "'zítra v' p",
  nextWeek: (date) => {
    const day = date.getDay();
    return "'v " + accusativeWeekdays$3[day] + " o' p";
  },
  other: "P"
};
const formatRelative$s = (token, date) => {
  const format = formatRelativeLocale$s[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
const eraValues$s = {
  narrow: ["př. n. l.", "n. l."],
  abbreviated: ["př. n. l.", "n. l."],
  wide: ["před naším letopočtem", "našeho letopočtu"]
};
const quarterValues$s = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"],
  wide: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"]
};
const monthValues$s = {
  narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
  abbreviated: [
    "led",
    "úno",
    "bře",
    "dub",
    "kvě",
    "čvn",
    "čvc",
    "srp",
    "zář",
    "říj",
    "lis",
    "pro"
  ],
  wide: [
    "leden",
    "únor",
    "březen",
    "duben",
    "květen",
    "červen",
    "červenec",
    "srpen",
    "září",
    "říjen",
    "listopad",
    "prosinec"
  ]
};
const formattingMonthValues$5 = {
  narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
  abbreviated: [
    "led",
    "úno",
    "bře",
    "dub",
    "kvě",
    "čvn",
    "čvc",
    "srp",
    "zář",
    "říj",
    "lis",
    "pro"
  ],
  wide: [
    "ledna",
    "února",
    "března",
    "dubna",
    "května",
    "června",
    "července",
    "srpna",
    "září",
    "října",
    "listopadu",
    "prosince"
  ]
};
const dayValues$s = {
  narrow: ["ne", "po", "út", "st", "čt", "pá", "so"],
  short: ["ne", "po", "út", "st", "čt", "pá", "so"],
  abbreviated: ["ned", "pon", "úte", "stř", "čtv", "pát", "sob"],
  wide: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"]
};
const dayPeriodValues$s = {
  narrow: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  abbreviated: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "dopoledne",
    pm: "odpoledne",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  }
};
const formattingDayPeriodValues$n = {
  narrow: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  abbreviated: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "dopoledne",
    pm: "odpoledne",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  }
};
const ordinalNumber$s = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$s = {
  ordinalNumber: ordinalNumber$s,
  era: buildLocalizeFn({
    values: eraValues$s,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$s,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$s,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues$5,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$s,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$s,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$n,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$s = /^(\d+)\.?/i;
const parseOrdinalNumberPattern$s = /\d+/i;
const matchEraPatterns$s = {
  narrow: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(p[řr](\.|ed) Kristem|p[řr](\.|ed) na[šs][íi]m letopo[čc]tem|po Kristu|na[šs]eho letopo[čc]tu)/i
};
const parseEraPatterns$s = {
  any: [/^p[řr]/i, /^(po|n)/i]
};
const matchQuarterPatterns$s = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\. [čc]tvrtlet[íi]/i,
  wide: /^[1234]\. [čc]tvrtlet[íi]/i
};
const parseQuarterPatterns$s = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$s = {
  narrow: /^[lúubdkčcszřrlp]/i,
  abbreviated: /^(led|[úu]no|b[řr]e|dub|kv[ěe]|[čc]vn|[čc]vc|srp|z[áa][řr]|[řr][íi]j|lis|pro)/i,
  wide: /^(leden|ledna|[úu]nora?|b[řr]ezen|b[řr]ezna|duben|dubna|kv[ěe]ten|kv[ěe]tna|[čc]erven(ec|ce)?|[čc]ervna|srpen|srpna|z[áa][řr][íi]|[řr][íi]jen|[řr][íi]jna|listopad(a|u)?|prosinec|prosince)/i
};
const parseMonthPatterns$s = {
  narrow: [
    /^l/i,
    /^[úu]/i,
    /^b/i,
    /^d/i,
    /^k/i,
    /^[čc]/i,
    /^[čc]/i,
    /^s/i,
    /^z/i,
    /^[řr]/i,
    /^l/i,
    /^p/i
  ],
  any: [
    /^led/i,
    /^[úu]n/i,
    /^b[řr]e/i,
    /^dub/i,
    /^kv[ěe]/i,
    /^[čc]vn|[čc]erven(?!\w)|[čc]ervna/i,
    /^[čc]vc|[čc]erven(ec|ce)/i,
    /^srp/i,
    /^z[áa][řr]/i,
    /^[řr][íi]j/i,
    /^lis/i,
    /^pro/i
  ]
};
const matchDayPatterns$s = {
  narrow: /^[npuúsčps]/i,
  short: /^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,
  abbreviated: /^(ned|pon|[úu]te|st[rř]|[čc]tv|p[áa]t|sob)/i,
  wide: /^(ned[ěe]le|pond[ěe]l[íi]|[úu]ter[ýy]|st[řr]eda|[čc]tvrtek|p[áa]tek|sobota)/i
};
const parseDayPatterns$s = {
  narrow: [/^n/i, /^p/i, /^[úu]/i, /^s/i, /^[čc]/i, /^p/i, /^s/i],
  any: [/^ne/i, /^po/i, /^[úu]t/i, /^st/i, /^[čc]t/i, /^p[áa]/i, /^so/i]
};
const matchDayPeriodPatterns$s = {
  any: /^dopoledne|dop\.?|odpoledne|odp\.?|p[ůu]lnoc|poledne|r[áa]no|odpoledne|ve[čc]er|(v )?noci?/i
};
const parseDayPeriodPatterns$s = {
  any: {
    am: /^dop/i,
    pm: /^odp/i,
    midnight: /^p[ůu]lnoc/i,
    noon: /^poledne/i,
    morning: /r[áa]no/i,
    afternoon: /odpoledne/i,
    evening: /ve[čc]er/i,
    night: /noc/i
  }
};
const match$s = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$s,
    parsePattern: parseOrdinalNumberPattern$s,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$s,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$s,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$s,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$s,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$s,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$s,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$s,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$s,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$s,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$s,
    defaultParseWidth: "any"
  })
};
const cs = {
  code: "cs",
  formatDistance: formatDistance$s,
  formatLong: formatLong$t,
  formatRelative: formatRelative$s,
  localize: localize$s,
  match: match$s,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$r = {
  lessThanXSeconds: {
    one: "mindre end ét sekund",
    other: "mindre end {{count}} sekunder"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "ét halvt minut",
  lessThanXMinutes: {
    one: "mindre end ét minut",
    other: "mindre end {{count}} minutter"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minutter"
  },
  aboutXHours: {
    one: "cirka 1 time",
    other: "cirka {{count}} timer"
  },
  xHours: {
    one: "1 time",
    other: "{{count}} timer"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dage"
  },
  aboutXWeeks: {
    one: "cirka 1 uge",
    other: "cirka {{count}} uger"
  },
  xWeeks: {
    one: "1 uge",
    other: "{{count}} uger"
  },
  aboutXMonths: {
    one: "cirka 1 måned",
    other: "cirka {{count}} måneder"
  },
  xMonths: {
    one: "1 måned",
    other: "{{count}} måneder"
  },
  aboutXYears: {
    one: "cirka 1 år",
    other: "cirka {{count}} år"
  },
  xYears: {
    one: "1 år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over 1 år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "næsten 1 år",
    other: "næsten {{count}} år"
  }
};
const formatDistance$r = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$r[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " siden";
    }
  }
  return result;
};
const dateFormats$s = {
  full: "EEEE 'den' d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd/MM/y"
};
const timeFormats$s = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$s = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$s = {
  date: buildFormatLongFn({
    formats: dateFormats$s,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$s,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$s,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$r = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'på' eeee 'kl.' p",
  other: "P"
};
const formatRelative$r = (token, _date, _baseDate, _options) => formatRelativeLocale$r[token];
const eraValues$r = {
  narrow: ["fvt", "vt"],
  abbreviated: ["f.v.t.", "v.t."],
  wide: ["før vesterlandsk tidsregning", "vesterlandsk tidsregning"]
};
const quarterValues$r = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
const monthValues$r = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan.",
    "feb.",
    "mar.",
    "apr.",
    "maj",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "dec."
  ],
  wide: [
    "januar",
    "februar",
    "marts",
    "april",
    "maj",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "december"
  ]
};
const dayValues$r = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
  abbreviated: ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."],
  wide: [
    "søndag",
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag"
  ]
};
const dayPeriodValues$r = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  }
};
const formattingDayPeriodValues$m = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  }
};
const ordinalNumber$r = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$r = {
  ordinalNumber: ordinalNumber$r,
  era: buildLocalizeFn({
    values: eraValues$r,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$r,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$r,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$r,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$r,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$m,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$r = /^(\d+)(\.)?/i;
const parseOrdinalNumberPattern$r = /\d+/i;
const matchEraPatterns$r = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
};
const parseEraPatterns$r = {
  any: [/^f/i, /^(v|e)/i]
};
const matchQuarterPatterns$r = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
};
const parseQuarterPatterns$r = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$r = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
};
const parseMonthPatterns$r = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^maj/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$r = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
const parseDayPatterns$r = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
const matchDayPeriodPatterns$r = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
};
const parseDayPeriodPatterns$r = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /midnat/i,
    noon: /middag/i,
    morning: /morgen/i,
    afternoon: /eftermiddag/i,
    evening: /aften/i,
    night: /nat/i
  }
};
const match$r = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$r,
    parsePattern: parseOrdinalNumberPattern$r,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$r,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$r,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$r,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$r,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$r,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$r,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$r,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$r,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$r,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$r,
    defaultParseWidth: "any"
  })
};
const da = {
  code: "da",
  formatDistance: formatDistance$r,
  formatLong: formatLong$s,
  formatRelative: formatRelative$r,
  localize: localize$r,
  match: match$r,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$q = {
  lessThanXSeconds: {
    standalone: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    },
    withPreposition: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    }
  },
  xSeconds: {
    standalone: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    },
    withPreposition: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    }
  },
  halfAMinute: {
    standalone: "eine halbe Minute",
    withPreposition: "einer halben Minute"
  },
  lessThanXMinutes: {
    standalone: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    },
    withPreposition: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    }
  },
  xMinutes: {
    standalone: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    },
    withPreposition: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    }
  },
  aboutXHours: {
    standalone: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    },
    withPreposition: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    }
  },
  xHours: {
    standalone: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    },
    withPreposition: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    }
  },
  xDays: {
    standalone: {
      one: "1 Tag",
      other: "{{count}} Tage"
    },
    withPreposition: {
      one: "1 Tag",
      other: "{{count}} Tagen"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    },
    withPreposition: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    }
  },
  xWeeks: {
    standalone: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    },
    withPreposition: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monate"
    },
    withPreposition: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monaten"
    }
  },
  xMonths: {
    standalone: {
      one: "1 Monat",
      other: "{{count}} Monate"
    },
    withPreposition: {
      one: "1 Monat",
      other: "{{count}} Monaten"
    }
  },
  aboutXYears: {
    standalone: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahre"
    },
    withPreposition: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahren"
    }
  },
  xYears: {
    standalone: {
      one: "1 Jahr",
      other: "{{count}} Jahre"
    },
    withPreposition: {
      one: "1 Jahr",
      other: "{{count}} Jahren"
    }
  },
  overXYears: {
    standalone: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahre"
    },
    withPreposition: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahren"
    }
  },
  almostXYears: {
    standalone: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahre"
    },
    withPreposition: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahren"
    }
  }
};
const formatDistance$q = (token, count, options) => {
  let result;
  const tokenValue = options?.addSuffix ? formatDistanceLocale$q[token].withPreposition : formatDistanceLocale$q[token].standalone;
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return "vor " + result;
    }
  }
  return result;
};
const dateFormats$r = {
  full: "EEEE, do MMMM y",
  // Montag, 7. Januar 2018
  long: "do MMMM y",
  // 7. Januar 2018
  medium: "do MMM y",
  // 7. Jan. 2018
  short: "dd.MM.y"
  // 07.01.2018
};
const timeFormats$r = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$r = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$r = {
  date: buildFormatLongFn({
    formats: dateFormats$r,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$r,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$r,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$q = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
};
const formatRelative$q = (token, _date, _baseDate, _options) => formatRelativeLocale$q[token];
const eraValues$q = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
};
const quarterValues$q = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
};
const monthValues$q = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ],
  wide: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ]
};
const formattingMonthValues$4 = {
  narrow: monthValues$q.narrow,
  abbreviated: [
    "Jan.",
    "Feb.",
    "März",
    "Apr.",
    "Mai",
    "Juni",
    "Juli",
    "Aug.",
    "Sep.",
    "Okt.",
    "Nov.",
    "Dez."
  ],
  wide: monthValues$q.wide
};
const dayValues$q = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ]
};
const dayPeriodValues$q = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachm.",
    evening: "Abend",
    night: "Nacht"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  }
};
const formattingDayPeriodValues$l = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachm.",
    evening: "abends",
    night: "nachts"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  }
};
const ordinalNumber$q = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$q = {
  ordinalNumber: ordinalNumber$q,
  era: buildLocalizeFn({
    values: eraValues$q,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$q,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$q,
    formattingValues: formattingMonthValues$4,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$q,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$q,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$l,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$q = /^(\d+)(\.)?/i;
const parseOrdinalNumberPattern$q = /\d+/i;
const matchEraPatterns$q = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
};
const parseEraPatterns$q = {
  any: [/^v/i, /^n/i]
};
const matchQuarterPatterns$q = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
const parseQuarterPatterns$q = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$q = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
};
const parseMonthPatterns$q = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^j[aä]/i,
    /^f/i,
    /^mär/i,
    /^ap/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$q = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
};
const parseDayPatterns$q = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns$q = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
};
const parseDayPeriodPatterns$q = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /abends/i,
    night: /nachts/i
    // will never be matched. Night is matched by `pm`
  }
};
const match$q = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$q,
    parsePattern: parseOrdinalNumberPattern$q,
    valueCallback: (value) => parseInt(value)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$q,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$q,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$q,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$q,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$q,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$q,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$q,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$q,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$q,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$q,
    defaultParseWidth: "any"
  })
};
const de = {
  code: "de",
  formatDistance: formatDistance$q,
  formatLong: formatLong$r,
  formatRelative: formatRelative$q,
  localize: localize$q,
  match: match$q,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$p = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance$p = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$p[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
const formatRelativeLocale$p = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative$p = (token, _date, _baseDate, _options) => formatRelativeLocale$p[token];
const eraValues$p = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues$p = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues$p = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues$p = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues$p = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues$k = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber$p = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize$p = {
  ordinalNumber: ordinalNumber$p,
  era: buildLocalizeFn({
    values: eraValues$p,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$p,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$p,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$p,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$p,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$k,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$p = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$p = /\d+/i;
const matchEraPatterns$p = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns$p = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns$p = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns$p = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$p = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns$p = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$p = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns$p = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns$p = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns$p = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match$p = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$p,
    parsePattern: parseOrdinalNumberPattern$p,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$p,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$p,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$p,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$p,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$p,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$p,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$p,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$p,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$p,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$p,
    defaultParseWidth: "any"
  })
};
const dateFormats$q = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
const timeFormats$q = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$q = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$q = {
  date: buildFormatLongFn({
    formats: dateFormats$q,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$q,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$q,
    defaultWidth: "full"
  })
};
const enGB = {
  code: "en-GB",
  formatDistance: formatDistance$p,
  formatLong: formatLong$q,
  formatRelative: formatRelative$p,
  localize: localize$p,
  match: match$p,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const dateFormats$p = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats$p = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$p = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$p = {
  date: buildFormatLongFn({
    formats: dateFormats$p,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$p,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$p,
    defaultWidth: "full"
  })
};
const enUS = {
  code: "en-US",
  formatDistance: formatDistance$p,
  formatLong: formatLong$p,
  formatRelative: formatRelative$p,
  localize: localize$p,
  match: match$p,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$o = {
  lessThanXSeconds: {
    one: "malpli ol sekundo",
    other: "malpli ol {{count}} sekundoj"
  },
  xSeconds: {
    one: "1 sekundo",
    other: "{{count}} sekundoj"
  },
  halfAMinute: "duonminuto",
  lessThanXMinutes: {
    one: "malpli ol minuto",
    other: "malpli ol {{count}} minutoj"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutoj"
  },
  aboutXHours: {
    one: "proksimume 1 horo",
    other: "proksimume {{count}} horoj"
  },
  xHours: {
    one: "1 horo",
    other: "{{count}} horoj"
  },
  xDays: {
    one: "1 tago",
    other: "{{count}} tagoj"
  },
  aboutXMonths: {
    one: "proksimume 1 monato",
    other: "proksimume {{count}} monatoj"
  },
  xWeeks: {
    one: "1 semajno",
    other: "{{count}} semajnoj"
  },
  aboutXWeeks: {
    one: "proksimume 1 semajno",
    other: "proksimume {{count}} semajnoj"
  },
  xMonths: {
    one: "1 monato",
    other: "{{count}} monatoj"
  },
  aboutXYears: {
    one: "proksimume 1 jaro",
    other: "proksimume {{count}} jaroj"
  },
  xYears: {
    one: "1 jaro",
    other: "{{count}} jaroj"
  },
  overXYears: {
    one: "pli ol 1 jaro",
    other: "pli ol {{count}} jaroj"
  },
  almostXYears: {
    one: "preskaŭ 1 jaro",
    other: "preskaŭ {{count}} jaroj"
  }
};
const formatDistance$o = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$o[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options?.comparison && options.comparison > 0) {
      return "post " + result;
    } else {
      return "antaŭ " + result;
    }
  }
  return result;
};
const dateFormats$o = {
  full: "EEEE, do 'de' MMMM y",
  long: "y-MMMM-dd",
  medium: "y-MMM-dd",
  short: "yyyy-MM-dd"
};
const timeFormats$o = {
  full: "Ho 'horo kaj' m:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$o = {
  any: "{{date}} {{time}}"
};
const formatLong$o = {
  date: buildFormatLongFn({
    formats: dateFormats$o,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$o,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$o,
    defaultWidth: "any"
  })
};
const formatRelativeLocale$o = {
  lastWeek: "'pasinta' eeee 'je' p",
  yesterday: "'hieraŭ je' p",
  today: "'hodiaŭ je' p",
  tomorrow: "'morgaŭ je' p",
  nextWeek: "eeee 'je' p",
  other: "P"
};
const formatRelative$o = (token, _date, _baseDate, _options) => formatRelativeLocale$o[token];
const eraValues$o = {
  narrow: ["aK", "pK"],
  abbreviated: ["a.K.E.", "p.K.E."],
  wide: ["antaŭ Komuna Erao", "Komuna Erao"]
};
const quarterValues$o = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: [
    "1-a kvaronjaro",
    "2-a kvaronjaro",
    "3-a kvaronjaro",
    "4-a kvaronjaro"
  ]
};
const monthValues$o = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aŭg",
    "sep",
    "okt",
    "nov",
    "dec"
  ],
  wide: [
    "januaro",
    "februaro",
    "marto",
    "aprilo",
    "majo",
    "junio",
    "julio",
    "aŭgusto",
    "septembro",
    "oktobro",
    "novembro",
    "decembro"
  ]
};
const dayValues$o = {
  narrow: ["D", "L", "M", "M", "Ĵ", "V", "S"],
  short: ["di", "lu", "ma", "me", "ĵa", "ve", "sa"],
  abbreviated: ["dim", "lun", "mar", "mer", "ĵaŭ", "ven", "sab"],
  wide: [
    "dimanĉo",
    "lundo",
    "mardo",
    "merkredo",
    "ĵaŭdo",
    "vendredo",
    "sabato"
  ]
};
const dayPeriodValues$o = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  },
  abbreviated: {
    am: "a.t.m.",
    pm: "p.t.m.",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  },
  wide: {
    am: "antaŭtagmeze",
    pm: "posttagmeze",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  }
};
const ordinalNumber$o = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number + "-a";
};
const localize$o = {
  ordinalNumber: ordinalNumber$o,
  era: buildLocalizeFn({
    values: eraValues$o,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$o,
    defaultWidth: "wide",
    argumentCallback: function(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$o,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$o,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$o,
    defaultWidth: "wide"
  })
};
const matchOrdinalNumberPattern$o = /^(\d+)(-?a)?/i;
const parseOrdinalNumberPattern$o = /\d+/i;
const matchEraPatterns$o = {
  narrow: /^([ap]k)/i,
  abbreviated: /^([ap]\.?\s?k\.?\s?e\.?)/i,
  wide: /^((antaǔ |post )?komuna erao)/i
};
const parseEraPatterns$o = {
  any: [/^a/i, /^[kp]/i]
};
const matchQuarterPatterns$o = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](-?a)? kvaronjaro/i
};
const parseQuarterPatterns$o = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$o = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|a(ŭ|ux|uh|u)g|sep|okt|nov|dec)/i,
  wide: /^(januaro|februaro|marto|aprilo|majo|junio|julio|a(ŭ|ux|uh|u)gusto|septembro|oktobro|novembro|decembro)/i
};
const parseMonthPatterns$o = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^maj/i,
    /^jun/i,
    /^jul/i,
    /^a(u|ŭ)/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$o = {
  narrow: /^[dlmĵjvs]/i,
  short: /^(di|lu|ma|me|(ĵ|jx|jh|j)a|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)|ven|sab)/i,
  wide: /^(diman(ĉ|cx|ch|c)o|lundo|mardo|merkredo|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)do|vendredo|sabato)/i
};
const parseDayPatterns$o = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^(j|ĵ)/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^(j|ĵ)/i, /^v/i, /^s/i]
};
const matchDayPeriodPatterns$o = {
  narrow: /^([ap]|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  abbreviated: /^([ap][.\s]?t[.\s]?m[.\s]?|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  wide: /^(anta(ŭ|ux)tagmez|posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo]/i
};
const parseDayPeriodPatterns$o = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^noktom/i,
    noon: /^t/i,
    morning: /^m/i,
    afternoon: /^posttagmeze/i,
    evening: /^v/i,
    night: /^n/i
  }
};
const match$o = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$o,
    parsePattern: parseOrdinalNumberPattern$o,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$o,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$o,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$o,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$o,
    defaultParseWidth: "any",
    valueCallback: function(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$o,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$o,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$o,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$o,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$o,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$o,
    defaultParseWidth: "any"
  })
};
const eo = {
  code: "eo",
  formatDistance: formatDistance$o,
  formatLong: formatLong$o,
  formatRelative: formatRelative$o,
  localize: localize$o,
  match: match$o,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$n = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
};
const formatDistance$n = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$n[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "hace " + result;
    }
  }
  return result;
};
const dateFormats$n = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
const timeFormats$n = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$n = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$n = {
  date: buildFormatLongFn({
    formats: dateFormats$n,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$n,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$n,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$n = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
};
const formatRelativeLocalePlural = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
};
const formatRelative$n = (token, date, _baseDate, _options) => {
  if (date.getHours() !== 1) {
    return formatRelativeLocalePlural[token];
  } else {
    return formatRelativeLocale$n[token];
  }
};
const eraValues$n = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
};
const quarterValues$n = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
const monthValues$n = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  wide: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ]
};
const dayValues$n = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ]
};
const dayPeriodValues$n = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
};
const formattingDayPeriodValues$j = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
};
const ordinalNumber$n = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + "º";
};
const localize$n = {
  ordinalNumber: ordinalNumber$n,
  era: buildLocalizeFn({
    values: eraValues$n,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$n,
    defaultWidth: "wide",
    argumentCallback: (quarter) => Number(quarter) - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$n,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$n,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$n,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$j,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$n = /^(\d+)(º)?/i;
const parseOrdinalNumberPattern$n = /\d+/i;
const matchEraPatterns$n = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
};
const parseEraPatterns$n = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
};
const matchQuarterPatterns$n = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
const parseQuarterPatterns$n = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$n = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
};
const parseMonthPatterns$n = {
  narrow: [
    /^e/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^en/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i
  ]
};
const matchDayPatterns$n = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
};
const parseDayPatterns$n = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
};
const matchDayPeriodPatterns$n = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
};
const parseDayPeriodPatterns$n = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
};
const match$n = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$n,
    parsePattern: parseOrdinalNumberPattern$n,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$n,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$n,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$n,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$n,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$n,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$n,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$n,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$n,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$n,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$n,
    defaultParseWidth: "any"
  })
};
const es = {
  code: "es",
  formatDistance: formatDistance$n,
  formatLong: formatLong$n,
  formatRelative: formatRelative$n,
  localize: localize$n,
  match: match$n,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$m = {
  lessThanXSeconds: {
    standalone: {
      one: "vähem kui üks sekund",
      other: "vähem kui {{count}} sekundit"
    },
    withPreposition: {
      one: "vähem kui ühe sekundi",
      other: "vähem kui {{count}} sekundi"
    }
  },
  xSeconds: {
    standalone: {
      one: "üks sekund",
      other: "{{count}} sekundit"
    },
    withPreposition: {
      one: "ühe sekundi",
      other: "{{count}} sekundi"
    }
  },
  halfAMinute: {
    standalone: "pool minutit",
    withPreposition: "poole minuti"
  },
  lessThanXMinutes: {
    standalone: {
      one: "vähem kui üks minut",
      other: "vähem kui {{count}} minutit"
    },
    withPreposition: {
      one: "vähem kui ühe minuti",
      other: "vähem kui {{count}} minuti"
    }
  },
  xMinutes: {
    standalone: {
      one: "üks minut",
      other: "{{count}} minutit"
    },
    withPreposition: {
      one: "ühe minuti",
      other: "{{count}} minuti"
    }
  },
  aboutXHours: {
    standalone: {
      one: "umbes üks tund",
      other: "umbes {{count}} tundi"
    },
    withPreposition: {
      one: "umbes ühe tunni",
      other: "umbes {{count}} tunni"
    }
  },
  xHours: {
    standalone: {
      one: "üks tund",
      other: "{{count}} tundi"
    },
    withPreposition: {
      one: "ühe tunni",
      other: "{{count}} tunni"
    }
  },
  xDays: {
    standalone: {
      one: "üks päev",
      other: "{{count}} päeva"
    },
    withPreposition: {
      one: "ühe päeva",
      other: "{{count}} päeva"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "umbes üks nädal",
      other: "umbes {{count}} nädalat"
    },
    withPreposition: {
      one: "umbes ühe nädala",
      other: "umbes {{count}} nädala"
    }
  },
  xWeeks: {
    standalone: {
      one: "üks nädal",
      other: "{{count}} nädalat"
    },
    withPreposition: {
      one: "ühe nädala",
      other: "{{count}} nädala"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "umbes üks kuu",
      other: "umbes {{count}} kuud"
    },
    withPreposition: {
      one: "umbes ühe kuu",
      other: "umbes {{count}} kuu"
    }
  },
  xMonths: {
    standalone: {
      one: "üks kuu",
      other: "{{count}} kuud"
    },
    withPreposition: {
      one: "ühe kuu",
      other: "{{count}} kuu"
    }
  },
  aboutXYears: {
    standalone: {
      one: "umbes üks aasta",
      other: "umbes {{count}} aastat"
    },
    withPreposition: {
      one: "umbes ühe aasta",
      other: "umbes {{count}} aasta"
    }
  },
  xYears: {
    standalone: {
      one: "üks aasta",
      other: "{{count}} aastat"
    },
    withPreposition: {
      one: "ühe aasta",
      other: "{{count}} aasta"
    }
  },
  overXYears: {
    standalone: {
      one: "rohkem kui üks aasta",
      other: "rohkem kui {{count}} aastat"
    },
    withPreposition: {
      one: "rohkem kui ühe aasta",
      other: "rohkem kui {{count}} aasta"
    }
  },
  almostXYears: {
    standalone: {
      one: "peaaegu üks aasta",
      other: "peaaegu {{count}} aastat"
    },
    withPreposition: {
      one: "peaaegu ühe aasta",
      other: "peaaegu {{count}} aasta"
    }
  }
};
const formatDistance$m = (token, count, options) => {
  const usageGroup = options?.addSuffix ? formatDistanceLocale$m[token].withPreposition : formatDistanceLocale$m[token].standalone;
  let result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " pärast";
    } else {
      return result + " eest";
    }
  }
  return result;
};
const dateFormats$m = {
  full: "EEEE, d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd.MM.y"
};
const timeFormats$m = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$m = {
  full: "{{date}} 'kell' {{time}}",
  long: "{{date}} 'kell' {{time}}",
  medium: "{{date}}. {{time}}",
  short: "{{date}}. {{time}}"
};
const formatLong$m = {
  date: buildFormatLongFn({
    formats: dateFormats$m,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$m,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$m,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$m = {
  lastWeek: "'eelmine' eeee 'kell' p",
  yesterday: "'eile kell' p",
  today: "'täna kell' p",
  tomorrow: "'homme kell' p",
  nextWeek: "'järgmine' eeee 'kell' p",
  other: "P"
};
const formatRelative$m = (token, _date, _baseDate, _options) => formatRelativeLocale$m[token];
const eraValues$m = {
  narrow: ["e.m.a", "m.a.j"],
  abbreviated: ["e.m.a", "m.a.j"],
  wide: ["enne meie ajaarvamist", "meie ajaarvamise järgi"]
};
const quarterValues$m = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
const monthValues$m = {
  narrow: ["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jaan",
    "veebr",
    "märts",
    "apr",
    "mai",
    "juuni",
    "juuli",
    "aug",
    "sept",
    "okt",
    "nov",
    "dets"
  ],
  wide: [
    "jaanuar",
    "veebruar",
    "märts",
    "aprill",
    "mai",
    "juuni",
    "juuli",
    "august",
    "september",
    "oktoober",
    "november",
    "detsember"
  ]
};
const dayValues$m = {
  narrow: ["P", "E", "T", "K", "N", "R", "L"],
  short: ["P", "E", "T", "K", "N", "R", "L"],
  abbreviated: [
    "pühap.",
    "esmasp.",
    "teisip.",
    "kolmap.",
    "neljap.",
    "reede.",
    "laup."
  ],
  wide: [
    "pühapäev",
    "esmaspäev",
    "teisipäev",
    "kolmapäev",
    "neljapäev",
    "reede",
    "laupäev"
  ]
};
const dayPeriodValues$m = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  }
};
const formattingDayPeriodValues$i = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  }
};
const ordinalNumber$m = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$m = {
  ordinalNumber: ordinalNumber$m,
  era: buildLocalizeFn({
    values: eraValues$m,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$m,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$m,
    defaultWidth: "wide",
    formattingValues: monthValues$m,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$m,
    defaultWidth: "wide",
    formattingValues: dayValues$m,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$m,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$i,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$m = /^\d+\./i;
const parseOrdinalNumberPattern$m = /\d+/i;
const matchEraPatterns$m = {
  narrow: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  abbreviated: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  wide: /^(enne meie ajaarvamist|meie ajaarvamise järgi|enne Kristust|pärast Kristust)/i
};
const parseEraPatterns$m = {
  any: [/^e/i, /^(m|p)/i]
};
const matchQuarterPatterns$m = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
const parseQuarterPatterns$m = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$m = {
  narrow: /^[jvmasond]/i,
  abbreviated: /^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets)/i,
  wide: /^(jaanuar|veebruar|märts|aprill|mai|juuni|juuli|august|september|oktoober|november|detsember)/i
};
const parseMonthPatterns$m = {
  narrow: [
    /^j/i,
    /^v/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^v/i,
    /^mär/i,
    /^ap/i,
    /^mai/i,
    /^juun/i,
    /^juul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$m = {
  narrow: /^[petknrl]/i,
  short: /^[petknrl]/i,
  abbreviated: /^(püh?|esm?|tei?|kolm?|nel?|ree?|laup?)\.?/i,
  wide: /^(pühapäev|esmaspäev|teisipäev|kolmapäev|neljapäev|reede|laupäev)/i
};
const parseDayPatterns$m = {
  any: [/^p/i, /^e/i, /^t/i, /^k/i, /^n/i, /^r/i, /^l/i]
};
const matchDayPeriodPatterns$m = {
  any: /^(am|pm|keskööl?|keskpäev(al)?|hommik(ul)?|pärastlõunal?|õhtul?|öö(sel)?)/i
};
const parseDayPeriodPatterns$m = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^keskö/i,
    noon: /^keskp/i,
    morning: /hommik/i,
    afternoon: /pärastlõuna/i,
    evening: /õhtu/i,
    night: /öö/i
  }
};
const match$m = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$m,
    parsePattern: parseOrdinalNumberPattern$m,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$m,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$m,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$m,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$m,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$m,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$m,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$m,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$m,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$m,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$m,
    defaultParseWidth: "any"
  })
};
const et = {
  code: "et",
  formatDistance: formatDistance$m,
  formatLong: formatLong$m,
  formatRelative: formatRelative$m,
  localize: localize$m,
  match: match$m,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$l = {
  lessThanXSeconds: {
    one: "کمتر از یک ثانیه",
    other: "کمتر از {{count}} ثانیه"
  },
  xSeconds: {
    one: "1 ثانیه",
    other: "{{count}} ثانیه"
  },
  halfAMinute: "نیم دقیقه",
  lessThanXMinutes: {
    one: "کمتر از یک دقیقه",
    other: "کمتر از {{count}} دقیقه"
  },
  xMinutes: {
    one: "1 دقیقه",
    other: "{{count}} دقیقه"
  },
  aboutXHours: {
    one: "حدود 1 ساعت",
    other: "حدود {{count}} ساعت"
  },
  xHours: {
    one: "1 ساعت",
    other: "{{count}} ساعت"
  },
  xDays: {
    one: "1 روز",
    other: "{{count}} روز"
  },
  aboutXWeeks: {
    one: "حدود 1 هفته",
    other: "حدود {{count}} هفته"
  },
  xWeeks: {
    one: "1 هفته",
    other: "{{count}} هفته"
  },
  aboutXMonths: {
    one: "حدود 1 ماه",
    other: "حدود {{count}} ماه"
  },
  xMonths: {
    one: "1 ماه",
    other: "{{count}} ماه"
  },
  aboutXYears: {
    one: "حدود 1 سال",
    other: "حدود {{count}} سال"
  },
  xYears: {
    one: "1 سال",
    other: "{{count}} سال"
  },
  overXYears: {
    one: "بیشتر از 1 سال",
    other: "بیشتر از {{count}} سال"
  },
  almostXYears: {
    one: "نزدیک 1 سال",
    other: "نزدیک {{count}} سال"
  }
};
const formatDistance$l = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$l[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "در " + result;
    } else {
      return result + " قبل";
    }
  }
  return result;
};
const dateFormats$l = {
  full: "EEEE do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "yyyy/MM/dd"
};
const timeFormats$l = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$l = {
  full: "{{date}} 'در' {{time}}",
  long: "{{date}} 'در' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$l = {
  date: buildFormatLongFn({
    formats: dateFormats$l,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$l,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$l,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$l = {
  lastWeek: "eeee 'گذشته در' p",
  yesterday: "'دیروز در' p",
  today: "'امروز در' p",
  tomorrow: "'فردا در' p",
  nextWeek: "eeee 'در' p",
  other: "P"
};
const formatRelative$l = (token, _date, _baseDate, _options) => formatRelativeLocale$l[token];
const eraValues$l = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل از میلاد", "بعد از میلاد"]
};
const quarterValues$l = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["س‌م1", "س‌م2", "س‌م3", "س‌م4"],
  wide: ["سه‌ماهه 1", "سه‌ماهه 2", "سه‌ماهه 3", "سه‌ماهه 4"]
};
const monthValues$l = {
  narrow: ["ژ", "ف", "م", "آ", "م", "ج", "ج", "آ", "س", "ا", "ن", "د"],
  abbreviated: [
    "ژانـ",
    "فور",
    "مارس",
    "آپر",
    "می",
    "جون",
    "جولـ",
    "آگو",
    "سپتـ",
    "اکتـ",
    "نوامـ",
    "دسامـ"
  ],
  wide: [
    "ژانویه",
    "فوریه",
    "مارس",
    "آپریل",
    "می",
    "جون",
    "جولای",
    "آگوست",
    "سپتامبر",
    "اکتبر",
    "نوامبر",
    "دسامبر"
  ]
};
const dayValues$l = {
  narrow: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
  short: ["1ش", "2ش", "3ش", "4ش", "5ش", "ج", "ش"],
  abbreviated: [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه"
  ],
  wide: ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"]
};
const dayPeriodValues$l = {
  narrow: {
    am: "ق",
    pm: "ب",
    midnight: "ن",
    noon: "ظ",
    morning: "ص",
    afternoon: "ب.ظ.",
    evening: "ع",
    night: "ش"
  },
  abbreviated: {
    am: "ق.ظ.",
    pm: "ب.ظ.",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  },
  wide: {
    am: "قبل‌ازظهر",
    pm: "بعدازظهر",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  }
};
const formattingDayPeriodValues$h = {
  narrow: {
    am: "ق",
    pm: "ب",
    midnight: "ن",
    noon: "ظ",
    morning: "ص",
    afternoon: "ب.ظ.",
    evening: "ع",
    night: "ش"
  },
  abbreviated: {
    am: "ق.ظ.",
    pm: "ب.ظ.",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  },
  wide: {
    am: "قبل‌ازظهر",
    pm: "بعدازظهر",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  }
};
const ordinalNumber$l = (dirtyNumber, _options) => {
  return String(dirtyNumber);
};
const localize$l = {
  ordinalNumber: ordinalNumber$l,
  era: buildLocalizeFn({
    values: eraValues$l,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$l,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$l,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$l,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$l,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$h,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$l = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$l = /\d+/i;
const matchEraPatterns$l = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?د\.?\s?م\.?|م\.?\s?|د\.?\s?م\.?)/i,
  wide: /^(قبل از میلاد|قبل از دوران مشترک|میلادی|دوران مشترک|بعد از میلاد)/i
};
const parseEraPatterns$l = {
  any: [/^قبل/i, /^بعد/i]
};
const matchQuarterPatterns$l = {
  narrow: /^[1234]/i,
  abbreviated: /^س‌م[1234]/i,
  wide: /^سه‌ماهه [1234]/i
};
const parseQuarterPatterns$l = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$l = {
  narrow: /^[جژفمآاماسند]/i,
  abbreviated: /^(جنو|ژانـ|ژانویه|فوریه|فور|مارس|آوریل|آپر|مه|می|ژوئن|جون|جول|جولـ|ژوئیه|اوت|آگو|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نوامـ|دسامبر|دسامـ|دسم)/i,
  wide: /^(ژانویه|جنوری|فبروری|فوریه|مارچ|مارس|آپریل|اپریل|ایپریل|آوریل|مه|می|ژوئن|جون|جولای|ژوئیه|آگست|اگست|آگوست|اوت|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نومبر|دسامبر|دسمبر)/i
};
const parseMonthPatterns$l = {
  narrow: [
    /^(ژ|ج)/i,
    /^ف/i,
    /^م/i,
    /^(آ|ا)/i,
    /^م/i,
    /^(ژ|ج)/i,
    /^(ج|ژ)/i,
    /^(آ|ا)/i,
    /^س/i,
    /^ا/i,
    /^ن/i,
    /^د/i
  ],
  any: [
    /^ژا/i,
    /^ف/i,
    /^ما/i,
    /^آپ/i,
    /^(می|مه)/i,
    /^(ژوئن|جون)/i,
    /^(ژوئی|جول)/i,
    /^(اوت|آگ)/i,
    /^س/i,
    /^(اوک|اک)/i,
    /^ن/i,
    /^د/i
  ]
};
const matchDayPatterns$l = {
  narrow: /^[شیدسچپج]/i,
  short: /^(ش|ج|1ش|2ش|3ش|4ش|5ش)/i,
  abbreviated: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i,
  wide: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i
};
const parseDayPatterns$l = {
  narrow: [/^ی/i, /^دو/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [
    /^(ی|1ش|یکشنبه)/i,
    /^(د|2ش|دوشنبه)/i,
    /^(س|3ش|سه‌شنبه)/i,
    /^(چ|4ش|چهارشنبه)/i,
    /^(پ|5ش|پنجشنبه)/i,
    /^(ج|جمعه)/i,
    /^(ش|شنبه)/i
  ]
};
const matchDayPeriodPatterns$l = {
  narrow: /^(ب|ق|ن|ظ|ص|ب.ظ.|ع|ش)/i,
  abbreviated: /^(ق.ظ.|ب.ظ.|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i,
  wide: /^(قبل‌ازظهر|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i
};
const parseDayPeriodPatterns$l = {
  any: {
    am: /^(ق|ق.ظ.|قبل‌ازظهر)/i,
    pm: /^(ب|ب.ظ.|بعدازظهر)/i,
    midnight: /^(‌نیمه‌شب|ن)/i,
    noon: /^(ظ|ظهر)/i,
    morning: /(ص|صبح)/i,
    afternoon: /(ب|ب.ظ.|بعدازظهر)/i,
    evening: /(ع|عصر)/i,
    night: /(ش|شب)/i
  }
};
const match$l = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$l,
    parsePattern: parseOrdinalNumberPattern$l,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$l,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$l,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$l,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$l,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$l,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$l,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$l,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$l,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$l,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$l,
    defaultParseWidth: "any"
  })
};
const faIR = {
  code: "fa-IR",
  formatDistance: formatDistance$l,
  formatLong: formatLong$l,
  formatRelative: formatRelative$l,
  localize: localize$l,
  match: match$l,
  options: {
    weekStartsOn: 6,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$k = {
  lessThanXSeconds: {
    one: "moins d’une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d’une minute",
    other: "moins de {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "environ 1 heure",
    other: "environ {{count}} heures"
  },
  xHours: {
    one: "1 heure",
    other: "{{count}} heures"
  },
  xDays: {
    one: "1 jour",
    other: "{{count}} jours"
  },
  aboutXWeeks: {
    one: "environ 1 semaine",
    other: "environ {{count}} semaines"
  },
  xWeeks: {
    one: "1 semaine",
    other: "{{count}} semaines"
  },
  aboutXMonths: {
    one: "environ 1 mois",
    other: "environ {{count}} mois"
  },
  xMonths: {
    one: "1 mois",
    other: "{{count}} mois"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "plus d’un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu’un an",
    other: "presque {{count}} ans"
  }
};
const formatDistance$k = (token, count, options) => {
  let result;
  const form = formatDistanceLocale$k[token];
  if (typeof form === "string") {
    result = form;
  } else if (count === 1) {
    result = form.one;
  } else {
    result = form.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dans " + result;
    } else {
      return "il y a " + result;
    }
  }
  return result;
};
const dateFormats$k = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
const timeFormats$k = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$k = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$k = {
  date: buildFormatLongFn({
    formats: dateFormats$k,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$k,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$k,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$k = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: "P"
};
const formatRelative$k = (token, _date, _baseDate, _options) => formatRelativeLocale$k[token];
const eraValues$k = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant Jésus-Christ", "après Jésus-Christ"]
};
const quarterValues$k = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
  wide: ["1er trimestre", "2ème trimestre", "3ème trimestre", "4ème trimestre"]
};
const monthValues$k = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc."
  ],
  wide: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ]
};
const dayValues$k = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
  ]
};
const dayPeriodValues$k = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "soir",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "matin",
    afternoon: "après-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l’après-midi",
    evening: "du soir",
    night: "du matin"
  }
};
const ordinalNumber$k = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = options?.unit;
  if (number === 0) return "0";
  const feminineUnits = ["year", "week", "hour", "minute", "second"];
  let suffix;
  if (number === 1) {
    suffix = unit && feminineUnits.includes(unit) ? "ère" : "er";
  } else {
    suffix = "ème";
  }
  return number + suffix;
};
const LONG_MONTHS_TOKENS = ["MMM", "MMMM"];
const localize$k = {
  preprocessor: (date, parts) => {
    if (date.getDate() === 1) return parts;
    const hasLongMonthToken = parts.some(
      (part) => part.isToken && LONG_MONTHS_TOKENS.includes(part.value)
    );
    if (!hasLongMonthToken) return parts;
    return parts.map(
      (part) => part.isToken && part.value === "do" ? { isToken: true, value: "d" } : part
    );
  },
  ordinalNumber: ordinalNumber$k,
  era: buildLocalizeFn({
    values: eraValues$k,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$k,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$k,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$k,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$k,
    defaultWidth: "wide"
  })
};
const matchOrdinalNumberPattern$k = /^(\d+)(ième|ère|ème|er|e)?/i;
const parseOrdinalNumberPattern$k = /\d+/i;
const matchEraPatterns$k = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
};
const parseEraPatterns$k = {
  any: [/^av/i, /^ap/i]
};
const matchQuarterPatterns$k = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
};
const parseQuarterPatterns$k = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$k = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
};
const parseMonthPatterns$k = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^av/i,
    /^ma/i,
    /^juin/i,
    /^juil/i,
    /^ao/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$k = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
};
const parseDayPatterns$k = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
};
const matchDayPeriodPatterns$k = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
};
const parseDayPeriodPatterns$k = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
};
const match$k = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$k,
    parsePattern: parseOrdinalNumberPattern$k,
    valueCallback: (value) => parseInt(value)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$k,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$k,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$k,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$k,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$k,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$k,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$k,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$k,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$k,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$k,
    defaultParseWidth: "any"
  })
};
const fr = {
  code: "fr",
  formatDistance: formatDistance$k,
  formatLong: formatLong$k,
  formatRelative: formatRelative$k,
  localize: localize$k,
  match: match$k,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$j = {
  lessThanXSeconds: {
    one: "kurang dari 1 detik",
    other: "kurang dari {{count}} detik"
  },
  xSeconds: {
    one: "1 detik",
    other: "{{count}} detik"
  },
  halfAMinute: "setengah menit",
  lessThanXMinutes: {
    one: "kurang dari 1 menit",
    other: "kurang dari {{count}} menit"
  },
  xMinutes: {
    one: "1 menit",
    other: "{{count}} menit"
  },
  aboutXHours: {
    one: "sekitar 1 jam",
    other: "sekitar {{count}} jam"
  },
  xHours: {
    one: "1 jam",
    other: "{{count}} jam"
  },
  xDays: {
    one: "1 hari",
    other: "{{count}} hari"
  },
  aboutXWeeks: {
    one: "sekitar 1 minggu",
    other: "sekitar {{count}} minggu"
  },
  xWeeks: {
    one: "1 minggu",
    other: "{{count}} minggu"
  },
  aboutXMonths: {
    one: "sekitar 1 bulan",
    other: "sekitar {{count}} bulan"
  },
  xMonths: {
    one: "1 bulan",
    other: "{{count}} bulan"
  },
  aboutXYears: {
    one: "sekitar 1 tahun",
    other: "sekitar {{count}} tahun"
  },
  xYears: {
    one: "1 tahun",
    other: "{{count}} tahun"
  },
  overXYears: {
    one: "lebih dari 1 tahun",
    other: "lebih dari {{count}} tahun"
  },
  almostXYears: {
    one: "hampir 1 tahun",
    other: "hampir {{count}} tahun"
  }
};
const formatDistance$j = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$j[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dalam waktu " + result;
    } else {
      return result + " yang lalu";
    }
  }
  return result;
};
const dateFormats$j = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "d/M/yyyy"
};
const timeFormats$j = {
  full: "HH.mm.ss",
  long: "HH.mm.ss",
  medium: "HH.mm",
  short: "HH.mm"
};
const dateTimeFormats$j = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$j = {
  date: buildFormatLongFn({
    formats: dateFormats$j,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$j,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$j,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$j = {
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: "P"
};
const formatRelative$j = (token, _date, _baseDate, _options) => formatRelativeLocale$j[token];
const eraValues$j = {
  narrow: ["SM", "M"],
  abbreviated: ["SM", "M"],
  wide: ["Sebelum Masehi", "Masehi"]
};
const quarterValues$j = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"]
};
const monthValues$j = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des"
  ],
  wide: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ]
};
const dayValues$j = {
  narrow: ["M", "S", "S", "R", "K", "J", "S"],
  short: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  abbreviated: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  wide: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
};
const dayPeriodValues$j = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  }
};
const formattingDayPeriodValues$g = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  }
};
const ordinalNumber$j = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return "ke-" + number;
};
const localize$j = {
  ordinalNumber: ordinalNumber$j,
  era: buildLocalizeFn({
    values: eraValues$j,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$j,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$j,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$j,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$j,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$g,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$j = /^ke-(\d+)?/i;
const parseOrdinalNumberPattern$j = /\d+/i;
const matchEraPatterns$j = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
};
const parseEraPatterns$j = {
  any: [/^s/i, /^(m|e)/i]
};
const matchQuarterPatterns$j = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
};
const parseQuarterPatterns$j = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$j = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
};
const parseMonthPatterns$j = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^ma/i,
    /^ap/i,
    /^me/i,
    /^jun/i,
    /^jul/i,
    /^ag/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$j = {
  narrow: /^[srkjm]/i,
  short: /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
};
const parseDayPatterns$j = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
const matchDayPeriodPatterns$j = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
};
const parseDayPeriodPatterns$j = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pagi/i,
    afternoon: /siang/i,
    evening: /sore/i,
    night: /malam/i
  }
};
const match$j = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$j,
    parsePattern: parseOrdinalNumberPattern$j,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$j,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$j,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$j,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$j,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$j,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$j,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$j,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$j,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$j,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$j,
    defaultParseWidth: "any"
  })
};
const id = {
  code: "id",
  formatDistance: formatDistance$j,
  formatLong: formatLong$j,
  formatRelative: formatRelative$j,
  localize: localize$j,
  match: match$j,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$i = {
  lessThanXSeconds: {
    one: "meno di un secondo",
    other: "meno di {{count}} secondi"
  },
  xSeconds: {
    one: "un secondo",
    other: "{{count}} secondi"
  },
  halfAMinute: "alcuni secondi",
  lessThanXMinutes: {
    one: "meno di un minuto",
    other: "meno di {{count}} minuti"
  },
  xMinutes: {
    one: "un minuto",
    other: "{{count}} minuti"
  },
  aboutXHours: {
    one: "circa un'ora",
    other: "circa {{count}} ore"
  },
  xHours: {
    one: "un'ora",
    other: "{{count}} ore"
  },
  xDays: {
    one: "un giorno",
    other: "{{count}} giorni"
  },
  aboutXWeeks: {
    one: "circa una settimana",
    other: "circa {{count}} settimane"
  },
  xWeeks: {
    one: "una settimana",
    other: "{{count}} settimane"
  },
  aboutXMonths: {
    one: "circa un mese",
    other: "circa {{count}} mesi"
  },
  xMonths: {
    one: "un mese",
    other: "{{count}} mesi"
  },
  aboutXYears: {
    one: "circa un anno",
    other: "circa {{count}} anni"
  },
  xYears: {
    one: "un anno",
    other: "{{count}} anni"
  },
  overXYears: {
    one: "più di un anno",
    other: "più di {{count}} anni"
  },
  almostXYears: {
    one: "quasi un anno",
    other: "quasi {{count}} anni"
  }
};
const formatDistance$i = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$i[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "tra " + result;
    } else {
      return result + " fa";
    }
  }
  return result;
};
const dateFormats$i = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
const timeFormats$i = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$i = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$i = {
  date: buildFormatLongFn({
    formats: dateFormats$i,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$i,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$i,
    defaultWidth: "full"
  })
};
const weekdays = [
  "domenica",
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato"
];
function lastWeek$3(day) {
  switch (day) {
    case 0:
      return "'domenica scorsa alle' p";
    default:
      return "'" + weekdays[day] + " scorso alle' p";
  }
}
function thisWeek$3(day) {
  return "'" + weekdays[day] + " alle' p";
}
function nextWeek$3(day) {
  switch (day) {
    case 0:
      return "'domenica prossima alle' p";
    default:
      return "'" + weekdays[day] + " prossimo alle' p";
  }
}
const formatRelativeLocale$i = {
  lastWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$3(day);
    } else {
      return lastWeek$3(day);
    }
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$3(day);
    } else {
      return nextWeek$3(day);
    }
  },
  other: "P"
};
const formatRelative$i = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$i[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const eraValues$i = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["avanti Cristo", "dopo Cristo"]
};
const quarterValues$i = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
const monthValues$i = {
  narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
  abbreviated: [
    "gen",
    "feb",
    "mar",
    "apr",
    "mag",
    "giu",
    "lug",
    "ago",
    "set",
    "ott",
    "nov",
    "dic"
  ],
  wide: [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ]
};
const dayValues$i = {
  narrow: ["D", "L", "M", "M", "G", "V", "S"],
  short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  wide: [
    "domenica",
    "lunedì",
    "martedì",
    "mercoledì",
    "giovedì",
    "venerdì",
    "sabato"
  ]
};
const dayPeriodValues$i = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  }
};
const formattingDayPeriodValues$f = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  }
};
const ordinalNumber$i = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return String(number);
};
const localize$i = {
  ordinalNumber: ordinalNumber$i,
  era: buildLocalizeFn({
    values: eraValues$i,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$i,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$i,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$i,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$i,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$f,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$i = /^(\d+)(º)?/i;
const parseOrdinalNumberPattern$i = /\d+/i;
const matchEraPatterns$i = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
};
const parseEraPatterns$i = {
  any: [/^a/i, /^(d|e)/i]
};
const matchQuarterPatterns$i = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
const parseQuarterPatterns$i = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$i = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
};
const parseMonthPatterns$i = {
  narrow: [
    /^g/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^g/i,
    /^l/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ge/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^mag/i,
    /^gi/i,
    /^l/i,
    /^ag/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$i = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
};
const parseDayPatterns$i = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
};
const matchDayPeriodPatterns$i = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
};
const parseDayPeriodPatterns$i = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mezza/i,
    noon: /^mezzo/i,
    morning: /mattina/i,
    afternoon: /pomeriggio/i,
    evening: /sera/i,
    night: /notte/i
  }
};
const match$i = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$i,
    parsePattern: parseOrdinalNumberPattern$i,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$i,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$i,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$i,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$i,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$i,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$i,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$i,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$i,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$i,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$i,
    defaultParseWidth: "any"
  })
};
const it = {
  code: "it",
  formatDistance: formatDistance$i,
  formatLong: formatLong$i,
  formatRelative: formatRelative$i,
  localize: localize$i,
  match: match$i,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$h = {
  lessThanXSeconds: {
    one: "1秒未満",
    other: "{{count}}秒未満",
    oneWithSuffix: "約1秒",
    otherWithSuffix: "約{{count}}秒"
  },
  xSeconds: {
    one: "1秒",
    other: "{{count}}秒"
  },
  halfAMinute: "30秒",
  lessThanXMinutes: {
    one: "1分未満",
    other: "{{count}}分未満",
    oneWithSuffix: "約1分",
    otherWithSuffix: "約{{count}}分"
  },
  xMinutes: {
    one: "1分",
    other: "{{count}}分"
  },
  aboutXHours: {
    one: "約1時間",
    other: "約{{count}}時間"
  },
  xHours: {
    one: "1時間",
    other: "{{count}}時間"
  },
  xDays: {
    one: "1日",
    other: "{{count}}日"
  },
  aboutXWeeks: {
    one: "約1週間",
    other: "約{{count}}週間"
  },
  xWeeks: {
    one: "1週間",
    other: "{{count}}週間"
  },
  aboutXMonths: {
    one: "約1か月",
    other: "約{{count}}か月"
  },
  xMonths: {
    one: "1か月",
    other: "{{count}}か月"
  },
  aboutXYears: {
    one: "約1年",
    other: "約{{count}}年"
  },
  xYears: {
    one: "1年",
    other: "{{count}}年"
  },
  overXYears: {
    one: "1年以上",
    other: "{{count}}年以上"
  },
  almostXYears: {
    one: "1年近く",
    other: "{{count}}年近く"
  }
};
const formatDistance$h = (token, count, options) => {
  options = options || {};
  let result;
  const tokenValue = formatDistanceLocale$h[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options.addSuffix && tokenValue.oneWithSuffix) {
      result = tokenValue.oneWithSuffix;
    } else {
      result = tokenValue.one;
    }
  } else {
    if (options.addSuffix && tokenValue.otherWithSuffix) {
      result = tokenValue.otherWithSuffix.replace("{{count}}", String(count));
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "後";
    } else {
      return result + "前";
    }
  }
  return result;
};
const dateFormats$h = {
  full: "y年M月d日EEEE",
  long: "y年M月d日",
  medium: "y/MM/dd",
  short: "y/MM/dd"
};
const timeFormats$h = {
  full: "H時mm分ss秒 zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$h = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$h = {
  date: buildFormatLongFn({
    formats: dateFormats$h,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$h,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$h,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$h = {
  lastWeek: "先週のeeeeのp",
  yesterday: "昨日のp",
  today: "今日のp",
  tomorrow: "明日のp",
  nextWeek: "翌週のeeeeのp",
  other: "P"
};
const formatRelative$h = (token, _date, _baseDate, _options) => {
  return formatRelativeLocale$h[token];
};
const eraValues$h = {
  narrow: ["BC", "AC"],
  abbreviated: ["紀元前", "西暦"],
  wide: ["紀元前", "西暦"]
};
const quarterValues$h = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["第1四半期", "第2四半期", "第3四半期", "第4四半期"]
};
const monthValues$h = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  wide: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ]
};
const dayValues$h = {
  narrow: ["日", "月", "火", "水", "木", "金", "土"],
  short: ["日", "月", "火", "水", "木", "金", "土"],
  abbreviated: ["日", "月", "火", "水", "木", "金", "土"],
  wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
};
const dayPeriodValues$h = {
  narrow: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  abbreviated: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  wide: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  }
};
const formattingDayPeriodValues$e = {
  narrow: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  abbreviated: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  wide: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  }
};
const ordinalNumber$h = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = String(options?.unit);
  switch (unit) {
    case "year":
      return `${number}年`;
    case "quarter":
      return `第${number}四半期`;
    case "month":
      return `${number}月`;
    case "week":
      return `第${number}週`;
    case "date":
      return `${number}日`;
    case "hour":
      return `${number}時`;
    case "minute":
      return `${number}分`;
    case "second":
      return `${number}秒`;
    default:
      return `${number}`;
  }
};
const localize$h = {
  ordinalNumber: ordinalNumber$h,
  era: buildLocalizeFn({
    values: eraValues$h,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$h,
    defaultWidth: "wide",
    argumentCallback: (quarter) => Number(quarter) - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$h,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$h,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$h,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$e,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$h = /^第?\d+(年|四半期|月|週|日|時|分|秒)?/i;
const parseOrdinalNumberPattern$h = /\d+/i;
const matchEraPatterns$h = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(紀元[前後]|西暦)/i,
  wide: /^(紀元[前後]|西暦)/i
};
const parseEraPatterns$h = {
  narrow: [/^B/i, /^A/i],
  any: [/^(紀元前)/i, /^(西暦|紀元後)/i]
};
const matchQuarterPatterns$h = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^第[1234一二三四１２３４]四半期/i
};
const parseQuarterPatterns$h = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
const matchMonthPatterns$h = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])月/i,
  wide: /^([123456789]|1[012])月/i
};
const parseMonthPatterns$h = {
  any: [
    /^1\D/,
    /^2/,
    /^3/,
    /^4/,
    /^5/,
    /^6/,
    /^7/,
    /^8/,
    /^9/,
    /^10/,
    /^11/,
    /^12/
  ]
};
const matchDayPatterns$h = {
  narrow: /^[日月火水木金土]/,
  short: /^[日月火水木金土]/,
  abbreviated: /^[日月火水木金土]/,
  wide: /^[日月火水木金土]曜日/
};
const parseDayPatterns$h = {
  any: [/^日/, /^月/, /^火/, /^水/, /^木/, /^金/, /^土/]
};
const matchDayPeriodPatterns$h = {
  any: /^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i
};
const parseDayPeriodPatterns$h = {
  any: {
    am: /^(A|午前)/i,
    pm: /^(P|午後)/i,
    midnight: /^深夜|真夜中/i,
    noon: /^正午/i,
    morning: /^朝/i,
    afternoon: /^午後/i,
    evening: /^夜/i,
    night: /^深夜/i
  }
};
const match$h = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$h,
    parsePattern: parseOrdinalNumberPattern$h,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$h,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$h,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$h,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$h,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$h,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$h,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$h,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$h,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$h,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$h,
    defaultParseWidth: "any"
  })
};
const ja = {
  code: "ja",
  formatDistance: formatDistance$h,
  formatLong: formatLong$h,
  formatRelative: formatRelative$h,
  localize: localize$h,
  match: match$h,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$g = {
  lessThanXSeconds: "តិចជាង {{count}} វិនាទី",
  xSeconds: "{{count}} វិនាទី",
  halfAMinute: "កន្លះនាទី",
  lessThanXMinutes: "តិចជាង {{count}} នាទី",
  xMinutes: "{{count}} នាទី",
  aboutXHours: "ប្រហែល {{count}} ម៉ោង",
  xHours: "{{count}} ម៉ោង",
  xDays: "{{count}} ថ្ងៃ",
  aboutXWeeks: "ប្រហែល {{count}} សប្តាហ៍",
  xWeeks: "{{count}} សប្តាហ៍",
  aboutXMonths: "ប្រហែល {{count}} ខែ",
  xMonths: "{{count}} ខែ",
  aboutXYears: "ប្រហែល {{count}} ឆ្នាំ",
  xYears: "{{count}} ឆ្នាំ",
  overXYears: "ជាង {{count}} ឆ្នាំ",
  almostXYears: "ជិត {{count}} ឆ្នាំ"
};
const formatDistance$g = (token, count, options) => {
  const tokenValue = formatDistanceLocale$g[token];
  let result = tokenValue;
  if (typeof count === "number") {
    result = result.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "ក្នុងរយៈពេល " + result;
    } else {
      return result + "មុន";
    }
  }
  return result;
};
const dateFormats$g = {
  full: "EEEE do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
const timeFormats$g = {
  full: "h:mm:ss a",
  long: "h:mm:ss a",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$g = {
  full: "{{date}} 'ម៉ោង' {{time}}",
  long: "{{date}} 'ម៉ោង' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$g = {
  date: buildFormatLongFn({
    formats: dateFormats$g,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$g,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$g,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$g = {
  lastWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​មុនម៉ោង' p",
  yesterday: "'ម្សិលមិញនៅម៉ោង' p",
  today: "'ថ្ងៃនេះម៉ោង' p",
  tomorrow: "'ថ្ងៃស្អែកម៉ោង' p",
  nextWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​ក្រោយម៉ោង' p",
  other: "P"
};
const formatRelative$g = (token, _date, _baseDate, _options) => formatRelativeLocale$g[token];
const eraValues$g = {
  narrow: ["ម.គស", "គស"],
  abbreviated: ["មុនគ.ស", "គ.ស"],
  wide: ["មុនគ្រិស្តសករាជ", "នៃគ្រិស្តសករាជ"]
};
const quarterValues$g = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["ត្រីមាសទី 1", "ត្រីមាសទី 2", "ត្រីមាសទី 3", "ត្រីមាសទី 4"]
};
const monthValues$g = {
  narrow: [
    "ម.ក",
    "ក.ម",
    "មិ",
    "ម.ស",
    "ឧ.ស",
    "ម.ថ",
    "ក.ដ",
    "សី",
    "កញ",
    "តុ",
    "វិ",
    "ធ"
  ],
  abbreviated: [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ"
  ],
  wide: [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ"
  ]
};
const dayValues$g = {
  narrow: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  short: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  abbreviated: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  wide: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"]
};
const dayPeriodValues$g = {
  narrow: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  abbreviated: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  wide: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  }
};
const formattingDayPeriodValues$d = {
  narrow: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  abbreviated: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  wide: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  }
};
const ordinalNumber$g = (dirtyNumber, _) => {
  const number = Number(dirtyNumber);
  return number.toString();
};
const localize$g = {
  ordinalNumber: ordinalNumber$g,
  era: buildLocalizeFn({
    values: eraValues$g,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$g,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$g,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$g,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$g,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$d,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$g = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$g = /\d+/i;
const matchEraPatterns$g = {
  narrow: /^(ម\.)?គស/i,
  abbreviated: /^(មុន)?គ\.ស/i,
  wide: /^(មុន|នៃ)គ្រិស្តសករាជ/i
};
const parseEraPatterns$g = {
  any: [/^(ម|មុន)គ\.?ស/i, /^(នៃ)?គ\.?ស/i]
};
const matchQuarterPatterns$g = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^(ត្រីមាស)(ទី)?\s?[1234]/i
};
const parseQuarterPatterns$g = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$g = {
  narrow: /^(ម\.ក|ក\.ម|មិ|ម\.ស|ឧ\.ស|ម\.ថ|ក\.ដ|សី|កញ|តុ|វិ|ធ)/i,
  abbreviated: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i,
  wide: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i
};
const parseMonthPatterns$g = {
  narrow: [
    /^ម\.ក/i,
    /^ក\.ម/i,
    /^មិ/i,
    /^ម\.ស/i,
    /^ឧ\.ស/i,
    /^ម\.ថ/i,
    /^ក\.ដ/i,
    /^សី/i,
    /^កញ/i,
    /^តុ/i,
    /^វិ/i,
    /^ធ/i
  ],
  any: [
    /^មក/i,
    /^កុ/i,
    /^មីន/i,
    /^មេ/i,
    /^ឧស/i,
    /^មិថ/i,
    /^កក/i,
    /^សី/i,
    /^កញ/i,
    /^តុ/i,
    /^វិច/i,
    /^ធ/i
  ]
};
const matchDayPatterns$g = {
  narrow: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  short: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  abbreviated: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  wide: /^(អាទិត្យ|ចន្ទ|អង្គារ|ពុធ|ព្រហស្បតិ៍|សុក្រ|សៅរ៍)/i
};
const parseDayPatterns$g = {
  narrow: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^ស/i],
  any: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^សៅ/i]
};
const matchDayPeriodPatterns$g = {
  narrow: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i,
  any: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i
};
const parseDayPeriodPatterns$g = {
  any: {
    am: /^ព្រឹក/i,
    pm: /^ល្ងាច/i,
    midnight: /^ពេលកណ្ដាលអធ្រាត្រ/i,
    noon: /^ពេលថ្ងៃត្រង់/i,
    morning: /ពេលព្រឹក/i,
    afternoon: /ពេលរសៀល/i,
    evening: /ពេលល្ងាច/i,
    night: /ពេលយប់/i
  }
};
const match$g = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$g,
    parsePattern: parseOrdinalNumberPattern$g,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$g,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$g,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$g,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$g,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$g,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$g,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$g,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$g,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$g,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$g,
    defaultParseWidth: "any"
  })
};
const km = {
  code: "km",
  formatDistance: formatDistance$g,
  formatLong: formatLong$g,
  formatRelative: formatRelative$g,
  localize: localize$g,
  match: match$g,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$f = {
  lessThanXSeconds: {
    one: "1초 미만",
    other: "{{count}}초 미만"
  },
  xSeconds: {
    one: "1초",
    other: "{{count}}초"
  },
  halfAMinute: "30초",
  lessThanXMinutes: {
    one: "1분 미만",
    other: "{{count}}분 미만"
  },
  xMinutes: {
    one: "1분",
    other: "{{count}}분"
  },
  aboutXHours: {
    one: "약 1시간",
    other: "약 {{count}}시간"
  },
  xHours: {
    one: "1시간",
    other: "{{count}}시간"
  },
  xDays: {
    one: "1일",
    other: "{{count}}일"
  },
  aboutXWeeks: {
    one: "약 1주",
    other: "약 {{count}}주"
  },
  xWeeks: {
    one: "1주",
    other: "{{count}}주"
  },
  aboutXMonths: {
    one: "약 1개월",
    other: "약 {{count}}개월"
  },
  xMonths: {
    one: "1개월",
    other: "{{count}}개월"
  },
  aboutXYears: {
    one: "약 1년",
    other: "약 {{count}}년"
  },
  xYears: {
    one: "1년",
    other: "{{count}}년"
  },
  overXYears: {
    one: "1년 이상",
    other: "{{count}}년 이상"
  },
  almostXYears: {
    one: "거의 1년",
    other: "거의 {{count}}년"
  }
};
const formatDistance$f = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$f[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " 후";
    } else {
      return result + " 전";
    }
  }
  return result;
};
const dateFormats$f = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
};
const timeFormats$f = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$f = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$f = {
  date: buildFormatLongFn({
    formats: dateFormats$f,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$f,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$f,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$f = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
};
const formatRelative$f = (token, _date, _baseDate, _options) => formatRelativeLocale$f[token];
const eraValues$f = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
};
const quarterValues$f = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
};
const monthValues$f = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ],
  wide: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ]
};
const dayValues$f = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
};
const dayPeriodValues$f = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
const formattingDayPeriodValues$c = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
const ordinalNumber$f = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = String(options?.unit);
  switch (unit) {
    case "minute":
    case "second":
      return String(number);
    case "date":
      return number + "일";
    default:
      return number + "번째";
  }
};
const localize$f = {
  ordinalNumber: ordinalNumber$f,
  era: buildLocalizeFn({
    values: eraValues$f,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$f,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$f,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$f,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$f,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$c,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$f = /^(\d+)(일|번째)?/i;
const parseOrdinalNumberPattern$f = /\d+/i;
const matchEraPatterns$f = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
};
const parseEraPatterns$f = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
};
const matchQuarterPatterns$f = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
};
const parseQuarterPatterns$f = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$f = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
};
const parseMonthPatterns$f = {
  any: [
    /^1월?$/,
    /^2/,
    /^3/,
    /^4/,
    /^5/,
    /^6/,
    /^7/,
    /^8/,
    /^9/,
    /^10/,
    /^11/,
    /^12/
  ]
};
const matchDayPatterns$f = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
};
const parseDayPatterns$f = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
};
const matchDayPeriodPatterns$f = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
};
const parseDayPeriodPatterns$f = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
};
const match$f = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$f,
    parsePattern: parseOrdinalNumberPattern$f,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$f,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$f,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$f,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$f,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$f,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$f,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$f,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$f,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$f,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$f,
    defaultParseWidth: "any"
  })
};
const ko = {
  code: "ko",
  formatDistance: formatDistance$f,
  formatLong: formatLong$f,
  formatRelative: formatRelative$f,
  localize: localize$f,
  match: match$f,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$e = {
  lessThanXSeconds: {
    one: "mindre enn ett sekund",
    other: "mindre enn {{count}} sekunder"
  },
  xSeconds: {
    one: "ett sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "et halvt minutt",
  lessThanXMinutes: {
    one: "mindre enn ett minutt",
    other: "mindre enn {{count}} minutter"
  },
  xMinutes: {
    one: "ett minutt",
    other: "{{count}} minutter"
  },
  aboutXHours: {
    one: "omtrent en time",
    other: "omtrent {{count}} timer"
  },
  xHours: {
    one: "en time",
    other: "{{count}} timer"
  },
  xDays: {
    one: "en dag",
    other: "{{count}} dager"
  },
  aboutXWeeks: {
    one: "omtrent en uke",
    other: "omtrent {{count}} uker"
  },
  xWeeks: {
    one: "en uke",
    other: "{{count}} uker"
  },
  aboutXMonths: {
    one: "omtrent en måned",
    other: "omtrent {{count}} måneder"
  },
  xMonths: {
    one: "en måned",
    other: "{{count}} måneder"
  },
  aboutXYears: {
    one: "omtrent ett år",
    other: "omtrent {{count}} år"
  },
  xYears: {
    one: "ett år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over ett år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "nesten ett år",
    other: "nesten {{count}} år"
  }
};
const formatDistance$e = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$e[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " siden";
    }
  }
  return result;
};
const dateFormats$e = {
  full: "EEEE d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd.MM.y"
};
const timeFormats$e = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$e = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$e = {
  date: buildFormatLongFn({
    formats: dateFormats$e,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$e,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$e,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$e = {
  lastWeek: "'forrige' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: "P"
};
const formatRelative$e = (token, _date, _baseDate, _options) => formatRelativeLocale$e[token];
const eraValues$e = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["før Kristus", "etter Kristus"]
};
const quarterValues$e = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
const monthValues$e = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan.",
    "feb.",
    "mars",
    "apr.",
    "mai",
    "juni",
    "juli",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "des."
  ],
  wide: [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember"
  ]
};
const dayValues$e = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
  abbreviated: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
  wide: [
    "søndag",
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag"
  ]
};
const dayPeriodValues$e = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natten"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natten"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morgenen",
    afternoon: "på ettermiddagen",
    evening: "på kvelden",
    night: "på natten"
  }
};
const ordinalNumber$e = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$e = {
  ordinalNumber: ordinalNumber$e,
  era: buildLocalizeFn({
    values: eraValues$e,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$e,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$e,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$e,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$e,
    defaultWidth: "wide"
  })
};
const matchOrdinalNumberPattern$e = /^(\d+)\.?/i;
const parseOrdinalNumberPattern$e = /\d+/i;
const matchEraPatterns$e = {
  narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
};
const parseEraPatterns$e = {
  any: [/^f/i, /^e/i]
};
const matchQuarterPatterns$e = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
const parseQuarterPatterns$e = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$e = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
  wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
};
const parseMonthPatterns$e = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^aug/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$e = {
  narrow: /^[smtofl]/i,
  short: /^(sø|ma|ti|on|to|fr|lø)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
const parseDayPatterns$e = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
const matchDayPeriodPatterns$e = {
  narrow: /^(midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten)|[ap])/i,
  any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten))/i
};
const parseDayPeriodPatterns$e = {
  any: {
    am: /^a(\.?\s?m\.?)?$/i,
    pm: /^p(\.?\s?m\.?)?$/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgen/i,
    afternoon: /ettermiddag/i,
    evening: /kveld/i,
    night: /natt/i
  }
};
const match$e = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$e,
    parsePattern: parseOrdinalNumberPattern$e,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$e,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$e,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$e,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$e,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$e,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$e,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$e,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$e,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$e,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$e,
    defaultParseWidth: "any"
  })
};
const nb = {
  code: "nb",
  formatDistance: formatDistance$e,
  formatLong: formatLong$e,
  formatRelative: formatRelative$e,
  localize: localize$e,
  match: match$e,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$d = {
  lessThanXSeconds: {
    one: "minder dan een seconde",
    other: "minder dan {{count}} seconden"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} seconden"
  },
  halfAMinute: "een halve minuut",
  lessThanXMinutes: {
    one: "minder dan een minuut",
    other: "minder dan {{count}} minuten"
  },
  xMinutes: {
    one: "een minuut",
    other: "{{count}} minuten"
  },
  aboutXHours: {
    one: "ongeveer 1 uur",
    other: "ongeveer {{count}} uur"
  },
  xHours: {
    one: "1 uur",
    other: "{{count}} uur"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dagen"
  },
  aboutXWeeks: {
    one: "ongeveer 1 week",
    other: "ongeveer {{count}} weken"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weken"
  },
  aboutXMonths: {
    one: "ongeveer 1 maand",
    other: "ongeveer {{count}} maanden"
  },
  xMonths: {
    one: "1 maand",
    other: "{{count}} maanden"
  },
  aboutXYears: {
    one: "ongeveer 1 jaar",
    other: "ongeveer {{count}} jaar"
  },
  xYears: {
    one: "1 jaar",
    other: "{{count}} jaar"
  },
  overXYears: {
    one: "meer dan 1 jaar",
    other: "meer dan {{count}} jaar"
  },
  almostXYears: {
    one: "bijna 1 jaar",
    other: "bijna {{count}} jaar"
  }
};
const formatDistance$d = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$d[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "over " + result;
    } else {
      return result + " geleden";
    }
  }
  return result;
};
const dateFormats$d = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd-MM-y"
};
const timeFormats$d = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$d = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$d = {
  date: buildFormatLongFn({
    formats: dateFormats$d,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$d,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$d,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$d = {
  lastWeek: "'afgelopen' eeee 'om' p",
  yesterday: "'gisteren om' p",
  today: "'vandaag om' p",
  tomorrow: "'morgen om' p",
  nextWeek: "eeee 'om' p",
  other: "P"
};
const formatRelative$d = (token, _date, _baseDate, _options) => formatRelativeLocale$d[token];
const eraValues$d = {
  narrow: ["v.C.", "n.C."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["voor Christus", "na Christus"]
};
const quarterValues$d = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1e kwartaal", "2e kwartaal", "3e kwartaal", "4e kwartaal"]
};
const monthValues$d = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan.",
    "feb.",
    "mrt.",
    "apr.",
    "mei",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "dec."
  ],
  wide: [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december"
  ]
};
const dayValues$d = {
  narrow: ["Z", "M", "D", "W", "D", "V", "Z"],
  short: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  abbreviated: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
  wide: [
    "zondag",
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag"
  ]
};
const dayPeriodValues$d = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  }
};
const ordinalNumber$d = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + "e";
};
const localize$d = {
  ordinalNumber: ordinalNumber$d,
  era: buildLocalizeFn({
    values: eraValues$d,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$d,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$d,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$d,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$d,
    defaultWidth: "wide"
  })
};
const matchOrdinalNumberPattern$d = /^(\d+)e?/i;
const parseOrdinalNumberPattern$d = /\d+/i;
const matchEraPatterns$d = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?Chr\.?)/,
  wide: /^((voor|na) Christus)/
};
const parseEraPatterns$d = {
  any: [/^v/, /^n/]
};
const matchQuarterPatterns$d = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e kwartaal/i
};
const parseQuarterPatterns$d = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$d = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i
};
const parseMonthPatterns$d = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^jan/i,
    /^feb/i,
    /^m(r|a)/i,
    /^apr/i,
    /^mei/i,
    /^jun/i,
    /^jul/i,
    /^aug/i,
    /^sep/i,
    /^okt/i,
    /^nov/i,
    /^dec/i
  ]
};
const matchDayPatterns$d = {
  narrow: /^[zmdwv]/i,
  short: /^(zo|ma|di|wo|do|vr|za)/i,
  abbreviated: /^(zon|maa|din|woe|don|vri|zat)/i,
  wide: /^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i
};
const parseDayPatterns$d = {
  narrow: [/^z/i, /^m/i, /^d/i, /^w/i, /^d/i, /^v/i, /^z/i],
  any: [/^zo/i, /^ma/i, /^di/i, /^wo/i, /^do/i, /^vr/i, /^za/i]
};
const matchDayPeriodPatterns$d = {
  any: /^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i
};
const parseDayPeriodPatterns$d = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^het middaguur/i,
    morning: /ochtend/i,
    afternoon: /middag/i,
    evening: /avond/i,
    night: /nacht/i
  }
};
const match$d = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$d,
    parsePattern: parseOrdinalNumberPattern$d,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$d,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$d,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$d,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$d,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$d,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$d,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$d,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$d,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$d,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$d,
    defaultParseWidth: "any"
  })
};
const nl = {
  code: "nl",
  formatDistance: formatDistance$d,
  formatLong: formatLong$d,
  formatRelative: formatRelative$d,
  localize: localize$d,
  match: match$d,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$c = {
  lessThanXSeconds: {
    one: {
      regular: "mniej niż sekunda",
      past: "mniej niż sekundę",
      future: "mniej niż sekundę"
    },
    twoFour: "mniej niż {{count}} sekundy",
    other: "mniej niż {{count}} sekund"
  },
  xSeconds: {
    one: {
      regular: "sekunda",
      past: "sekundę",
      future: "sekundę"
    },
    twoFour: "{{count}} sekundy",
    other: "{{count}} sekund"
  },
  halfAMinute: {
    one: "pół minuty",
    twoFour: "pół minuty",
    other: "pół minuty"
  },
  lessThanXMinutes: {
    one: {
      regular: "mniej niż minuta",
      past: "mniej niż minutę",
      future: "mniej niż minutę"
    },
    twoFour: "mniej niż {{count}} minuty",
    other: "mniej niż {{count}} minut"
  },
  xMinutes: {
    one: {
      regular: "minuta",
      past: "minutę",
      future: "minutę"
    },
    twoFour: "{{count}} minuty",
    other: "{{count}} minut"
  },
  aboutXHours: {
    one: {
      regular: "około godziny",
      past: "około godziny",
      future: "około godzinę"
    },
    twoFour: "około {{count}} godziny",
    other: "około {{count}} godzin"
  },
  xHours: {
    one: {
      regular: "godzina",
      past: "godzinę",
      future: "godzinę"
    },
    twoFour: "{{count}} godziny",
    other: "{{count}} godzin"
  },
  xDays: {
    one: {
      regular: "dzień",
      past: "dzień",
      future: "1 dzień"
    },
    twoFour: "{{count}} dni",
    other: "{{count}} dni"
  },
  aboutXWeeks: {
    one: "około tygodnia",
    twoFour: "około {{count}} tygodni",
    other: "około {{count}} tygodni"
  },
  xWeeks: {
    one: "tydzień",
    twoFour: "{{count}} tygodnie",
    other: "{{count}} tygodni"
  },
  aboutXMonths: {
    one: "około miesiąc",
    twoFour: "około {{count}} miesiące",
    other: "około {{count}} miesięcy"
  },
  xMonths: {
    one: "miesiąc",
    twoFour: "{{count}} miesiące",
    other: "{{count}} miesięcy"
  },
  aboutXYears: {
    one: "około rok",
    twoFour: "około {{count}} lata",
    other: "około {{count}} lat"
  },
  xYears: {
    one: "rok",
    twoFour: "{{count}} lata",
    other: "{{count}} lat"
  },
  overXYears: {
    one: "ponad rok",
    twoFour: "ponad {{count}} lata",
    other: "ponad {{count}} lat"
  },
  almostXYears: {
    one: "prawie rok",
    twoFour: "prawie {{count}} lata",
    other: "prawie {{count}} lat"
  }
};
function declensionGroup$1(scheme, count) {
  if (count === 1) {
    return scheme.one;
  }
  const rem100 = count % 100;
  if (rem100 <= 20 && rem100 > 10) {
    return scheme.other;
  }
  const rem10 = rem100 % 10;
  if (rem10 >= 2 && rem10 <= 4) {
    return scheme.twoFour;
  }
  return scheme.other;
}
function declension$3(scheme, count, time) {
  const group = declensionGroup$1(scheme, count);
  const finalText = typeof group === "string" ? group : group[time];
  return finalText.replace("{{count}}", String(count));
}
const formatDistance$c = (token, count, options) => {
  const scheme = formatDistanceLocale$c[token];
  if (!options?.addSuffix) {
    return declension$3(scheme, count, "regular");
  }
  if (options.comparison && options.comparison > 0) {
    return "za " + declension$3(scheme, count, "future");
  } else {
    return declension$3(scheme, count, "past") + " temu";
  }
};
const dateFormats$c = {
  full: "EEEE, do MMMM y",
  long: "do MMMM y",
  medium: "do MMM y",
  short: "dd.MM.y"
};
const timeFormats$c = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$c = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$c = {
  date: buildFormatLongFn({
    formats: dateFormats$c,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$c,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$c,
    defaultWidth: "full"
  })
};
const adjectivesLastWeek = {
  masculine: "ostatni",
  feminine: "ostatnia"
};
const adjectivesThisWeek = {
  masculine: "ten",
  feminine: "ta"
};
const adjectivesNextWeek = {
  masculine: "następny",
  feminine: "następna"
};
const dayGrammaticalGender = {
  0: "feminine",
  1: "masculine",
  2: "masculine",
  3: "feminine",
  4: "masculine",
  5: "masculine",
  6: "feminine"
};
function dayAndTimeWithAdjective(token, date, baseDate, options) {
  let adjectives;
  if (isSameWeek(date, baseDate, options)) {
    adjectives = adjectivesThisWeek;
  } else if (token === "lastWeek") {
    adjectives = adjectivesLastWeek;
  } else if (token === "nextWeek") {
    adjectives = adjectivesNextWeek;
  } else {
    throw new Error(`Cannot determine adjectives for token ${token}`);
  }
  const day = date.getDay();
  const grammaticalGender = dayGrammaticalGender[day];
  const adjective = adjectives[grammaticalGender];
  return `'${adjective}' eeee 'o' p`;
}
const formatRelativeLocale$c = {
  lastWeek: dayAndTimeWithAdjective,
  yesterday: "'wczoraj o' p",
  today: "'dzisiaj o' p",
  tomorrow: "'jutro o' p",
  nextWeek: dayAndTimeWithAdjective,
  other: "P"
};
const formatRelative$c = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$c[token];
  if (typeof format === "function") {
    return format(token, date, baseDate, options);
  }
  return format;
};
const eraValues$c = {
  narrow: ["p.n.e.", "n.e."],
  abbreviated: ["p.n.e.", "n.e."],
  wide: ["przed naszą erą", "naszej ery"]
};
const quarterValues$c = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["I kw.", "II kw.", "III kw.", "IV kw."],
  wide: ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"]
};
const monthValues$c = {
  narrow: ["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"],
  abbreviated: [
    "sty",
    "lut",
    "mar",
    "kwi",
    "maj",
    "cze",
    "lip",
    "sie",
    "wrz",
    "paź",
    "lis",
    "gru"
  ],
  wide: [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień"
  ]
};
const monthFormattingValues = {
  narrow: ["s", "l", "m", "k", "m", "c", "l", "s", "w", "p", "l", "g"],
  abbreviated: [
    "sty",
    "lut",
    "mar",
    "kwi",
    "maj",
    "cze",
    "lip",
    "sie",
    "wrz",
    "paź",
    "lis",
    "gru"
  ],
  wide: [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia"
  ]
};
const dayValues$c = {
  narrow: ["N", "P", "W", "Ś", "C", "P", "S"],
  short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
  abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  wide: [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota"
  ]
};
const dayFormattingValues = {
  narrow: ["n", "p", "w", "ś", "c", "p", "s"],
  short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
  abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  wide: [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota"
  ]
};
const dayPeriodValues$c = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "półn.",
    noon: "poł",
    morning: "rano",
    afternoon: "popoł.",
    evening: "wiecz.",
    night: "noc"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "północ",
    noon: "południe",
    morning: "rano",
    afternoon: "popołudnie",
    evening: "wieczór",
    night: "noc"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "północ",
    noon: "południe",
    morning: "rano",
    afternoon: "popołudnie",
    evening: "wieczór",
    night: "noc"
  }
};
const dayPeriodFormattingValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "o półn.",
    noon: "w poł.",
    morning: "rano",
    afternoon: "po poł.",
    evening: "wiecz.",
    night: "w nocy"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "o północy",
    noon: "w południe",
    morning: "rano",
    afternoon: "po południu",
    evening: "wieczorem",
    night: "w nocy"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "o północy",
    noon: "w południe",
    morning: "rano",
    afternoon: "po południu",
    evening: "wieczorem",
    night: "w nocy"
  }
};
const ordinalNumber$c = (dirtyNumber, _options) => {
  return String(dirtyNumber);
};
const localize$c = {
  ordinalNumber: ordinalNumber$c,
  era: buildLocalizeFn({
    values: eraValues$c,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$c,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$c,
    defaultWidth: "wide",
    formattingValues: monthFormattingValues,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$c,
    defaultWidth: "wide",
    formattingValues: dayFormattingValues,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$c,
    defaultWidth: "wide",
    formattingValues: dayPeriodFormattingValues,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$c = /^(\d+)?/i;
const parseOrdinalNumberPattern$c = /\d+/i;
const matchEraPatterns$c = {
  narrow: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  abbreviated: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  wide: /^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i
};
const parseEraPatterns$c = {
  any: [/^p/i, /^n/i]
};
const matchQuarterPatterns$c = {
  narrow: /^[1234]/i,
  abbreviated: /^(I|II|III|IV)\s*kw\.?/i,
  wide: /^(I|II|III|IV)\s*kwarta(ł|l)/i
};
const parseQuarterPatterns$c = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/^I kw/i, /^II kw/i, /^III kw/i, /^IV kw/i]
};
const matchMonthPatterns$c = {
  narrow: /^[slmkcwpg]/i,
  abbreviated: /^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,
  wide: /^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i
};
const parseMonthPatterns$c = {
  narrow: [
    /^s/i,
    /^l/i,
    /^m/i,
    /^k/i,
    /^m/i,
    /^c/i,
    /^l/i,
    /^s/i,
    /^w/i,
    /^p/i,
    /^l/i,
    /^g/i
  ],
  any: [
    /^st/i,
    /^lu/i,
    /^mar/i,
    /^k/i,
    /^maj/i,
    /^c/i,
    /^lip/i,
    /^si/i,
    /^w/i,
    /^p/i,
    /^lis/i,
    /^g/i
  ]
};
const matchDayPatterns$c = {
  narrow: /^[npwścs]/i,
  short: /^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,
  abbreviated: /^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,
  wide: /^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i
};
const parseDayPatterns$c = {
  narrow: [/^n/i, /^p/i, /^w/i, /^ś/i, /^c/i, /^p/i, /^s/i],
  abbreviated: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pt/i, /^so/i],
  any: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pi/i, /^so/i]
};
const matchDayPeriodPatterns$c = {
  narrow: /^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,
  any: /^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i
};
const parseDayPeriodPatterns$c = {
  narrow: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
  },
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
  }
};
const match$c = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$c,
    parsePattern: parseOrdinalNumberPattern$c,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$c,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$c,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$c,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$c,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$c,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$c,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$c,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$c,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$c,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$c,
    defaultParseWidth: "any"
  })
};
const pl = {
  code: "pl",
  formatDistance: formatDistance$c,
  formatLong: formatLong$c,
  formatRelative: formatRelative$c,
  localize: localize$c,
  match: match$c,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$b = {
  lessThanXSeconds: {
    one: "menos de um segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "meio minuto",
  lessThanXMinutes: {
    one: "menos de um minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "cerca de 1 hora",
    other: "cerca de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dias"
  },
  aboutXWeeks: {
    one: "cerca de 1 semana",
    other: "cerca de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "cerca de 1 mês",
    other: "cerca de {{count}} meses"
  },
  xMonths: {
    one: "1 mês",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "cerca de 1 ano",
    other: "cerca de {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "mais de 1 ano",
    other: "mais de {{count}} anos"
  },
  almostXYears: {
    one: "quase 1 ano",
    other: "quase {{count}} anos"
  }
};
const formatDistance$b = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$b[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "em " + result;
    } else {
      return "há " + result;
    }
  }
  return result;
};
const dateFormats$b = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
const timeFormats$b = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$b = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$b = {
  date: buildFormatLongFn({
    formats: dateFormats$b,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$b,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$b,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$b = {
  lastWeek: (date) => {
    const weekday = date.getDay();
    const last = weekday === 0 || weekday === 6 ? "último" : "última";
    return "'" + last + "' eeee 'às' p";
  },
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: "P"
};
const formatRelative$b = (token, date, _baseDate, _options) => {
  const format = formatRelativeLocale$b[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
const eraValues$b = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "depois de cristo"]
};
const quarterValues$b = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
const monthValues$b = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez"
  ],
  wide: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
  ]
};
const dayValues$b = {
  narrow: ["D", "S", "T", "Q", "Q", "S", "S"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  abbreviated: [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado"
  ],
  wide: [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  ]
};
const dayPeriodValues$b = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  }
};
const formattingDayPeriodValues$b = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  }
};
const ordinalNumber$b = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  if (options?.unit === "week") {
    return number + "ª";
  }
  return number + "º";
};
const localize$b = {
  ordinalNumber: ordinalNumber$b,
  era: buildLocalizeFn({
    values: eraValues$b,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$b,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$b,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$b,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$b,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$b,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$b = /^(\d+)[ºªo]?/i;
const parseOrdinalNumberPattern$b = /\d+/i;
const matchEraPatterns$b = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
  wide: /^(antes de cristo|depois de cristo)/i
};
const parseEraPatterns$b = {
  any: [/^ac/i, /^dc/i],
  wide: [/^antes de cristo/i, /^depois de cristo/i]
};
const matchQuarterPatterns$b = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
const parseQuarterPatterns$b = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$b = {
  narrow: /^[jfmajsond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
const parseMonthPatterns$b = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^fev/i,
    /^mar/i,
    /^abr/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^set/i,
    /^out/i,
    /^nov/i,
    /^dez/i
  ]
};
const matchDayPatterns$b = {
  narrow: /^(dom|[23456]ª?|s[aá]b)/i,
  short: /^(dom|[23456]ª?|s[aá]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
  wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
};
const parseDayPatterns$b = {
  short: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  narrow: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[aá]b/i]
};
const matchDayPeriodPatterns$b = {
  narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
};
const parseDayPeriodPatterns$b = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn|^meia[-\s]noite/i,
    noon: /^md|^meio[-\s]dia/i,
    morning: /manhã/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noite/i
  }
};
const match$b = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$b,
    parsePattern: parseOrdinalNumberPattern$b,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$b,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$b,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$b,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$b,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$b,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$b,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$b,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$b,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$b,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$b,
    defaultParseWidth: "any"
  })
};
const ptBR = {
  code: "pt-BR",
  formatDistance: formatDistance$b,
  formatLong: formatLong$b,
  formatRelative: formatRelative$b,
  localize: localize$b,
  match: match$b,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function declension$2(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  const rem10 = count % 10;
  const rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn$1(scheme) {
  return (count, options) => {
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension$2(scheme.future, count);
        } else {
          return "через " + declension$2(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension$2(scheme.past, count);
        } else {
          return declension$2(scheme.regular, count) + " назад";
        }
      }
    } else {
      return declension$2(scheme.regular, count);
    }
  };
}
const formatDistanceLocale$a = {
  lessThanXSeconds: buildLocalizeTokenFn$1({
    regular: {
      one: "меньше секунды",
      singularNominative: "меньше {{count}} секунды",
      singularGenitive: "меньше {{count}} секунд",
      pluralGenitive: "меньше {{count}} секунд"
    },
    future: {
      one: "меньше, чем через секунду",
      singularNominative: "меньше, чем через {{count}} секунду",
      singularGenitive: "меньше, чем через {{count}} секунды",
      pluralGenitive: "меньше, чем через {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду назад",
      singularGenitive: "{{count}} секунды назад",
      pluralGenitive: "{{count}} секунд назад"
    },
    future: {
      singularNominative: "через {{count}} секунду",
      singularGenitive: "через {{count}} секунды",
      pluralGenitive: "через {{count}} секунд"
    }
  }),
  halfAMinute: (_count, options) => {
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "через полминуты";
      } else {
        return "полминуты назад";
      }
    }
    return "полминуты";
  },
  lessThanXMinutes: buildLocalizeTokenFn$1({
    regular: {
      one: "меньше минуты",
      singularNominative: "меньше {{count}} минуты",
      singularGenitive: "меньше {{count}} минут",
      pluralGenitive: "меньше {{count}} минут"
    },
    future: {
      one: "меньше, чем через минуту",
      singularNominative: "меньше, чем через {{count}} минуту",
      singularGenitive: "меньше, чем через {{count}} минуты",
      pluralGenitive: "меньше, чем через {{count}} минут"
    }
  }),
  xMinutes: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} минута",
      singularGenitive: "{{count}} минуты",
      pluralGenitive: "{{count}} минут"
    },
    past: {
      singularNominative: "{{count}} минуту назад",
      singularGenitive: "{{count}} минуты назад",
      pluralGenitive: "{{count}} минут назад"
    },
    future: {
      singularNominative: "через {{count}} минуту",
      singularGenitive: "через {{count}} минуты",
      pluralGenitive: "через {{count}} минут"
    }
  }),
  aboutXHours: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "около {{count}} часа",
      singularGenitive: "около {{count}} часов",
      pluralGenitive: "около {{count}} часов"
    },
    future: {
      singularNominative: "приблизительно через {{count}} час",
      singularGenitive: "приблизительно через {{count}} часа",
      pluralGenitive: "приблизительно через {{count}} часов"
    }
  }),
  xHours: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} час",
      singularGenitive: "{{count}} часа",
      pluralGenitive: "{{count}} часов"
    }
  }),
  xDays: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} дня",
      pluralGenitive: "{{count}} дней"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "около {{count}} недели",
      singularGenitive: "около {{count}} недель",
      pluralGenitive: "около {{count}} недель"
    },
    future: {
      singularNominative: "приблизительно через {{count}} неделю",
      singularGenitive: "приблизительно через {{count}} недели",
      pluralGenitive: "приблизительно через {{count}} недель"
    }
  }),
  xWeeks: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} неделя",
      singularGenitive: "{{count}} недели",
      pluralGenitive: "{{count}} недель"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "около {{count}} месяца",
      singularGenitive: "около {{count}} месяцев",
      pluralGenitive: "около {{count}} месяцев"
    },
    future: {
      singularNominative: "приблизительно через {{count}} месяц",
      singularGenitive: "приблизительно через {{count}} месяца",
      pluralGenitive: "приблизительно через {{count}} месяцев"
    }
  }),
  xMonths: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяца",
      pluralGenitive: "{{count}} месяцев"
    }
  }),
  aboutXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "около {{count}} года",
      singularGenitive: "около {{count}} лет",
      pluralGenitive: "около {{count}} лет"
    },
    future: {
      singularNominative: "приблизительно через {{count}} год",
      singularGenitive: "приблизительно через {{count}} года",
      pluralGenitive: "приблизительно через {{count}} лет"
    }
  }),
  xYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} года",
      pluralGenitive: "{{count}} лет"
    }
  }),
  overXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "больше {{count}} года",
      singularGenitive: "больше {{count}} лет",
      pluralGenitive: "больше {{count}} лет"
    },
    future: {
      singularNominative: "больше, чем через {{count}} год",
      singularGenitive: "больше, чем через {{count}} года",
      pluralGenitive: "больше, чем через {{count}} лет"
    }
  }),
  almostXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: "почти {{count}} год",
      singularGenitive: "почти {{count}} года",
      pluralGenitive: "почти {{count}} лет"
    },
    future: {
      singularNominative: "почти через {{count}} год",
      singularGenitive: "почти через {{count}} года",
      pluralGenitive: "почти через {{count}} лет"
    }
  })
};
const formatDistance$a = (token, count, options) => {
  return formatDistanceLocale$a[token](count, options);
};
const dateFormats$a = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y"
};
const timeFormats$a = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$a = {
  any: "{{date}}, {{time}}"
};
const formatLong$a = {
  date: buildFormatLongFn({
    formats: dateFormats$a,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$a,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$a,
    defaultWidth: "any"
  })
};
const accusativeWeekdays$2 = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];
function lastWeek$2(day) {
  const weekday = accusativeWeekdays$2[day];
  switch (day) {
    case 0:
      return "'в прошлое " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в прошлый " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в прошлую " + weekday + " в' p";
  }
}
function thisWeek$2(day) {
  const weekday = accusativeWeekdays$2[day];
  if (day === 2) {
    return "'во " + weekday + " в' p";
  } else {
    return "'в " + weekday + " в' p";
  }
}
function nextWeek$2(day) {
  const weekday = accusativeWeekdays$2[day];
  switch (day) {
    case 0:
      return "'в следующее " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в следующий " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в следующую " + weekday + " в' p";
  }
}
const formatRelativeLocale$a = {
  lastWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$2(day);
    } else {
      return lastWeek$2(day);
    }
  },
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: "'завтра в' p",
  nextWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$2(day);
    } else {
      return nextWeek$2(day);
    }
  },
  other: "P"
};
const formatRelative$a = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$a[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const eraValues$a = {
  narrow: ["до н.э.", "н.э."],
  abbreviated: ["до н. э.", "н. э."],
  wide: ["до нашей эры", "нашей эры"]
};
const quarterValues$a = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"]
};
const monthValues$a = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "март",
    "апр.",
    "май",
    "июнь",
    "июль",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек."
  ],
  wide: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ]
};
const formattingMonthValues$3 = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июн.",
    "июл.",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек."
  ],
  wide: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ]
};
const dayValues$a = {
  narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
  short: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["вск", "пнд", "втр", "срд", "чтв", "птн", "суб"],
  wide: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота"
  ]
};
const dayPeriodValues$a = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утро",
    afternoon: "день",
    evening: "вечер",
    night: "ночь"
  }
};
const formattingDayPeriodValues$a = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утра",
    afternoon: "дня",
    evening: "вечера",
    night: "ночи"
  }
};
const ordinalNumber$a = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = options?.unit;
  let suffix;
  if (unit === "date") {
    suffix = "-е";
  } else if (unit === "week" || unit === "minute" || unit === "second") {
    suffix = "-я";
  } else {
    suffix = "-й";
  }
  return number + suffix;
};
const localize$a = {
  ordinalNumber: ordinalNumber$a,
  era: buildLocalizeFn({
    values: eraValues$a,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$a,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$a,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues$3,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$a,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$a,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues$a,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$a = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i;
const parseOrdinalNumberPattern$a = /\d+/i;
const matchEraPatterns$a = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
};
const parseEraPatterns$a = {
  any: [/^д/i, /^н/i]
};
const matchQuarterPatterns$a = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
};
const parseQuarterPatterns$a = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$a = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
};
const parseMonthPatterns$a = {
  narrow: [
    /^я/i,
    /^ф/i,
    /^м/i,
    /^а/i,
    /^м/i,
    /^и/i,
    /^и/i,
    /^а/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^я/i
  ],
  any: [
    /^я/i,
    /^ф/i,
    /^мар/i,
    /^ап/i,
    /^ма[йя]/i,
    /^июн/i,
    /^июл/i,
    /^ав/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^д/i
  ]
};
const matchDayPatterns$a = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
};
const parseDayPatterns$a = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
const matchDayPeriodPatterns$a = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
};
const parseDayPeriodPatterns$a = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^полн/i,
    noon: /^полд/i,
    morning: /^у/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
const match$a = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$a,
    parsePattern: parseOrdinalNumberPattern$a,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$a,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$a,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$a,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$a,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$a,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$a,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$a,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$a,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$a,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$a,
    defaultParseWidth: "any"
  })
};
const ru = {
  code: "ru",
  formatDistance: formatDistance$a,
  formatLong: formatLong$a,
  formatRelative: formatRelative$a,
  localize: localize$a,
  match: match$a,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
function declensionGroup(scheme, count) {
  if (count === 1 && scheme.one) {
    return scheme.one;
  }
  if (count >= 2 && count <= 4 && scheme.twoFour) {
    return scheme.twoFour;
  }
  return scheme.other;
}
function declension$1(scheme, count, time) {
  const group = declensionGroup(scheme, count);
  const finalText = group[time];
  return finalText.replace("{{count}}", String(count));
}
function extractPreposition(token) {
  const result = ["lessThan", "about", "over", "almost"].filter(
    function(preposition) {
      return !!token.match(new RegExp("^" + preposition));
    }
  );
  return result[0];
}
function prefixPreposition(preposition) {
  let translation = "";
  if (preposition === "almost") {
    translation = "takmer";
  }
  if (preposition === "about") {
    translation = "približne";
  }
  return translation.length > 0 ? translation + " " : "";
}
function suffixPreposition(preposition) {
  let translation = "";
  if (preposition === "lessThan") {
    translation = "menej než";
  }
  if (preposition === "over") {
    translation = "viac než";
  }
  return translation.length > 0 ? translation + " " : "";
}
function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
const formatDistanceLocale$9 = {
  xSeconds: {
    one: {
      present: "sekunda",
      past: "sekundou",
      future: "sekundu"
    },
    twoFour: {
      present: "{{count}} sekundy",
      past: "{{count}} sekundami",
      future: "{{count}} sekundy"
    },
    other: {
      present: "{{count}} sekúnd",
      past: "{{count}} sekundami",
      future: "{{count}} sekúnd"
    }
  },
  halfAMinute: {
    other: {
      present: "pol minúty",
      past: "pol minútou",
      future: "pol minúty"
    }
  },
  xMinutes: {
    one: {
      present: "minúta",
      past: "minútou",
      future: "minútu"
    },
    twoFour: {
      present: "{{count}} minúty",
      past: "{{count}} minútami",
      future: "{{count}} minúty"
    },
    other: {
      present: "{{count}} minút",
      past: "{{count}} minútami",
      future: "{{count}} minút"
    }
  },
  xHours: {
    one: {
      present: "hodina",
      past: "hodinou",
      future: "hodinu"
    },
    twoFour: {
      present: "{{count}} hodiny",
      past: "{{count}} hodinami",
      future: "{{count}} hodiny"
    },
    other: {
      present: "{{count}} hodín",
      past: "{{count}} hodinami",
      future: "{{count}} hodín"
    }
  },
  xDays: {
    one: {
      present: "deň",
      past: "dňom",
      future: "deň"
    },
    twoFour: {
      present: "{{count}} dni",
      past: "{{count}} dňami",
      future: "{{count}} dni"
    },
    other: {
      present: "{{count}} dní",
      past: "{{count}} dňami",
      future: "{{count}} dní"
    }
  },
  xWeeks: {
    one: {
      present: "týždeň",
      past: "týždňom",
      future: "týždeň"
    },
    twoFour: {
      present: "{{count}} týždne",
      past: "{{count}} týždňami",
      future: "{{count}} týždne"
    },
    other: {
      present: "{{count}} týždňov",
      past: "{{count}} týždňami",
      future: "{{count}} týždňov"
    }
  },
  xMonths: {
    one: {
      present: "mesiac",
      past: "mesiacom",
      future: "mesiac"
    },
    twoFour: {
      present: "{{count}} mesiace",
      past: "{{count}} mesiacmi",
      future: "{{count}} mesiace"
    },
    other: {
      present: "{{count}} mesiacov",
      past: "{{count}} mesiacmi",
      future: "{{count}} mesiacov"
    }
  },
  xYears: {
    one: {
      present: "rok",
      past: "rokom",
      future: "rok"
    },
    twoFour: {
      present: "{{count}} roky",
      past: "{{count}} rokmi",
      future: "{{count}} roky"
    },
    other: {
      present: "{{count}} rokov",
      past: "{{count}} rokmi",
      future: "{{count}} rokov"
    }
  }
};
const formatDistance$9 = (token, count, options) => {
  const preposition = extractPreposition(token) || "";
  const key = lowercaseFirstLetter(token.substring(preposition.length));
  const scheme = formatDistanceLocale$9[key];
  if (!options?.addSuffix) {
    return prefixPreposition(preposition) + suffixPreposition(preposition) + declension$1(scheme, count, "present");
  }
  if (options.comparison && options.comparison > 0) {
    return prefixPreposition(preposition) + "o " + suffixPreposition(preposition) + declension$1(scheme, count, "future");
  } else {
    return prefixPreposition(preposition) + "pred " + suffixPreposition(preposition) + declension$1(scheme, count, "past");
  }
};
const dateFormats$9 = {
  full: "EEEE d. MMMM y",
  long: "d. MMMM y",
  medium: "d. M. y",
  short: "d. M. y"
};
const timeFormats$9 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$9 = {
  full: "{{date}}, {{time}}",
  long: "{{date}}, {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$9 = {
  date: buildFormatLongFn({
    formats: dateFormats$9,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$9,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$9,
    defaultWidth: "full"
  })
};
const accusativeWeekdays$1 = [
  "nedeľu",
  "pondelok",
  "utorok",
  "stredu",
  "štvrtok",
  "piatok",
  "sobotu"
];
function lastWeek$1(day) {
  const weekday = accusativeWeekdays$1[day];
  switch (day) {
    case 0:
    /* Sun */
    case 3:
    /* Wed */
    case 6:
      return "'minulú " + weekday + " o' p";
    default:
      return "'minulý' eeee 'o' p";
  }
}
function thisWeek$1(day) {
  const weekday = accusativeWeekdays$1[day];
  if (day === 4) {
    return "'vo' eeee 'o' p";
  } else {
    return "'v " + weekday + " o' p";
  }
}
function nextWeek$1(day) {
  const weekday = accusativeWeekdays$1[day];
  switch (day) {
    case 0:
    /* Sun */
    case 4:
    /* Wed */
    case 6:
      return "'budúcu " + weekday + " o' p";
    default:
      return "'budúci' eeee 'o' p";
  }
}
const formatRelativeLocale$9 = {
  lastWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$1(day);
    } else {
      return lastWeek$1(day);
    }
  },
  yesterday: "'včera o' p",
  today: "'dnes o' p",
  tomorrow: "'zajtra o' p",
  nextWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if (isSameWeek(date, baseDate, options)) {
      return thisWeek$1(day);
    } else {
      return nextWeek$1(day);
    }
  },
  other: "P"
};
const formatRelative$9 = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$9[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const eraValues$9 = {
  narrow: ["pred Kr.", "po Kr."],
  abbreviated: ["pred Kr.", "po Kr."],
  wide: ["pred Kristom", "po Kristovi"]
};
const quarterValues$9 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. štvrťrok", "2. štvrťrok", "3. štvrťrok", "4. štvrťrok"]
};
const monthValues$9 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "jan",
    "feb",
    "mar",
    "apr",
    "máj",
    "jún",
    "júl",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec"
  ],
  wide: [
    "január",
    "február",
    "marec",
    "apríl",
    "máj",
    "jún",
    "júl",
    "august",
    "september",
    "október",
    "november",
    "december"
  ]
};
const formattingMonthValues$2 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "jan",
    "feb",
    "mar",
    "apr",
    "máj",
    "jún",
    "júl",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec"
  ],
  wide: [
    "januára",
    "februára",
    "marca",
    "apríla",
    "mája",
    "júna",
    "júla",
    "augusta",
    "septembra",
    "októbra",
    "novembra",
    "decembra"
  ]
};
const dayValues$9 = {
  narrow: ["n", "p", "u", "s", "š", "p", "s"],
  short: ["ne", "po", "ut", "st", "št", "pi", "so"],
  abbreviated: ["ne", "po", "ut", "st", "št", "pi", "so"],
  wide: [
    "nedeľa",
    "pondelok",
    "utorok",
    "streda",
    "štvrtok",
    "piatok",
    "sobota"
  ]
};
const dayPeriodValues$9 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "poln.",
    noon: "pol.",
    morning: "ráno",
    afternoon: "pop.",
    evening: "več.",
    night: "noc"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "poln.",
    noon: "pol.",
    morning: "ráno",
    afternoon: "popol.",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "polnoc",
    noon: "poludnie",
    morning: "ráno",
    afternoon: "popoludnie",
    evening: "večer",
    night: "noc"
  }
};
const formattingDayPeriodValues$9 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "o poln.",
    noon: "nap.",
    morning: "ráno",
    afternoon: "pop.",
    evening: "več.",
    night: "v n."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "o poln.",
    noon: "napol.",
    morning: "ráno",
    afternoon: "popol.",
    evening: "večer",
    night: "v noci"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "o polnoci",
    noon: "napoludnie",
    morning: "ráno",
    afternoon: "popoludní",
    evening: "večer",
    night: "v noci"
  }
};
const ordinalNumber$9 = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$9 = {
  ordinalNumber: ordinalNumber$9,
  era: buildLocalizeFn({
    values: eraValues$9,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$9,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$9,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues$2,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$9,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$9,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$9,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$9 = /^(\d+)\.?/i;
const parseOrdinalNumberPattern$9 = /\d+/i;
const matchEraPatterns$9 = {
  narrow: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(pred Kristom|pred na[šs][íi]m letopo[čc]tom|po Kristovi|n[áa][šs]ho letopo[čc]tu)/i
};
const parseEraPatterns$9 = {
  any: [/^pr/i, /^(po|n)/i]
};
const matchQuarterPatterns$9 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]\. [šs]tvr[ťt]rok/i
};
const parseQuarterPatterns$9 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$9 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|m[áa]j|j[úu]n|j[úu]l|aug|sep|okt|nov|dec)/i,
  wide: /^(janu[áa]ra?|febru[áa]ra?|(marec|marca)|apr[íi]la?|m[áa]ja?|j[úu]na?|j[úu]la?|augusta?|(september|septembra)|(okt[óo]ber|okt[óo]bra)|(november|novembra)|(december|decembra))/i
};
const parseMonthPatterns$9 = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^m[áa]j/i,
    /^j[úu]n/i,
    /^j[úu]l/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$9 = {
  narrow: /^[npusšp]/i,
  short: /^(ne|po|ut|st|št|pi|so)/i,
  abbreviated: /^(ne|po|ut|st|št|pi|so)/i,
  wide: /^(nede[ľl]a|pondelok|utorok|streda|[šs]tvrtok|piatok|sobota])/i
};
const parseDayPatterns$9 = {
  narrow: [/^n/i, /^p/i, /^u/i, /^s/i, /^š/i, /^p/i, /^s/i],
  any: [/^n/i, /^po/i, /^u/i, /^st/i, /^(št|stv)/i, /^pi/i, /^so/i]
};
const matchDayPeriodPatterns$9 = {
  narrow: /^(am|pm|(o )?poln\.?|(nap\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]\.?|(v n\.?|noc))/i,
  abbreviated: /^(am|pm|(o )?poln\.?|(napol\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]er|(v )?noci?)/i,
  any: /^(am|pm|(o )?polnoci?|(na)?poludnie|r[áa]no|popoludn(ie|í|i)|ve[čc]er|(v )?noci?)/i
};
const parseDayPeriodPatterns$9 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /poln/i,
    noon: /^(nap|(na)?pol(\.|u))/i,
    morning: /^r[áa]no/i,
    afternoon: /^pop/i,
    evening: /^ve[čc]/i,
    night: /^(noc|v n\.)/i
  }
};
const match$9 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$9,
    parsePattern: parseOrdinalNumberPattern$9,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$9,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$9,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$9,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$9,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$9,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$9,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$9,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$9,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$9,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$9,
    defaultParseWidth: "any"
  })
};
const sk = {
  code: "sk",
  formatDistance: formatDistance$9,
  formatLong: formatLong$9,
  formatRelative: formatRelative$9,
  localize: localize$9,
  match: match$9,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$8 = {
  lessThanXSeconds: {
    one: "mindre än en sekund",
    other: "mindre än {{count}} sekunder"
  },
  xSeconds: {
    one: "en sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "en halv minut",
  lessThanXMinutes: {
    one: "mindre än en minut",
    other: "mindre än {{count}} minuter"
  },
  xMinutes: {
    one: "en minut",
    other: "{{count}} minuter"
  },
  aboutXHours: {
    one: "ungefär en timme",
    other: "ungefär {{count}} timmar"
  },
  xHours: {
    one: "en timme",
    other: "{{count}} timmar"
  },
  xDays: {
    one: "en dag",
    other: "{{count}} dagar"
  },
  aboutXWeeks: {
    one: "ungefär en vecka",
    other: "ungefär {{count}} veckor"
  },
  xWeeks: {
    one: "en vecka",
    other: "{{count}} veckor"
  },
  aboutXMonths: {
    one: "ungefär en månad",
    other: "ungefär {{count}} månader"
  },
  xMonths: {
    one: "en månad",
    other: "{{count}} månader"
  },
  aboutXYears: {
    one: "ungefär ett år",
    other: "ungefär {{count}} år"
  },
  xYears: {
    one: "ett år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "över ett år",
    other: "över {{count}} år"
  },
  almostXYears: {
    one: "nästan ett år",
    other: "nästan {{count}} år"
  }
};
const wordMapping = [
  "noll",
  "en",
  "två",
  "tre",
  "fyra",
  "fem",
  "sex",
  "sju",
  "åtta",
  "nio",
  "tio",
  "elva",
  "tolv"
];
const formatDistance$8 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$8[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace(
      "{{count}}",
      count < 13 ? wordMapping[count] : String(count)
    );
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " sedan";
    }
  }
  return result;
};
const dateFormats$8 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "y-MM-dd"
};
const timeFormats$8 = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$8 = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$8 = {
  date: buildFormatLongFn({
    formats: dateFormats$8,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$8,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$8,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$8 = {
  lastWeek: "'i' EEEE's kl.' p",
  yesterday: "'igår kl.' p",
  today: "'idag kl.' p",
  tomorrow: "'imorgon kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: "P"
};
const formatRelative$8 = (token, _date, _baseDate, _options) => formatRelativeLocale$8[token];
const eraValues$8 = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["före Kristus", "efter Kristus"]
};
const quarterValues$8 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1:a kvartalet", "2:a kvartalet", "3:e kvartalet", "4:e kvartalet"]
};
const monthValues$8 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan.",
    "feb.",
    "mars",
    "apr.",
    "maj",
    "juni",
    "juli",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "dec."
  ],
  wide: [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december"
  ]
};
const dayValues$8 = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sö", "må", "ti", "on", "to", "fr", "lö"],
  abbreviated: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"],
  wide: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"]
};
const dayPeriodValues$8 = {
  narrow: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "morg.",
    afternoon: "efterm.",
    evening: "kväll",
    night: "natt"
  },
  abbreviated: {
    am: "f.m.",
    pm: "e.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "morgon",
    afternoon: "efterm.",
    evening: "kväll",
    night: "natt"
  },
  wide: {
    am: "förmiddag",
    pm: "eftermiddag",
    midnight: "midnatt",
    noon: "middag",
    morning: "morgon",
    afternoon: "eftermiddag",
    evening: "kväll",
    night: "natt"
  }
};
const formattingDayPeriodValues$8 = {
  narrow: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på efterm.",
    evening: "på kvällen",
    night: "på natten"
  },
  abbreviated: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på efterm.",
    evening: "på kvällen",
    night: "på natten"
  },
  wide: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morgonen",
    afternoon: "på eftermiddagen",
    evening: "på kvällen",
    night: "på natten"
  }
};
const ordinalNumber$8 = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
      case 2:
        return number + ":a";
    }
  }
  return number + ":e";
};
const localize$8 = {
  ordinalNumber: ordinalNumber$8,
  era: buildLocalizeFn({
    values: eraValues$8,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$8,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$8,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$8,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$8,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$8,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$8 = /^(\d+)(:a|:e)?/i;
const parseOrdinalNumberPattern$8 = /\d+/i;
const matchEraPatterns$8 = {
  narrow: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  wide: /^(före Kristus|före vår tid|efter Kristus|vår tid)/i
};
const parseEraPatterns$8 = {
  any: [/^f/i, /^[ev]/i]
};
const matchQuarterPatterns$8 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](:a|:e)? kvartalet/i
};
const parseQuarterPatterns$8 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$8 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar[s]?|apr|maj|jun[i]?|jul[i]?|aug|sep|okt|nov|dec)\.?/i,
  wide: /^(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/i
};
const parseMonthPatterns$8 = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^maj/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$8 = {
  narrow: /^[smtofl]/i,
  short: /^(sö|må|ti|on|to|fr|lö)/i,
  abbreviated: /^(sön|mån|tis|ons|tors|fre|lör)/i,
  wide: /^(söndag|måndag|tisdag|onsdag|torsdag|fredag|lördag)/i
};
const parseDayPatterns$8 = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
const matchDayPeriodPatterns$8 = {
  any: /^([fe]\.?\s?m\.?|midn(att)?|midd(ag)?|(på) (morgonen|eftermiddagen|kvällen|natten))/i
};
const parseDayPeriodPatterns$8 = {
  any: {
    am: /^f/i,
    pm: /^e/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgon/i,
    afternoon: /eftermiddag/i,
    evening: /kväll/i,
    night: /natt/i
  }
};
const match$8 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$8,
    parsePattern: parseOrdinalNumberPattern$8,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$8,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$8,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$8,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$8,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$8,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$8,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$8,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$8,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$8,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$8,
    defaultParseWidth: "any"
  })
};
const sv = {
  code: "sv",
  formatDistance: formatDistance$8,
  formatLong: formatLong$8,
  formatRelative: formatRelative$8,
  localize: localize$8,
  match: match$8,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale$7 = {
  lessThanXSeconds: {
    one: "น้อยกว่า 1 วินาที",
    other: "น้อยกว่า {{count}} วินาที"
  },
  xSeconds: {
    one: "1 วินาที",
    other: "{{count}} วินาที"
  },
  halfAMinute: "ครึ่งนาที",
  lessThanXMinutes: {
    one: "น้อยกว่า 1 นาที",
    other: "น้อยกว่า {{count}} นาที"
  },
  xMinutes: {
    one: "1 นาที",
    other: "{{count}} นาที"
  },
  aboutXHours: {
    one: "ประมาณ 1 ชั่วโมง",
    other: "ประมาณ {{count}} ชั่วโมง"
  },
  xHours: {
    one: "1 ชั่วโมง",
    other: "{{count}} ชั่วโมง"
  },
  xDays: {
    one: "1 วัน",
    other: "{{count}} วัน"
  },
  aboutXWeeks: {
    one: "ประมาณ 1 สัปดาห์",
    other: "ประมาณ {{count}} สัปดาห์"
  },
  xWeeks: {
    one: "1 สัปดาห์",
    other: "{{count}} สัปดาห์"
  },
  aboutXMonths: {
    one: "ประมาณ 1 เดือน",
    other: "ประมาณ {{count}} เดือน"
  },
  xMonths: {
    one: "1 เดือน",
    other: "{{count}} เดือน"
  },
  aboutXYears: {
    one: "ประมาณ 1 ปี",
    other: "ประมาณ {{count}} ปี"
  },
  xYears: {
    one: "1 ปี",
    other: "{{count}} ปี"
  },
  overXYears: {
    one: "มากกว่า 1 ปี",
    other: "มากกว่า {{count}} ปี"
  },
  almostXYears: {
    one: "เกือบ 1 ปี",
    other: "เกือบ {{count}} ปี"
  }
};
const formatDistance$7 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$7[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      if (token === "halfAMinute") {
        return "ใน" + result;
      } else {
        return "ใน " + result;
      }
    } else {
      return result + "ที่ผ่านมา";
    }
  }
  return result;
};
const dateFormats$7 = {
  full: "วันEEEEที่ do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
const timeFormats$7 = {
  full: "H:mm:ss น. zzzz",
  long: "H:mm:ss น. z",
  medium: "H:mm:ss น.",
  short: "H:mm น."
};
const dateTimeFormats$7 = {
  full: "{{date}} 'เวลา' {{time}}",
  long: "{{date}} 'เวลา' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$7 = {
  date: buildFormatLongFn({
    formats: dateFormats$7,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$7,
    defaultWidth: "medium"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$7,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$7 = {
  lastWeek: "eeee'ที่แล้วเวลา' p",
  yesterday: "'เมื่อวานนี้เวลา' p",
  today: "'วันนี้เวลา' p",
  tomorrow: "'พรุ่งนี้เวลา' p",
  nextWeek: "eeee 'เวลา' p",
  other: "P"
};
const formatRelative$7 = (token, _date, _baseDate, _options) => formatRelativeLocale$7[token];
const eraValues$7 = {
  narrow: ["B", "คศ"],
  abbreviated: ["BC", "ค.ศ."],
  wide: ["ปีก่อนคริสตกาล", "คริสต์ศักราช"]
};
const quarterValues$7 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["ไตรมาสแรก", "ไตรมาสที่สอง", "ไตรมาสที่สาม", "ไตรมาสที่สี่"]
};
const dayValues$7 = {
  narrow: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  short: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  abbreviated: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  wide: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
};
const monthValues$7 = {
  narrow: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
  ],
  abbreviated: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
  ],
  wide: [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ]
};
const dayPeriodValues$7 = {
  narrow: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  },
  abbreviated: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  },
  wide: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  }
};
const formattingDayPeriodValues$7 = {
  narrow: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  },
  abbreviated: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  },
  wide: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  }
};
const ordinalNumber$7 = (dirtyNumber, _options) => {
  return String(dirtyNumber);
};
const localize$7 = {
  ordinalNumber: ordinalNumber$7,
  era: buildLocalizeFn({
    values: eraValues$7,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$7,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$7,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$7,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$7,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$7,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$7 = /^\d+/i;
const parseOrdinalNumberPattern$7 = /\d+/i;
const matchEraPatterns$7 = {
  narrow: /^([bB]|[aA]|คศ)/i,
  abbreviated: /^([bB]\.?\s?[cC]\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?|ค\.?ศ\.?)/i,
  wide: /^(ก่อนคริสตกาล|คริสต์ศักราช|คริสตกาล)/i
};
const parseEraPatterns$7 = {
  any: [/^[bB]/i, /^(^[aA]|ค\.?ศ\.?|คริสตกาล|คริสต์ศักราช|)/i]
};
const matchQuarterPatterns$7 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^ไตรมาส(ที่)? ?[1234]/i
};
const parseQuarterPatterns$7 = {
  any: [/(1|แรก|หนึ่ง)/i, /(2|สอง)/i, /(3|สาม)/i, /(4|สี่)/i]
};
const matchMonthPatterns$7 = {
  narrow: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?)/i,
  abbreviated: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?')/i,
  wide: /^(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/i
};
const parseMonthPatterns$7 = {
  wide: [
    /^มก/i,
    /^กุม/i,
    /^มี/i,
    /^เม/i,
    /^พฤษ/i,
    /^มิ/i,
    /^กรก/i,
    /^ส/i,
    /^กัน/i,
    /^ต/i,
    /^พฤศ/i,
    /^ธ/i
  ],
  any: [
    /^ม\.?ค\.?/i,
    /^ก\.?พ\.?/i,
    /^มี\.?ค\.?/i,
    /^เม\.?ย\.?/i,
    /^พ\.?ค\.?/i,
    /^มิ\.?ย\.?/i,
    /^ก\.?ค\.?/i,
    /^ส\.?ค\.?/i,
    /^ก\.?ย\.?/i,
    /^ต\.?ค\.?/i,
    /^พ\.?ย\.?/i,
    /^ธ\.?ค\.?/i
  ]
};
const matchDayPatterns$7 = {
  narrow: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  short: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  abbreviated: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  wide: /^(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|ศุกร์|เสาร์)/i
};
const parseDayPatterns$7 = {
  wide: [/^อา/i, /^จั/i, /^อั/i, /^พุธ/i, /^พฤ/i, /^ศ/i, /^เส/i],
  any: [/^อา/i, /^จ/i, /^อ/i, /^พ(?!ฤ)/i, /^พฤ/i, /^ศ/i, /^ส/i]
};
const matchDayPeriodPatterns$7 = {
  any: /^(ก่อนเที่ยง|หลังเที่ยง|เที่ยงคืน|เที่ยง|(ตอน.*?)?.*(เที่ยง|เช้า|บ่าย|เย็น|กลางคืน))/i
};
const parseDayPeriodPatterns$7 = {
  any: {
    am: /^ก่อนเที่ยง/i,
    pm: /^หลังเที่ยง/i,
    midnight: /^เที่ยงคืน/i,
    noon: /^เที่ยง/i,
    morning: /เช้า/i,
    afternoon: /บ่าย/i,
    evening: /เย็น/i,
    night: /กลางคืน/i
  }
};
const match$7 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$7,
    parsePattern: parseOrdinalNumberPattern$7,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$7,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$7,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$7,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$7,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$7,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$7,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$7,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$7,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$7,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$7,
    defaultParseWidth: "any"
  })
};
const th = {
  code: "th",
  formatDistance: formatDistance$7,
  formatLong: formatLong$7,
  formatRelative: formatRelative$7,
  localize: localize$7,
  match: match$7,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$6 = {
  lessThanXSeconds: {
    one: "bir saniyeden az",
    other: "{{count}} saniyeden az"
  },
  xSeconds: {
    one: "1 saniye",
    other: "{{count}} saniye"
  },
  halfAMinute: "yarım dakika",
  lessThanXMinutes: {
    one: "bir dakikadan az",
    other: "{{count}} dakikadan az"
  },
  xMinutes: {
    one: "1 dakika",
    other: "{{count}} dakika"
  },
  aboutXHours: {
    one: "yaklaşık 1 saat",
    other: "yaklaşık {{count}} saat"
  },
  xHours: {
    one: "1 saat",
    other: "{{count}} saat"
  },
  xDays: {
    one: "1 gün",
    other: "{{count}} gün"
  },
  aboutXWeeks: {
    one: "yaklaşık 1 hafta",
    other: "yaklaşık {{count}} hafta"
  },
  xWeeks: {
    one: "1 hafta",
    other: "{{count}} hafta"
  },
  aboutXMonths: {
    one: "yaklaşık 1 ay",
    other: "yaklaşık {{count}} ay"
  },
  xMonths: {
    one: "1 ay",
    other: "{{count}} ay"
  },
  aboutXYears: {
    one: "yaklaşık 1 yıl",
    other: "yaklaşık {{count}} yıl"
  },
  xYears: {
    one: "1 yıl",
    other: "{{count}} yıl"
  },
  overXYears: {
    one: "1 yıldan fazla",
    other: "{{count}} yıldan fazla"
  },
  almostXYears: {
    one: "neredeyse 1 yıl",
    other: "neredeyse {{count}} yıl"
  }
};
const formatDistance$6 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$6[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " sonra";
    } else {
      return result + " önce";
    }
  }
  return result;
};
const dateFormats$6 = {
  full: "d MMMM y EEEE",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd.MM.yyyy"
};
const timeFormats$6 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$6 = {
  full: "{{date}} 'saat' {{time}}",
  long: "{{date}} 'saat' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$6 = {
  date: buildFormatLongFn({
    formats: dateFormats$6,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$6,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$6,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$6 = {
  lastWeek: "'geçen hafta' eeee 'saat' p",
  yesterday: "'dün saat' p",
  today: "'bugün saat' p",
  tomorrow: "'yarın saat' p",
  nextWeek: "eeee 'saat' p",
  other: "P"
};
const formatRelative$6 = (token, _date, _baseDate, _options) => formatRelativeLocale$6[token];
const eraValues$6 = {
  narrow: ["MÖ", "MS"],
  abbreviated: ["MÖ", "MS"],
  wide: ["Milattan Önce", "Milattan Sonra"]
};
const quarterValues$6 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1Ç", "2Ç", "3Ç", "4Ç"],
  wide: ["İlk çeyrek", "İkinci Çeyrek", "Üçüncü çeyrek", "Son çeyrek"]
};
const monthValues$6 = {
  narrow: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
  abbreviated: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara"
  ],
  wide: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
  ]
};
const dayValues$6 = {
  narrow: ["P", "P", "S", "Ç", "P", "C", "C"],
  short: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
  abbreviated: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"],
  wide: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  ]
};
const dayPeriodValues$6 = {
  narrow: {
    am: "öö",
    pm: "ös",
    midnight: "gy",
    noon: "ö",
    morning: "sa",
    afternoon: "ös",
    evening: "ak",
    night: "ge"
  },
  abbreviated: {
    am: "ÖÖ",
    pm: "ÖS",
    midnight: "gece yarısı",
    noon: "öğle",
    morning: "sabah",
    afternoon: "öğleden sonra",
    evening: "akşam",
    night: "gece"
  },
  wide: {
    am: "Ö.Ö.",
    pm: "Ö.S.",
    midnight: "gece yarısı",
    noon: "öğle",
    morning: "sabah",
    afternoon: "öğleden sonra",
    evening: "akşam",
    night: "gece"
  }
};
const formattingDayPeriodValues$6 = {
  narrow: {
    am: "öö",
    pm: "ös",
    midnight: "gy",
    noon: "ö",
    morning: "sa",
    afternoon: "ös",
    evening: "ak",
    night: "ge"
  },
  abbreviated: {
    am: "ÖÖ",
    pm: "ÖS",
    midnight: "gece yarısı",
    noon: "öğlen",
    morning: "sabahleyin",
    afternoon: "öğleden sonra",
    evening: "akşamleyin",
    night: "geceleyin"
  },
  wide: {
    am: "ö.ö.",
    pm: "ö.s.",
    midnight: "gece yarısı",
    noon: "öğlen",
    morning: "sabahleyin",
    afternoon: "öğleden sonra",
    evening: "akşamleyin",
    night: "geceleyin"
  }
};
const ordinalNumber$6 = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  return number + ".";
};
const localize$6 = {
  ordinalNumber: ordinalNumber$6,
  era: buildLocalizeFn({
    values: eraValues$6,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$6,
    defaultWidth: "wide",
    argumentCallback: (quarter) => Number(quarter) - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$6,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$6,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$6,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$6,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$6 = /^(\d+)(\.)?/i;
const parseOrdinalNumberPattern$6 = /\d+/i;
const matchEraPatterns$6 = {
  narrow: /^(mö|ms)/i,
  abbreviated: /^(mö|ms)/i,
  wide: /^(milattan önce|milattan sonra)/i
};
const parseEraPatterns$6 = {
  any: [/(^mö|^milattan önce)/i, /(^ms|^milattan sonra)/i]
};
const matchQuarterPatterns$6 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]ç/i,
  wide: /^((i|İ)lk|(i|İ)kinci|üçüncü|son) çeyrek/i
};
const parseQuarterPatterns$6 = {
  any: [/1/i, /2/i, /3/i, /4/i],
  abbreviated: [/1ç/i, /2ç/i, /3ç/i, /4ç/i],
  wide: [
    /^(i|İ)lk çeyrek/i,
    /(i|İ)kinci çeyrek/i,
    /üçüncü çeyrek/i,
    /son çeyrek/i
  ]
};
const matchMonthPatterns$6 = {
  narrow: /^[oşmnhtaek]/i,
  abbreviated: /^(oca|şub|mar|nis|may|haz|tem|ağu|eyl|eki|kas|ara)/i,
  wide: /^(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i
};
const parseMonthPatterns$6 = {
  narrow: [
    /^o/i,
    /^ş/i,
    /^m/i,
    /^n/i,
    /^m/i,
    /^h/i,
    /^t/i,
    /^a/i,
    /^e/i,
    /^e/i,
    /^k/i,
    /^a/i
  ],
  any: [
    /^o/i,
    /^ş/i,
    /^mar/i,
    /^n/i,
    /^may/i,
    /^h/i,
    /^t/i,
    /^ağ/i,
    /^ey/i,
    /^ek/i,
    /^k/i,
    /^ar/i
  ]
};
const matchDayPatterns$6 = {
  narrow: /^[psçc]/i,
  short: /^(pz|pt|sa|ça|pe|cu|ct)/i,
  abbreviated: /^(paz|pzt|sal|çar|per|cum|cts)/i,
  wide: /^(pazar(?!tesi)|pazartesi|salı|çarşamba|perşembe|cuma(?!rtesi)|cumartesi)/i
};
const parseDayPatterns$6 = {
  narrow: [/^p/i, /^p/i, /^s/i, /^ç/i, /^p/i, /^c/i, /^c/i],
  any: [/^pz/i, /^pt/i, /^sa/i, /^ça/i, /^pe/i, /^cu/i, /^ct/i],
  wide: [
    /^pazar(?!tesi)/i,
    /^pazartesi/i,
    /^salı/i,
    /^çarşamba/i,
    /^perşembe/i,
    /^cuma(?!rtesi)/i,
    /^cumartesi/i
  ]
};
const matchDayPeriodPatterns$6 = {
  narrow: /^(öö|ös|gy|ö|sa|ös|ak|ge)/i,
  any: /^(ö\.?\s?[ös]\.?|öğleden sonra|gece yarısı|öğle|(sabah|öğ|akşam|gece)(leyin))/i
};
const parseDayPeriodPatterns$6 = {
  any: {
    am: /^ö\.?ö\.?/i,
    pm: /^ö\.?s\.?/i,
    midnight: /^(gy|gece yarısı)/i,
    noon: /^öğ/i,
    morning: /^sa/i,
    afternoon: /^öğleden sonra/i,
    evening: /^ak/i,
    night: /^ge/i
  }
};
const match$6 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$6,
    parsePattern: parseOrdinalNumberPattern$6,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$6,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$6,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$6,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$6,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$6,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$6,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$6,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$6,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$6,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$6,
    defaultParseWidth: "any"
  })
};
const tr = {
  code: "tr",
  formatDistance: formatDistance$6,
  formatLong: formatLong$6,
  formatRelative: formatRelative$6,
  localize: localize$6,
  match: match$6,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$5 = {
  lessThanXSeconds: {
    one: "بىر سىكۇنت ئىچىدە",
    other: "سىكۇنت ئىچىدە {{count}}"
  },
  xSeconds: {
    one: "بىر سىكۇنت",
    other: "سىكۇنت {{count}}"
  },
  halfAMinute: "يىرىم مىنۇت",
  lessThanXMinutes: {
    one: "بىر مىنۇت ئىچىدە",
    other: "مىنۇت ئىچىدە {{count}}"
  },
  xMinutes: {
    one: "بىر مىنۇت",
    other: "مىنۇت {{count}}"
  },
  aboutXHours: {
    one: "تەخمىنەن بىر سائەت",
    other: "سائەت {{count}} تەخمىنەن"
  },
  xHours: {
    one: "بىر سائەت",
    other: "سائەت {{count}}"
  },
  xDays: {
    one: "بىر كۈن",
    other: "كۈن {{count}}"
  },
  aboutXWeeks: {
    one: "تەخمىنەن بىرھەپتە",
    other: "ھەپتە {{count}} تەخمىنەن"
  },
  xWeeks: {
    one: "بىرھەپتە",
    other: "ھەپتە {{count}}"
  },
  aboutXMonths: {
    one: "تەخمىنەن بىر ئاي",
    other: "ئاي {{count}} تەخمىنەن"
  },
  xMonths: {
    one: "بىر ئاي",
    other: "ئاي {{count}}"
  },
  aboutXYears: {
    one: "تەخمىنەن بىر يىل",
    other: "يىل {{count}} تەخمىنەن"
  },
  xYears: {
    one: "بىر يىل",
    other: "يىل {{count}}"
  },
  overXYears: {
    one: "بىر يىلدىن ئارتۇق",
    other: "يىلدىن ئارتۇق {{count}}"
  },
  almostXYears: {
    one: "ئاساسەن بىر يىل",
    other: "يىل {{count}} ئاساسەن"
  }
};
const formatDistance$5 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$5[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result;
    } else {
      return result + " بولدى";
    }
  }
  return result;
};
const dateFormats$5 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats$5 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$5 = {
  full: "{{date}} 'دە' {{time}}",
  long: "{{date}} 'دە' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$5 = {
  date: buildFormatLongFn({
    formats: dateFormats$5,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$5,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$5,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$5 = {
  lastWeek: "'ئ‍ۆتكەن' eeee 'دە' p",
  yesterday: "'تۈنۈگۈن دە' p",
  today: "'بۈگۈن دە' p",
  tomorrow: "'ئەتە دە' p",
  nextWeek: "eeee 'دە' p",
  other: "P"
};
const formatRelative$5 = (token, _date, _baseDate, _options) => formatRelativeLocale$5[token];
const eraValues$5 = {
  narrow: ["ب", "ك"],
  abbreviated: ["ب", "ك"],
  wide: ["مىيلادىدىن بۇرۇن", "مىيلادىدىن كىيىن"]
};
const quarterValues$5 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1", "2", "3", "4"],
  wide: ["بىرىنجى چارەك", "ئىككىنجى چارەك", "ئۈچىنجى چارەك", "تۆتىنجى چارەك"]
};
const monthValues$5 = {
  narrow: ["ي", "ف", "م", "ا", "م", "ى", "ى", "ا", "س", "ۆ", "ن", "د"],
  abbreviated: [
    "يانۋار",
    "فېۋىرال",
    "مارت",
    "ئاپرىل",
    "ماي",
    "ئىيۇن",
    "ئىيول",
    "ئاۋغۇست",
    "سىنتەبىر",
    "ئۆكتەبىر",
    "نويابىر",
    "دىكابىر"
  ],
  wide: [
    "يانۋار",
    "فېۋىرال",
    "مارت",
    "ئاپرىل",
    "ماي",
    "ئىيۇن",
    "ئىيول",
    "ئاۋغۇست",
    "سىنتەبىر",
    "ئۆكتەبىر",
    "نويابىر",
    "دىكابىر"
  ]
};
const dayValues$5 = {
  narrow: ["ي", "د", "س", "چ", "پ", "ج", "ش"],
  short: ["ي", "د", "س", "چ", "پ", "ج", "ش"],
  abbreviated: [
    "يەكشەنبە",
    "دۈشەنبە",
    "سەيشەنبە",
    "چارشەنبە",
    "پەيشەنبە",
    "جۈمە",
    "شەنبە"
  ],
  wide: [
    "يەكشەنبە",
    "دۈشەنبە",
    "سەيشەنبە",
    "چارشەنبە",
    "پەيشەنبە",
    "جۈمە",
    "شەنبە"
  ]
};
const dayPeriodValues$5 = {
  narrow: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  },
  abbreviated: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  },
  wide: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  }
};
const formattingDayPeriodValues$5 = {
  narrow: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  },
  abbreviated: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  },
  wide: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  }
};
const ordinalNumber$5 = (dirtyNumber, _options) => {
  return String(dirtyNumber);
};
const localize$5 = {
  ordinalNumber: ordinalNumber$5,
  era: buildLocalizeFn({
    values: eraValues$5,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$5,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$5,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$5,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$5,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$5,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$5 = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$5 = /\d+/i;
const matchEraPatterns$5 = {
  narrow: /^(ب|ك)/i,
  wide: /^(مىيلادىدىن بۇرۇن|مىيلادىدىن كىيىن)/i
};
const parseEraPatterns$5 = {
  any: [/^بۇرۇن/i, /^كىيىن/i]
};
const matchQuarterPatterns$5 = {
  narrow: /^[1234]/i,
  abbreviated: /^چ[1234]/i,
  wide: /^چارەك [1234]/i
};
const parseQuarterPatterns$5 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$5 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[يفمئامئ‍ئاسۆند]/i,
  abbreviated: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i,
  wide: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i
};
const parseMonthPatterns$5 = {
  narrow: [
    /^ي/i,
    /^ف/i,
    /^م/i,
    /^ا/i,
    /^م/i,
    /^ى‍/i,
    /^ى‍/i,
    /^ا‍/i,
    /^س/i,
    /^ۆ/i,
    /^ن/i,
    /^د/i
  ],
  any: [
    /^يان/i,
    /^فېۋ/i,
    /^مار/i,
    /^ئاپ/i,
    /^ماي/i,
    /^ئىيۇن/i,
    /^ئىيول/i,
    /^ئاۋ/i,
    /^سىن/i,
    /^ئۆك/i,
    /^نوي/i,
    /^دىك/i
  ]
};
const matchDayPatterns$5 = {
  narrow: /^[دسچپجشي]/i,
  short: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  abbreviated: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  wide: /^(يەكشەنبە|دۈشەنبە|سەيشەنبە|چارشەنبە|پەيشەنبە|جۈمە|شەنبە)/i
};
const parseDayPatterns$5 = {
  narrow: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i]
};
const matchDayPeriodPatterns$5 = {
  narrow: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i,
  any: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i
};
const parseDayPeriodPatterns$5 = {
  any: {
    am: /^ئە/i,
    pm: /^چ/i,
    midnight: /^ك/i,
    noon: /^چ/i,
    morning: /ئەتىگەن/i,
    afternoon: /چۈشتىن كىيىن/i,
    evening: /ئاخشىم/i,
    night: /كىچە/i
  }
};
const match$5 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$5,
    parsePattern: parseOrdinalNumberPattern$5,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$5,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$5,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$5,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$5,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$5,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$5,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$5,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$5,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$5,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$5,
    defaultParseWidth: "any"
  })
};
const ug = {
  code: "ug",
  formatDistance: formatDistance$5,
  formatLong: formatLong$5,
  formatRelative: formatRelative$5,
  localize: localize$5,
  match: match$5,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function declension(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  const rem10 = count % 10;
  const rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn(scheme) {
  return (count, options) => {
    if (options && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension(scheme.future, count);
        } else {
          return "за " + declension(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension(scheme.past, count);
        } else {
          return declension(scheme.regular, count) + " тому";
        }
      }
    } else {
      return declension(scheme.regular, count);
    }
  };
}
const halfAtMinute = (_, options) => {
  if (options && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "за півхвилини";
    } else {
      return "півхвилини тому";
    }
  }
  return "півхвилини";
};
const formatDistanceLocale$4 = {
  lessThanXSeconds: buildLocalizeTokenFn({
    regular: {
      one: "менше секунди",
      singularNominative: "менше {{count}} секунди",
      singularGenitive: "менше {{count}} секунд",
      pluralGenitive: "менше {{count}} секунд"
    },
    future: {
      one: "менше, ніж за секунду",
      singularNominative: "менше, ніж за {{count}} секунду",
      singularGenitive: "менше, ніж за {{count}} секунди",
      pluralGenitive: "менше, ніж за {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунди",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду тому",
      singularGenitive: "{{count}} секунди тому",
      pluralGenitive: "{{count}} секунд тому"
    },
    future: {
      singularNominative: "за {{count}} секунду",
      singularGenitive: "за {{count}} секунди",
      pluralGenitive: "за {{count}} секунд"
    }
  }),
  halfAMinute: halfAtMinute,
  lessThanXMinutes: buildLocalizeTokenFn({
    regular: {
      one: "менше хвилини",
      singularNominative: "менше {{count}} хвилини",
      singularGenitive: "менше {{count}} хвилин",
      pluralGenitive: "менше {{count}} хвилин"
    },
    future: {
      one: "менше, ніж за хвилину",
      singularNominative: "менше, ніж за {{count}} хвилину",
      singularGenitive: "менше, ніж за {{count}} хвилини",
      pluralGenitive: "менше, ніж за {{count}} хвилин"
    }
  }),
  xMinutes: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} хвилина",
      singularGenitive: "{{count}} хвилини",
      pluralGenitive: "{{count}} хвилин"
    },
    past: {
      singularNominative: "{{count}} хвилину тому",
      singularGenitive: "{{count}} хвилини тому",
      pluralGenitive: "{{count}} хвилин тому"
    },
    future: {
      singularNominative: "за {{count}} хвилину",
      singularGenitive: "за {{count}} хвилини",
      pluralGenitive: "за {{count}} хвилин"
    }
  }),
  aboutXHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "близько {{count}} години",
      singularGenitive: "близько {{count}} годин",
      pluralGenitive: "близько {{count}} годин"
    },
    future: {
      singularNominative: "приблизно за {{count}} годину",
      singularGenitive: "приблизно за {{count}} години",
      pluralGenitive: "приблизно за {{count}} годин"
    }
  }),
  xHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} годину",
      singularGenitive: "{{count}} години",
      pluralGenitive: "{{count}} годин"
    }
  }),
  xDays: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} днi",
      pluralGenitive: "{{count}} днів"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "близько {{count}} тижня",
      singularGenitive: "близько {{count}} тижнів",
      pluralGenitive: "близько {{count}} тижнів"
    },
    future: {
      singularNominative: "приблизно за {{count}} тиждень",
      singularGenitive: "приблизно за {{count}} тижні",
      pluralGenitive: "приблизно за {{count}} тижнів"
    }
  }),
  xWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} тиждень",
      singularGenitive: "{{count}} тижні",
      pluralGenitive: "{{count}} тижнів"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "близько {{count}} місяця",
      singularGenitive: "близько {{count}} місяців",
      pluralGenitive: "близько {{count}} місяців"
    },
    future: {
      singularNominative: "приблизно за {{count}} місяць",
      singularGenitive: "приблизно за {{count}} місяці",
      pluralGenitive: "приблизно за {{count}} місяців"
    }
  }),
  xMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} місяць",
      singularGenitive: "{{count}} місяці",
      pluralGenitive: "{{count}} місяців"
    }
  }),
  aboutXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "близько {{count}} року",
      singularGenitive: "близько {{count}} років",
      pluralGenitive: "близько {{count}} років"
    },
    future: {
      singularNominative: "приблизно за {{count}} рік",
      singularGenitive: "приблизно за {{count}} роки",
      pluralGenitive: "приблизно за {{count}} років"
    }
  }),
  xYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} рік",
      singularGenitive: "{{count}} роки",
      pluralGenitive: "{{count}} років"
    }
  }),
  overXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "більше {{count}} року",
      singularGenitive: "більше {{count}} років",
      pluralGenitive: "більше {{count}} років"
    },
    future: {
      singularNominative: "більше, ніж за {{count}} рік",
      singularGenitive: "більше, ніж за {{count}} роки",
      pluralGenitive: "більше, ніж за {{count}} років"
    }
  }),
  almostXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "майже {{count}} рік",
      singularGenitive: "майже {{count}} роки",
      pluralGenitive: "майже {{count}} років"
    },
    future: {
      singularNominative: "майже за {{count}} рік",
      singularGenitive: "майже за {{count}} роки",
      pluralGenitive: "майже за {{count}} років"
    }
  })
};
const formatDistance$4 = (token, count, options) => {
  options = options || {};
  return formatDistanceLocale$4[token](count, options);
};
const dateFormats$4 = {
  full: "EEEE, do MMMM y 'р.'",
  long: "do MMMM y 'р.'",
  medium: "d MMM y 'р.'",
  short: "dd.MM.y"
};
const timeFormats$4 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
const dateTimeFormats$4 = {
  full: "{{date}} 'о' {{time}}",
  long: "{{date}} 'о' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$4 = {
  date: buildFormatLongFn({
    formats: dateFormats$4,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$4,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$4,
    defaultWidth: "full"
  })
};
const accusativeWeekdays = [
  "неділю",
  "понеділок",
  "вівторок",
  "середу",
  "четвер",
  "п’ятницю",
  "суботу"
];
function lastWeek(day) {
  const weekday = accusativeWeekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у минулу " + weekday + " о' p";
    case 1:
    case 2:
    case 4:
      return "'у минулий " + weekday + " о' p";
  }
}
function thisWeek(day) {
  const weekday = accusativeWeekdays[day];
  return "'у " + weekday + " о' p";
}
function nextWeek(day) {
  const weekday = accusativeWeekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступну " + weekday + " о' p";
    case 1:
    case 2:
    case 4:
      return "'у наступний " + weekday + " о' p";
  }
}
const lastWeekFormat = (dirtyDate, baseDate, options) => {
  const date = toDate(dirtyDate);
  const day = date.getDay();
  if (isSameWeek(date, baseDate, options)) {
    return thisWeek(day);
  } else {
    return lastWeek(day);
  }
};
const nextWeekFormat = (dirtyDate, baseDate, options) => {
  const date = toDate(dirtyDate);
  const day = date.getDay();
  if (isSameWeek(date, baseDate, options)) {
    return thisWeek(day);
  } else {
    return nextWeek(day);
  }
};
const formatRelativeLocale$4 = {
  lastWeek: lastWeekFormat,
  yesterday: "'вчора о' p",
  today: "'сьогодні о' p",
  tomorrow: "'завтра о' p",
  nextWeek: nextWeekFormat,
  other: "P"
};
const formatRelative$4 = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$4[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const eraValues$4 = {
  narrow: ["до н.е.", "н.е."],
  abbreviated: ["до н. е.", "н. е."],
  wide: ["до нашої ери", "нашої ери"]
};
const quarterValues$4 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"]
};
const monthValues$4 = {
  // ДСТУ 3582:2013
  narrow: ["С", "Л", "Б", "К", "Т", "Ч", "Л", "С", "В", "Ж", "Л", "Г"],
  abbreviated: [
    "січ.",
    "лют.",
    "берез.",
    "квіт.",
    "трав.",
    "черв.",
    "лип.",
    "серп.",
    "верес.",
    "жовт.",
    "листоп.",
    "груд."
  ],
  wide: [
    "січень",
    "лютий",
    "березень",
    "квітень",
    "травень",
    "червень",
    "липень",
    "серпень",
    "вересень",
    "жовтень",
    "листопад",
    "грудень"
  ]
};
const formattingMonthValues$1 = {
  narrow: ["С", "Л", "Б", "К", "Т", "Ч", "Л", "С", "В", "Ж", "Л", "Г"],
  abbreviated: [
    "січ.",
    "лют.",
    "берез.",
    "квіт.",
    "трав.",
    "черв.",
    "лип.",
    "серп.",
    "верес.",
    "жовт.",
    "листоп.",
    "груд."
  ],
  wide: [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня"
  ]
};
const dayValues$4 = {
  narrow: ["Н", "П", "В", "С", "Ч", "П", "С"],
  short: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["нед", "пон", "вів", "сер", "чтв", "птн", "суб"],
  wide: [
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п’ятниця",
    "субота"
  ]
};
const dayPeriodValues$4 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранок",
    afternoon: "день",
    evening: "веч.",
    night: "ніч"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранок",
    afternoon: "день",
    evening: "веч.",
    night: "ніч"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "північ",
    noon: "полудень",
    morning: "ранок",
    afternoon: "день",
    evening: "вечір",
    night: "ніч"
  }
};
const formattingDayPeriodValues$4 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "північ",
    noon: "полудень",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  }
};
const ordinalNumber$4 = (dirtyNumber, options) => {
  const unit = String(options?.unit);
  const number = Number(dirtyNumber);
  let suffix;
  if (unit === "date") {
    if (number === 3 || number === 23) {
      suffix = "-є";
    } else {
      suffix = "-е";
    }
  } else if (unit === "minute" || unit === "second" || unit === "hour") {
    suffix = "-а";
  } else {
    suffix = "-й";
  }
  return number + suffix;
};
const localize$4 = {
  ordinalNumber: ordinalNumber$4,
  era: buildLocalizeFn({
    values: eraValues$4,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$4,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$4,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues$1,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$4,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$4,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues$4,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$4 = /^(\d+)(-?(е|й|є|а|я))?/i;
const parseOrdinalNumberPattern$4 = /\d+/i;
const matchEraPatterns$4 = {
  narrow: /^((до )?н\.?\s?е\.?)/i,
  abbreviated: /^((до )?н\.?\s?е\.?)/i,
  wide: /^(до нашої ери|нашої ери|наша ера)/i
};
const parseEraPatterns$4 = {
  any: [/^д/i, /^н/i]
};
const matchQuarterPatterns$4 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[иі]?й?)? кв.?/i,
  wide: /^[1234](-?[иі]?й?)? квартал/i
};
const parseQuarterPatterns$4 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$4 = {
  narrow: /^[слбктчвжг]/i,
  abbreviated: /^(січ|лют|бер(ез)?|квіт|трав|черв|лип|серп|вер(ес)?|жовт|лис(топ)?|груд)\.?/i,
  wide: /^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|червня|червень|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопад[а]?|грудень|грудня)/i
};
const parseMonthPatterns$4 = {
  narrow: [
    /^с/i,
    /^л/i,
    /^б/i,
    /^к/i,
    /^т/i,
    /^ч/i,
    /^л/i,
    /^с/i,
    /^в/i,
    /^ж/i,
    /^л/i,
    /^г/i
  ],
  any: [
    /^сі/i,
    /^лю/i,
    /^б/i,
    /^к/i,
    /^т/i,
    /^ч/i,
    /^лип/i,
    /^се/i,
    /^в/i,
    /^ж/i,
    /^лис/i,
    /^г/i
  ]
};
const matchDayPatterns$4 = {
  narrow: /^[нпвсч]/i,
  short: /^(нд|пн|вт|ср|чт|пт|сб)\.?/i,
  abbreviated: /^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,
  wide: /^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i
};
const parseDayPatterns$4 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[он]/i, /^в/i, /^с[ер]/i, /^ч/i, /^п\W*?[ят]/i, /^с[уб]/i]
};
const matchDayPeriodPatterns$4 = {
  narrow: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  abbreviated: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  wide: /^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i
};
const parseDayPeriodPatterns$4 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^півн/i,
    noon: /^пол/i,
    morning: /^р/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
const match$4 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$4,
    parsePattern: parseOrdinalNumberPattern$4,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$4,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$4,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$4,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$4,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$4,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$4,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$4,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$4,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$4,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$4,
    defaultParseWidth: "any"
  })
};
const uk = {
  code: "uk",
  formatDistance: formatDistance$4,
  formatLong: formatLong$4,
  formatRelative: formatRelative$4,
  localize: localize$4,
  match: match$4,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$3 = {
  lessThanXSeconds: {
    one: "sekunddan kam",
    other: "{{count}} sekunddan kam"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekund"
  },
  halfAMinute: "yarim minut",
  lessThanXMinutes: {
    one: "bir minutdan kam",
    other: "{{count}} minutdan kam"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minut"
  },
  aboutXHours: {
    one: "tahminan 1 soat",
    other: "tahminan {{count}} soat"
  },
  xHours: {
    one: "1 soat",
    other: "{{count}} soat"
  },
  xDays: {
    one: "1 kun",
    other: "{{count}} kun"
  },
  aboutXWeeks: {
    one: "tahminan 1 hafta",
    other: "tahminan {{count}} hafta"
  },
  xWeeks: {
    one: "1 hafta",
    other: "{{count}} hafta"
  },
  aboutXMonths: {
    one: "tahminan 1 oy",
    other: "tahminan {{count}} oy"
  },
  xMonths: {
    one: "1 oy",
    other: "{{count}} oy"
  },
  aboutXYears: {
    one: "tahminan 1 yil",
    other: "tahminan {{count}} yil"
  },
  xYears: {
    one: "1 yil",
    other: "{{count}} yil"
  },
  overXYears: {
    one: "1 yildan ko'p",
    other: "{{count}} yildan ko'p"
  },
  almostXYears: {
    one: "deyarli 1 yil",
    other: "deyarli {{count}} yil"
  }
};
const formatDistance$3 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$3[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " dan keyin";
    } else {
      return result + " oldin";
    }
  }
  return result;
};
const dateFormats$3 = {
  full: "EEEE, do MMMM, y",
  long: "do MMMM, y",
  medium: "d MMM, y",
  short: "dd/MM/yyyy"
};
const timeFormats$3 = {
  full: "h:mm:ss zzzz",
  long: "h:mm:ss z",
  medium: "h:mm:ss",
  short: "h:mm"
};
const dateTimeFormats$3 = {
  any: "{{date}}, {{time}}"
};
const formatLong$3 = {
  date: buildFormatLongFn({
    formats: dateFormats$3,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$3,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$3,
    defaultWidth: "any"
  })
};
const formatRelativeLocale$3 = {
  lastWeek: "'oldingi' eeee p 'da'",
  yesterday: "'kecha' p 'da'",
  today: "'bugun' p 'da'",
  tomorrow: "'ertaga' p 'da'",
  nextWeek: "eeee p 'da'",
  other: "P"
};
const formatRelative$3 = (token, _date, _baseDate, _options) => formatRelativeLocale$3[token];
const eraValues$3 = {
  narrow: ["M.A", "M."],
  abbreviated: ["M.A", "M."],
  wide: ["Miloddan Avvalgi", "Milodiy"]
};
const quarterValues$3 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["CH.1", "CH.2", "CH.3", "CH.4"],
  wide: ["1-chi chorak", "2-chi chorak", "3-chi chorak", "4-chi chorak"]
};
const monthValues$3 = {
  narrow: ["Y", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Yan",
    "Fev",
    "Mar",
    "Apr",
    "May",
    "Iyun",
    "Iyul",
    "Avg",
    "Sen",
    "Okt",
    "Noy",
    "Dek"
  ],
  wide: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr"
  ]
};
const dayValues$3 = {
  narrow: ["Y", "D", "S", "CH", "P", "J", "SH"],
  short: ["Ya", "Du", "Se", "Cho", "Pa", "Ju", "Sha"],
  abbreviated: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
  wide: [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba"
  ]
};
const dayPeriodValues$3 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "y.t",
    noon: "p.",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  }
};
const formattingDayPeriodValues$3 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "y.t",
    noon: "p.",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  }
};
const ordinalNumber$3 = (dirtyNumber, _options) => {
  return String(dirtyNumber);
};
const localize$3 = {
  ordinalNumber: ordinalNumber$3,
  era: buildLocalizeFn({
    values: eraValues$3,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$3,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$3,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$3,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$3,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$3,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$3 = /^(\d+)(chi)?/i;
const parseOrdinalNumberPattern$3 = /\d+/i;
const matchEraPatterns$3 = {
  narrow: /^(m\.a|m\.)/i,
  abbreviated: /^(m\.a\.?\s?m\.?)/i,
  wide: /^(miloddan avval|miloddan keyin)/i
};
const parseEraPatterns$3 = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns$3 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](chi)? chorak/i
};
const parseQuarterPatterns$3 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$3 = {
  narrow: /^[yfmasond]/i,
  abbreviated: /^(yan|fev|mar|apr|may|iyun|iyul|avg|sen|okt|noy|dek)/i,
  wide: /^(yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)/i
};
const parseMonthPatterns$3 = {
  narrow: [
    /^y/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^i/i,
    /^i/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ya/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^iyun/i,
    /^iyul/i,
    /^av/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$3 = {
  narrow: /^[ydschj]/i,
  short: /^(ya|du|se|cho|pa|ju|sha)/i,
  abbreviated: /^(yak|dush|sesh|chor|pay|jum|shan)/i,
  wide: /^(yakshanba|dushanba|seshanba|chorshanba|payshanba|juma|shanba)/i
};
const parseDayPatterns$3 = {
  narrow: [/^y/i, /^d/i, /^s/i, /^ch/i, /^p/i, /^j/i, /^sh/i],
  any: [/^ya/i, /^d/i, /^se/i, /^ch/i, /^p/i, /^j/i, /^sh/i]
};
const matchDayPeriodPatterns$3 = {
  narrow: /^(a|p|y\.t|p| (ertalab|tushdan keyin|kechqurun|tun))/i,
  any: /^([ap]\.?\s?m\.?|yarim tun|peshin| (ertalab|tushdan keyin|kechqurun|tun))/i
};
const parseDayPeriodPatterns$3 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^y\.t/i,
    noon: /^pe/i,
    morning: /ertalab/i,
    afternoon: /tushdan keyin/i,
    evening: /kechqurun/i,
    night: /tun/i
  }
};
const match$3 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$3,
    parsePattern: parseOrdinalNumberPattern$3,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$3,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$3,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$3,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$3,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$3,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$3,
    defaultParseWidth: "any"
  })
};
const uz = {
  code: "uz",
  formatDistance: formatDistance$3,
  formatLong: formatLong$3,
  formatRelative: formatRelative$3,
  localize: localize$3,
  match: match$3,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$2 = {
  lessThanXSeconds: {
    one: "dưới 1 giây",
    other: "dưới {{count}} giây"
  },
  xSeconds: {
    one: "1 giây",
    other: "{{count}} giây"
  },
  halfAMinute: "nửa phút",
  lessThanXMinutes: {
    one: "dưới 1 phút",
    other: "dưới {{count}} phút"
  },
  xMinutes: {
    one: "1 phút",
    other: "{{count}} phút"
  },
  aboutXHours: {
    one: "khoảng 1 giờ",
    other: "khoảng {{count}} giờ"
  },
  xHours: {
    one: "1 giờ",
    other: "{{count}} giờ"
  },
  xDays: {
    one: "1 ngày",
    other: "{{count}} ngày"
  },
  aboutXWeeks: {
    one: "khoảng 1 tuần",
    other: "khoảng {{count}} tuần"
  },
  xWeeks: {
    one: "1 tuần",
    other: "{{count}} tuần"
  },
  aboutXMonths: {
    one: "khoảng 1 tháng",
    other: "khoảng {{count}} tháng"
  },
  xMonths: {
    one: "1 tháng",
    other: "{{count}} tháng"
  },
  aboutXYears: {
    one: "khoảng 1 năm",
    other: "khoảng {{count}} năm"
  },
  xYears: {
    one: "1 năm",
    other: "{{count}} năm"
  },
  overXYears: {
    one: "hơn 1 năm",
    other: "hơn {{count}} năm"
  },
  almostXYears: {
    one: "gần 1 năm",
    other: "gần {{count}} năm"
  }
};
const formatDistance$2 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$2[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " nữa";
    } else {
      return result + " trước";
    }
  }
  return result;
};
const dateFormats$2 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017
  full: "EEEE, 'ngày' d MMMM 'năm' y",
  // ngày 25 tháng 08 năm 2017
  long: "'ngày' d MMMM 'năm' y",
  // 25 thg 08 năm 2017
  medium: "d MMM 'năm' y",
  // 25/08/2017
  short: "dd/MM/y"
};
const timeFormats$2 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
const dateTimeFormats$2 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017 23:25:59
  full: "{{date}} {{time}}",
  // ngày 25 tháng 08 năm 2017 23:25
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$2 = {
  date: buildFormatLongFn({
    formats: dateFormats$2,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$2,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$2,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$2 = {
  lastWeek: "eeee 'tuần trước vào lúc' p",
  yesterday: "'hôm qua vào lúc' p",
  today: "'hôm nay vào lúc' p",
  tomorrow: "'ngày mai vào lúc' p",
  nextWeek: "eeee 'tới vào lúc' p",
  other: "P"
};
const formatRelative$2 = (token, _date, _baseDate, _options) => formatRelativeLocale$2[token];
const eraValues$2 = {
  narrow: ["TCN", "SCN"],
  abbreviated: ["trước CN", "sau CN"],
  wide: ["trước Công Nguyên", "sau Công Nguyên"]
};
const quarterValues$2 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"]
};
const formattingQuarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  // I notice many news outlet use this "quý II/2018"
  wide: ["quý I", "quý II", "quý III", "quý IV"]
};
const monthValues$2 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12"
  ],
  wide: [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai"
  ]
};
const formattingMonthValues = {
  narrow: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ],
  abbreviated: [
    "thg 1",
    "thg 2",
    "thg 3",
    "thg 4",
    "thg 5",
    "thg 6",
    "thg 7",
    "thg 8",
    "thg 9",
    "thg 10",
    "thg 11",
    "thg 12"
  ],
  wide: [
    "tháng 01",
    "tháng 02",
    "tháng 03",
    "tháng 04",
    "tháng 05",
    "tháng 06",
    "tháng 07",
    "tháng 08",
    "tháng 09",
    "tháng 10",
    "tháng 11",
    "tháng 12"
  ]
};
const dayValues$2 = {
  narrow: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  short: ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"],
  abbreviated: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  wide: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy"
  ]
};
const dayPeriodValues$2 = {
  // narrow date period is extremely rare in Vietnamese
  // I used abbreviated form for noon, morning and afternoon
  // which are regconizable by Vietnamese, others cannot be any shorter
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "nửa đêm",
    noon: "tr",
    morning: "sg",
    afternoon: "ch",
    evening: "tối",
    night: "đêm"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  },
  wide: {
    am: "SA",
    pm: "CH",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  }
};
const formattingDayPeriodValues$2 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "nửa đêm",
    noon: "tr",
    morning: "sg",
    afternoon: "ch",
    evening: "tối",
    night: "đêm"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  },
  wide: {
    am: "SA",
    pm: "CH",
    midnight: "nửa đêm",
    noon: "giữa trưa",
    morning: "vào buổi sáng",
    afternoon: "vào buổi chiều",
    evening: "vào buổi tối",
    night: "vào ban đêm"
  }
};
const ordinalNumber$2 = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = options?.unit;
  if (unit === "quarter") {
    switch (number) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
    }
  } else if (unit === "day") {
    switch (number) {
      case 1:
        return "thứ 2";
      // meaning 2nd day but it's the first day of the week :D
      case 2:
        return "thứ 3";
      // meaning 3rd day
      case 3:
        return "thứ 4";
      // meaning 4th day and so on
      case 4:
        return "thứ 5";
      case 5:
        return "thứ 6";
      case 6:
        return "thứ 7";
      case 7:
        return "chủ nhật";
    }
  } else if (unit === "week") {
    if (number === 1) {
      return "thứ nhất";
    } else {
      return "thứ " + number;
    }
  } else if (unit === "dayOfYear") {
    if (number === 1) {
      return "đầu tiên";
    } else {
      return "thứ " + number;
    }
  }
  return String(number);
};
const localize$2 = {
  ordinalNumber: ordinalNumber$2,
  era: buildLocalizeFn({
    values: eraValues$2,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$2,
    defaultWidth: "wide",
    formattingValues: formattingQuarterValues,
    defaultFormattingWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$2,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$2,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$2,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$2,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$2 = /^(\d+)/i;
const parseOrdinalNumberPattern$2 = /\d+/i;
const matchEraPatterns$2 = {
  narrow: /^(tcn|scn)/i,
  abbreviated: /^(trước CN|sau CN)/i,
  wide: /^(trước Công Nguyên|sau Công Nguyên)/i
};
const parseEraPatterns$2 = {
  any: [/^t/i, /^s/i]
};
const matchQuarterPatterns$2 = {
  narrow: /^([1234]|i{1,3}v?)/i,
  abbreviated: /^q([1234]|i{1,3}v?)/i,
  wide: /^quý ([1234]|i{1,3}v?)/i
};
const parseQuarterPatterns$2 = {
  any: [/(1|i)$/i, /(2|ii)$/i, /(3|iii)$/i, /(4|iv)$/i]
};
const matchMonthPatterns$2 = {
  // month number may contain leading 0, 'thg' prefix may have space, underscore or empty before number
  // note the order of '1' since it is a sub-string of '10', so must be lower priority
  narrow: /^(0?[2-9]|10|11|12|0?1)/i,
  // note the order of 'thg 1' since it is sub-string of 'thg 10', so must be lower priority
  abbreviated: /^thg[ _]?(0?[1-9](?!\d)|10|11|12)/i,
  // note the order of 'Mười' since it is sub-string of Mười Một, so must be lower priority
  wide: /^tháng ?(Một|Hai|Ba|Tư|Năm|Sáu|Bảy|Tám|Chín|Mười|Mười ?Một|Mười ?Hai|0?[1-9](?!\d)|10|11|12)/i
};
const parseMonthPatterns$2 = {
  narrow: [
    /0?1$/i,
    /0?2/i,
    /3/,
    /4/,
    /5/,
    /6/,
    /7/,
    /8/,
    /9/,
    /10/,
    /11/,
    /12/
  ],
  abbreviated: [
    /^thg[ _]?0?1(?!\d)/i,
    /^thg[ _]?0?2/i,
    /^thg[ _]?0?3/i,
    /^thg[ _]?0?4/i,
    /^thg[ _]?0?5/i,
    /^thg[ _]?0?6/i,
    /^thg[ _]?0?7/i,
    /^thg[ _]?0?8/i,
    /^thg[ _]?0?9/i,
    /^thg[ _]?10/i,
    /^thg[ _]?11/i,
    /^thg[ _]?12/i
  ],
  wide: [
    /^tháng ?(Một|0?1(?!\d))/i,
    /^tháng ?(Hai|0?2)/i,
    /^tháng ?(Ba|0?3)/i,
    /^tháng ?(Tư|0?4)/i,
    /^tháng ?(Năm|0?5)/i,
    /^tháng ?(Sáu|0?6)/i,
    /^tháng ?(Bảy|0?7)/i,
    /^tháng ?(Tám|0?8)/i,
    /^tháng ?(Chín|0?9)/i,
    /^tháng ?(Mười|10)/i,
    /^tháng ?(Mười ?Một|11)/i,
    /^tháng ?(Mười ?Hai|12)/i
  ]
};
const matchDayPatterns$2 = {
  narrow: /^(CN|T2|T3|T4|T5|T6|T7)/i,
  short: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  abbreviated: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  wide: /^(Chủ ?Nhật|Chúa ?Nhật|thứ ?Hai|thứ ?Ba|thứ ?Tư|thứ ?Năm|thứ ?Sáu|thứ ?Bảy)/i
};
const parseDayPatterns$2 = {
  narrow: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  short: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  abbreviated: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  wide: [/(Chủ|Chúa) ?Nhật/i, /Hai/i, /Ba/i, /Tư/i, /Năm/i, /Sáu/i, /Bảy/i]
};
const matchDayPeriodPatterns$2 = {
  narrow: /^(a|p|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  abbreviated: /^(am|pm|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  wide: /^(ch[^i]*|sa|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i
};
const parseDayPeriodPatterns$2 = {
  any: {
    am: /^(a|sa)/i,
    pm: /^(p|ch[^i]*)/i,
    midnight: /nửa đêm/i,
    noon: /trưa/i,
    morning: /sáng/i,
    afternoon: /chiều/i,
    evening: /tối/i,
    night: /^đêm/i
  }
};
const match$2 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$2,
    parsePattern: parseOrdinalNumberPattern$2,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$2,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$2,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$2,
    defaultParseWidth: "wide"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$2,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns$2,
    defaultParseWidth: "any"
  })
};
const vi = {
  code: "vi",
  formatDistance: formatDistance$2,
  formatLong: formatLong$2,
  formatRelative: formatRelative$2,
  localize: localize$2,
  match: match$2,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const formatDistanceLocale$1 = {
  lessThanXSeconds: {
    one: "不到 1 秒",
    other: "不到 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分钟",
  lessThanXMinutes: {
    one: "不到 1 分钟",
    other: "不到 {{count}} 分钟"
  },
  xMinutes: {
    one: "1 分钟",
    other: "{{count}} 分钟"
  },
  xHours: {
    one: "1 小时",
    other: "{{count}} 小时"
  },
  aboutXHours: {
    one: "大约 1 小时",
    other: "大约 {{count}} 小时"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大约 1 个星期",
    other: "大约 {{count}} 个星期"
  },
  xWeeks: {
    one: "1 个星期",
    other: "{{count}} 个星期"
  },
  aboutXMonths: {
    one: "大约 1 个月",
    other: "大约 {{count}} 个月"
  },
  xMonths: {
    one: "1 个月",
    other: "{{count}} 个月"
  },
  aboutXYears: {
    one: "大约 1 年",
    other: "大约 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超过 1 年",
    other: "超过 {{count}} 年"
  },
  almostXYears: {
    one: "将近 1 年",
    other: "将近 {{count}} 年"
  }
};
const formatDistance$1 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$1[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "内";
    } else {
      return result + "前";
    }
  }
  return result;
};
const dateFormats$1 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
const timeFormats$1 = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
const dateTimeFormats$1 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong$1 = {
  date: buildFormatLongFn({
    formats: dateFormats$1,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1,
    defaultWidth: "full"
  })
};
function checkWeek(date, baseDate, options) {
  const baseFormat = "eeee p";
  if (isSameWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'下个'" + baseFormat;
  }
  return "'上个'" + baseFormat;
}
const formatRelativeLocale$1 = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: "PP p"
};
const formatRelative$1 = (token, date, baseDate, options) => {
  const format = formatRelativeLocale$1[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const eraValues$1 = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
const quarterValues$1 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
const monthValues$1 = {
  narrow: [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二"
  ],
  abbreviated: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  wide: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ]
};
const dayValues$1 = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
const dayPeriodValues$1 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
const formattingDayPeriodValues$1 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
const ordinalNumber$1 = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  switch (options?.unit) {
    case "date":
      return number.toString() + "日";
    case "hour":
      return number.toString() + "时";
    case "minute":
      return number.toString() + "分";
    case "second":
      return number.toString() + "秒";
    default:
      return "第 " + number.toString();
  }
};
const localize$1 = {
  ordinalNumber: ordinalNumber$1,
  era: buildLocalizeFn({
    values: eraValues$1,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$1,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$1,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$1,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern$1 = /^(第\s*)?\d+(日|时|分|秒)?/i;
const parseOrdinalNumberPattern$1 = /\d+/i;
const matchEraPatterns$1 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
const parseEraPatterns$1 = {
  any: [/^(前)/i, /^(公元)/i]
};
const matchQuarterPatterns$1 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
const parseQuarterPatterns$1 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
const matchMonthPatterns$1 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
const parseMonthPatterns$1 = {
  narrow: [
    /^一/i,
    /^二/i,
    /^三/i,
    /^四/i,
    /^五/i,
    /^六/i,
    /^七/i,
    /^八/i,
    /^九/i,
    /^十(?!(一|二))/i,
    /^十一/i,
    /^十二/i
  ],
  any: [
    /^一|1/i,
    /^二|2/i,
    /^三|3/i,
    /^四|4/i,
    /^五|5/i,
    /^六|6/i,
    /^七|7/i,
    /^八|8/i,
    /^九|9/i,
    /^十(?!(一|二))|10/i,
    /^十一|11/i,
    /^十二|12/i
  ]
};
const matchDayPatterns$1 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
const parseDayPatterns$1 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
const matchDayPeriodPatterns$1 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
const parseDayPeriodPatterns$1 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
const match$1 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1,
    parsePattern: parseOrdinalNumberPattern$1,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$1,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$1,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$1,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$1,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$1,
    defaultParseWidth: "any"
  })
};
const zhCN = {
  code: "zh-CN",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "少於 1 秒",
    other: "少於 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分鐘",
  lessThanXMinutes: {
    one: "少於 1 分鐘",
    other: "少於 {{count}} 分鐘"
  },
  xMinutes: {
    one: "1 分鐘",
    other: "{{count}} 分鐘"
  },
  xHours: {
    one: "1 小時",
    other: "{{count}} 小時"
  },
  aboutXHours: {
    one: "大約 1 小時",
    other: "大約 {{count}} 小時"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大約 1 個星期",
    other: "大約 {{count}} 個星期"
  },
  xWeeks: {
    one: "1 個星期",
    other: "{{count}} 個星期"
  },
  aboutXMonths: {
    one: "大約 1 個月",
    other: "大約 {{count}} 個月"
  },
  xMonths: {
    one: "1 個月",
    other: "{{count}} 個月"
  },
  aboutXYears: {
    one: "大約 1 年",
    other: "大約 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超過 1 年",
    other: "超過 {{count}} 年"
  },
  almostXYears: {
    one: "將近 1 年",
    other: "將近 {{count}} 年"
  }
};
const formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "內";
    } else {
      return result + "前";
    }
  }
  return result;
};
const dateFormats = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
const timeFormats = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
const dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatRelativeLocale = {
  lastWeek: "'上個'eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個'eeee p",
  other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
const eraValues = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一刻", "第二刻", "第三刻", "第四刻"],
  wide: ["第一刻鐘", "第二刻鐘", "第三刻鐘", "第四刻鐘"]
};
const monthValues = {
  narrow: [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二"
  ],
  abbreviated: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  wide: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ]
};
const dayValues = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
const dayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  }
};
const ordinalNumber = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  switch (options?.unit) {
    case "date":
      return number + "日";
    case "hour":
      return number + "時";
    case "minute":
      return number + "分";
    case "second":
      return number + "秒";
    default:
      return "第 " + number;
  }
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern = /^(第\s*)?\d+(日|時|分|秒)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
const parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻鐘/i
};
const parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
const matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
const parseMonthPatterns = {
  narrow: [
    /^一/i,
    /^二/i,
    /^三/i,
    /^四/i,
    /^五/i,
    /^六/i,
    /^七/i,
    /^八/i,
    /^九/i,
    /^十(?!(一|二))/i,
    /^十一/i,
    /^十二/i
  ],
  any: [
    /^一|1/i,
    /^二|2/i,
    /^三|3/i,
    /^四|4/i,
    /^五|5/i,
    /^六|6/i,
    /^七|7/i,
    /^八|8/i,
    /^九|9/i,
    /^十(?!(一|二))|10/i,
    /^十一|11/i,
    /^十二|12/i
  ]
};
const matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^週[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
const parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
const matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨)/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const zhTW = {
  code: "zh-TW",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
export {
  ug as A,
  uk as B,
  uz as C,
  vi as D,
  zhCN as E,
  zhTW as F,
  arDZ as a,
  az as b,
  cs as c,
  da as d,
  de as e,
  enGB as f,
  enUS as g,
  eo as h,
  es as i,
  et as j,
  faIR as k,
  fr as l,
  id as m,
  it as n,
  ja as o,
  km as p,
  ko as q,
  nb as r,
  nl as s,
  pl as t,
  ptBR as u,
  ru as v,
  sk as w,
  sv as x,
  th as y,
  tr as z
};
