const TRIP_START = "2027-03-31T00:00:00-03:00";

const ISLANDS = {
  hokkaido: [
    [140.12, 41.42], [140.35, 41.72], [140.58, 41.95], [140.82, 42.22],
    [140.98, 42.55], [141.18, 42.68], [141.55, 42.72], [142.15, 42.52],
    [142.85, 42.28], [143.35, 42.18], [143.85, 42.35], [144.35, 42.72],
    [144.95, 43.05], [145.48, 43.28], [145.82, 43.55], [145.92, 43.88],
    [145.55, 44.18], [145.22, 44.42], [144.75, 44.28], [144.15, 44.05],
    [143.45, 44.38], [142.85, 44.22], [142.15, 44.05], [141.85, 44.55],
    [141.68, 45.12], [141.72, 45.42], [141.38, 45.48], [141.15, 45.22],
    [141.35, 44.72], [141.55, 44.15], [141.42, 43.55], [140.85, 43.22],
    [140.35, 43.08], [140.02, 42.62], [139.78, 42.22], [139.85, 41.85],
    [140.05, 41.55],
  ],
  honshu: [
    [130.82, 33.96], [131.15, 33.92], [131.55, 33.98], [131.95, 33.88],
    [132.22, 33.92], [132.55, 34.08], [132.82, 34.18], [133.15, 34.28],
    [133.55, 34.32], [134.05, 34.38], [134.48, 34.42], [134.85, 34.48],
    [135.08, 34.42], [135.22, 34.58], [135.28, 34.42], [135.18, 34.12],
    [135.08, 33.72], [135.22, 33.48], [135.52, 33.45], [135.82, 33.48],
    [136.02, 33.72], [136.18, 33.98], [136.55, 34.18], [136.92, 34.38],
    [137.22, 34.58], [137.48, 34.68], [137.85, 34.72], [138.22, 34.68],
    [138.68, 34.62], [138.95, 34.58], [139.12, 34.82], [139.08, 35.05],
    [139.22, 35.18], [139.48, 35.22], [139.68, 35.18], [139.82, 35.28],
    [139.78, 35.48], [139.92, 35.68], [140.12, 35.22], [140.38, 35.18],
    [140.52, 35.42], [140.58, 35.72], [140.72, 35.92], [140.88, 36.22],
    [140.92, 36.62], [140.95, 37.05], [140.98, 37.52], [141.02, 37.92],
    [141.08, 38.28], [141.32, 38.42], [141.58, 38.55], [141.52, 38.82],
    [141.68, 39.08], [141.92, 39.42], [142.08, 39.72], [141.98, 40.12],
    [141.88, 40.42], [141.72, 40.82], [141.58, 41.12], [141.48, 41.42],
    [141.22, 41.52], [140.98, 41.38], [140.82, 41.18], [140.42, 41.48],
    [140.12, 41.22], [139.88, 40.82], [139.82, 40.22], [139.78, 39.72],
    [139.68, 39.22], [139.52, 38.78], [139.42, 38.32], [139.28, 37.88],
    [138.85, 37.48], [138.42, 37.18], [137.92, 37.08], [137.42, 37.28],
    [137.05, 37.52], [136.72, 37.22], [136.82, 36.82], [136.95, 36.42],
    [136.78, 36.12], [136.22, 36.02], [135.72, 35.72], [135.22, 35.55],
    [134.72, 35.58], [134.22, 35.55], [133.62, 35.52], [133.05, 35.48],
    [132.52, 35.42], [132.12, 35.22], [131.72, 34.92], [131.28, 34.62],
    [130.92, 34.28], [130.78, 34.05],
  ],
  shikoku: [
    [132.38, 33.85], [132.55, 34.05], [132.92, 34.22], [133.35, 34.38],
    [133.85, 34.42], [134.28, 34.38], [134.62, 34.22], [134.78, 33.92],
    [134.72, 33.55], [134.42, 33.18], [134.05, 32.95], [133.55, 32.78],
    [133.05, 32.72], [132.62, 32.82], [132.35, 33.05], [132.28, 33.42],
    [132.32, 33.68],
  ],
  kyushu: [
    [130.38, 33.92], [130.72, 33.88], [131.05, 33.78], [131.42, 33.62],
    [131.72, 33.48], [131.88, 33.18], [131.82, 32.82], [131.68, 32.42],
    [131.55, 31.95], [131.42, 31.52], [131.22, 31.22], [130.95, 31.15],
    [130.62, 31.18], [130.38, 31.35], [130.22, 31.62], [129.95, 31.82],
    [129.72, 32.15], [129.58, 32.55], [129.62, 32.92], [129.82, 33.22],
    [130.05, 33.48], [130.22, 33.68], [130.32, 33.85],
  ],
};

const ISLETS = {
  awaji: { group: "honshu", region: "kansai", coords: [[134.72, 34.55], [134.92, 34.62], [135.05, 34.55], [134.98, 34.28], [134.78, 34.22], [134.68, 34.38]] },
  sado: { group: "honshu", region: "chubu", coords: [[138.22, 38.28], [138.48, 38.35], [138.55, 38.12], [138.42, 37.82], [138.18, 37.85], [138.12, 38.12]] },
  oki: { group: "honshu", region: "chugoku", coords: [[133.22, 36.28], [133.38, 36.32], [133.42, 36.18], [133.28, 36.12]] },
  shodoshima: { group: "honshu", region: "shikoku", coords: [[134.05, 34.52], [134.28, 34.55], [134.35, 34.48], [134.18, 34.42]] },
  tsushima: { group: "kyushu", region: "kyushu", coords: [[129.22, 34.72], [129.38, 34.68], [129.42, 34.35], [129.32, 34.08], [129.18, 34.22], [129.15, 34.52]] },
  iki: { group: "kyushu", region: "kyushu", coords: [[129.62, 33.85], [129.78, 33.82], [129.75, 33.68], [129.62, 33.72]] },
  goto: { group: "kyushu", region: "kyushu", coords: [[128.62, 32.82], [128.92, 32.88], [129.02, 32.68], [128.78, 32.58], [128.58, 32.68]] },
  amakusa: { group: "kyushu", region: "kyushu", coords: [[130.05, 32.55], [130.28, 32.52], [130.32, 32.28], [130.12, 32.18], [129.98, 32.35]] },
  tanegashima: { group: "kyushu", region: "kyushu", coords: [[130.95, 30.82], [131.08, 30.75], [131.05, 30.35], [130.92, 30.42]] },
  yakushima: { group: "kyushu", region: "kyushu", coords: [[130.42, 30.42], [130.62, 30.38], [130.58, 30.22], [130.38, 30.25]] },
  oshima: { group: "honshu", region: "kanto", coords: [[139.35, 34.78], [139.48, 34.82], [139.45, 34.68], [139.35, 34.7]] },
  miyake: { group: "honshu", region: "kanto", coords: [[139.5, 34.12], [139.58, 34.1], [139.55, 34.02], [139.48, 34.05]] },
  rishiri: { group: "hokkaido", region: "hokkaido", coords: [[141.18, 45.22], [141.32, 45.25], [141.28, 45.12], [141.15, 45.15]] },
  rebun: { group: "hokkaido", region: "hokkaido", coords: [[141.02, 45.42], [141.12, 45.45], [141.1, 45.28], [141.0, 45.3]] },
  okushiri: { group: "hokkaido", region: "hokkaido", coords: [[139.48, 42.22], [139.58, 42.18], [139.52, 42.08], [139.42, 42.12]] },
};

const LAKES = {
  biwa: [[135.92, 35.52], [136.18, 35.48], [136.28, 35.22], [136.12, 35.02], [135.88, 35.08], [135.85, 35.35]],
  kasumigaura: [[140.35, 36.12], [140.58, 36.08], [140.52, 35.92], [140.32, 35.95]],
  inawashiro: [[140.02, 37.52], [140.18, 37.5], [140.15, 37.42], [140.02, 37.44]],
  suwa: [[138.08, 36.08], [138.18, 36.06], [138.16, 35.98], [138.08, 36.0]],
  towada: [[140.82, 40.48], [140.95, 40.46], [140.92, 40.38], [140.8, 40.4]],
  ashi: [[139.0, 35.22], [139.08, 35.21], [139.06, 35.16], [138.98, 35.17]],
  hamana: [[137.55, 34.78], [137.72, 34.76], [137.68, 34.68], [137.55, 34.7]],
  shinji: [[132.92, 35.48], [133.08, 35.47], [133.05, 35.42], [132.92, 35.43]],
};

const RANGES = {
  hidaka: [[142.85, 42.35], [142.95, 42.7], [143.05, 43.05]],
  ou: [[140.55, 37.2], [140.62, 38.2], [140.72, 39.2], [140.82, 40.2]],
  kitakami: [[141.35, 38.85], [141.42, 39.25], [141.48, 39.7]],
  alps: [[137.15, 35.55], [137.35, 35.85], [137.48, 36.15], [137.55, 36.45], [137.62, 36.72]],
  kiso: [[137.55, 35.55], [137.68, 35.82], [137.78, 36.08]],
  akaishi: [[138.05, 35.22], [138.15, 35.48], [138.22, 35.72]],
  chugoku: [[131.2, 34.55], [132.2, 34.85], [133.2, 35.05], [134.2, 35.15]],
  kyushu: [[130.85, 32.55], [131.05, 32.85], [131.15, 33.15]],
};

const PEAKS = [
  { id: "fuji", coords: [138.7274, 35.3606], r: 4.2 },
  { id: "aso", coords: [131.09, 32.88], r: 3.4 },
  { id: "tateyama", coords: [137.566, 36.566], r: 3.2 },
  { id: "yarigatake", coords: [137.647, 36.342], r: 2.6 },
  { id: "hakusan", coords: [136.775, 36.155], r: 2.6 },
  { id: "daisen", coords: [133.546, 35.371], r: 2.6 },
  { id: "asahi", coords: [142.854, 43.664], r: 2.8 },
];

const RIVERS = {
  ishikari: [[141.25, 43.55], [141.45, 43.35], [141.35, 43.12]],
  kitakami: [[140.88, 39.7], [141.08, 39.15], [141.14, 38.45]],
  tone: [[139.15, 36.48], [139.55, 36.15], [140.05, 35.95], [140.55, 35.76]],
  shinano: [[137.62, 36.62], [138.15, 36.78], [138.72, 37.22], [139.05, 37.82]],
  kiso: [[137.55, 36.05], [137.35, 35.72], [136.92, 35.32], [136.72, 35.08]],
  yodo: [[135.98, 35.18], [135.68, 34.9], [135.45, 34.68]],
  yoshino: [[134.15, 33.92], [134.05, 34.08], [133.72, 34.22]],
  chikugo: [[130.92, 33.28], [130.62, 33.22], [130.42, 33.18]],
};

const LINKS = [
  { coords: [[135.02, 34.62], [134.95, 34.58]] },
  { coords: [[134.72, 34.38], [134.62, 34.22]] },
  { coords: [[133.82, 34.4], [133.78, 34.22]] },
  { coords: [[132.55, 34.08], [132.48, 33.95]] },
  { coords: [[130.96, 33.97], [130.88, 33.9]] },
];

const SEA_LABELS = [
  { text: "日本海", coords: [134.55, 38.55], size: "lg" },
  { text: "太平洋", coords: [141.15, 33.05], size: "lg" },
  { text: "東シナ海", coords: [128.85, 31.55], size: "md" },
  { text: "瀬戸内海", coords: [133.28, 34.08], size: "sm" },
  { text: "東京湾", coords: [139.98, 35.38], size: "sm" },
  { text: "大阪湾", coords: [135.12, 34.38], size: "sm" },
  { text: "伊勢湾", coords: [136.85, 34.52], size: "sm" },
  { text: "津軽海峡", coords: [140.55, 41.55], size: "sm" },
  { text: "関門海峡", coords: [130.55, 34.22], size: "sm" },
];

const TOWNS = [
  { name: "札幌", coords: [141.35, 43.06] },
  { name: "函館", coords: [140.73, 41.77] },
  { name: "青森", coords: [140.75, 40.82] },
  { name: "仙台", coords: [140.87, 38.27] },
  { name: "新潟", coords: [139.04, 37.92] },
  { name: "金沢", coords: [136.66, 36.56] },
  { name: "名古屋", coords: [136.91, 35.18] },
  { name: "静岡", coords: [138.38, 34.98] },
  { name: "広島", coords: [132.46, 34.39] },
  { name: "松山", coords: [132.77, 33.84] },
  { name: "高松", coords: [134.05, 34.34] },
  { name: "福岡", coords: [130.4, 33.59] },
  { name: "長崎", coords: [129.88, 32.75] },
  { name: "鹿児島", coords: [130.55, 31.6] },
];

const REGION_BORDERS = [
  [[141.12, 36.88], [140.62, 36.9], [140.18, 36.96], [139.72, 36.92], [139.32, 36.88], [139.08, 37.08], [139.02, 37.42], [139.18, 37.78], [139.42, 38.08], [139.54, 38.24]],
  [[139.12, 36.88], [138.72, 36.52], [138.52, 36.12], [138.62, 35.68], [138.8, 35.38], [138.98, 35.16], [139.1, 35.06]],
  [[135.8, 35.7], [136.08, 35.5], [136.34, 35.4], [136.5, 35.18], [136.6, 34.92], [136.72, 34.68], [136.88, 34.52]],
  [[134.5, 35.6], [134.38, 35.32], [134.32, 35.02], [134.4, 34.72], [134.55, 34.46]],
];

const PREFECTURE_LINES = [
  [[135.18, 34.88], [135.22, 34.6]],
  [[135.42, 34.9], [135.7, 34.86]],
  [[135.72, 34.86], [135.92, 34.7]],
  [[135.52, 34.62], [135.7, 34.52]],
  [[135.9, 35.12], [136.08, 34.92]],
  [[135.68, 34.3], [135.95, 34.18]],
  [[134.85, 34.72], [134.95, 35.05], [135.05, 35.35]],
  [[139.32, 35.58], [139.72, 35.5]],
  [[139.42, 35.8], [139.82, 35.78]],
  [[139.88, 35.68], [140.08, 35.58]],
  [[140.05, 35.72], [140.22, 35.42]],
  [[139.35, 36.05], [139.55, 35.85]],
  [[137.05, 36.22], [137.4, 36.02], [137.58, 35.72]],
  [[137.85, 36.62], [138.15, 36.38], [138.28, 36.12]],
  [[130.55, 33.35], [130.78, 32.95], [130.85, 32.55]],
  [[131.25, 33.45], [131.35, 33.15]],
];

const REGIONS = [
  {
    id: "hokkaido",
    clip: "hokkaido",
    jp: "北海道",
    en: "Hokkaido",
    label: [142.55, 43.42],
    poly: "island",
  },
  {
    id: "tohoku",
    clip: "honshu",
    jp: "東北",
    en: "Tohoku",
    label: [140.92, 39.42],
    poly: [
      [139.54, 38.24], [139.42, 38.08], [139.18, 37.78], [139.02, 37.42],
      [139.08, 37.08], [139.32, 36.88], [140.18, 36.96], [141.12, 36.88],
      [142.4, 36.7], [142.6, 41.8], [139.1, 42.0], [138.9, 38.4],
    ],
  },
  {
    id: "kanto",
    clip: "honshu",
    jp: "関東",
    en: "Kanto",
    label: [140.42, 36.18],
    poly: [
      [139.12, 36.88], [140.18, 36.96], [141.12, 36.88], [141.4, 36.7],
      [141.3, 35.0], [139.2, 34.7], [139.1, 35.06], [138.98, 35.16],
      [138.8, 35.38], [138.62, 35.68], [138.52, 36.12], [138.72, 36.52],
    ],
  },
  {
    id: "chubu",
    clip: "honshu",
    jp: "中部",
    en: "Chubu",
    label: [137.48, 36.08],
    poly: [
      [139.54, 38.24], [139.12, 36.88], [138.72, 36.52], [138.52, 36.12],
      [138.62, 35.68], [138.8, 35.38], [138.98, 35.16], [139.1, 35.06],
      [139.2, 34.5], [136.88, 34.52], [136.72, 34.68], [136.6, 34.92],
      [136.5, 35.18], [136.34, 35.4], [136.08, 35.5], [135.8, 35.7],
      [136.4, 37.7], [139.6, 38.6],
    ],
  },
  {
    id: "kansai",
    clip: "honshu",
    jp: "関西",
    en: "Kansai",
    label: [135.55, 33.72],
    poly: [
      [134.5, 35.6], [135.8, 35.7], [136.08, 35.5], [136.34, 35.4],
      [136.5, 35.18], [136.6, 34.92], [136.72, 34.68], [136.88, 34.52],
      [136.9, 33.2], [134.8, 33.1], [134.55, 34.46], [134.4, 34.72],
      [134.32, 35.02], [134.38, 35.32],
    ],
  },
  {
    id: "chugoku",
    clip: "honshu",
    jp: "中国",
    en: "Chugoku",
    label: [132.48, 34.95],
    poly: [
      [134.5, 35.6], [134.38, 35.32], [134.32, 35.02], [134.4, 34.72],
      [134.55, 34.46], [134.7, 33.7], [130.3, 33.5], [130.2, 35.8],
      [134.7, 36.0],
    ],
  },
  {
    id: "shikoku",
    clip: "shikoku",
    jp: "四国",
    en: "Shikoku",
    label: [133.52, 33.42],
    poly: "island",
  },
  {
    id: "kyushu",
    clip: "kyushu",
    jp: "九州",
    en: "Kyushu",
    label: [130.72, 32.42],
    poly: "island",
  },
];

function topic(id, title, fields = {}) {
  return {
    id,
    title,
    image: "",
    imageAlt: "",
    imageCaption: "",
    hours: "",
    price: "",
    queues: "",
    order: "",
    attractions: [],
    tips: [],
    notes: "",
    ...fields,
  };
}

const STOPS = [
  {
    id: "partida",
    onMap: false,
    city: "Saída do Brasil",
    jp: "出発",
    region: "Voo",
    days: "31 mar · Brasil",
    dayLabel: "Ainda não é o dia 1",
    coords: [135.5023, 34.6937],
    places: [
      topic("partida-voo", "Passagem", {
        notes:
          "O dia 31 é a saída do Brasil. O dia 1 no Japão só existe depois de cravar o horário do voo — chegada, fuso e o primeiro hotel vêm daí.",
        hours: "Horário do voo a cravar",
        order: "Não contar este dia como dia 1 em Osaka",
      }),
    ],
    indicacoes: [],
    description:
      "31 de março, calendário brasileiro: a gente sai. Ainda não é o primeiro dia no Japão. Quando a passagem tiver horário, a chegada entra aqui e o resto das datas se encaixa.",
    photos: [
      {
        src: "images/kansai/osaka-dotonbori.jpg",
        alt: "Osaka à noite",
        caption: "O destino, não o dia",
      },
      {
        src: "images/kanto/tokyo-night.jpg",
        alt: "Japão à noite",
        caption: "Chegada a cravar",
      },
    ],
  },
  {
    id: "osaka",
    city: "Osaka",
    jp: "大阪",
    region: "Kansai",
    days: "após o voo",
    dayLabel: "Dias 1–4 no Japão",
    coords: [135.5023, 34.6937],
    places: [
      topic("osaka-usj", "Universal Studios Japan", {
        image: "images/kansai/universal.jpg",
        imageAlt: "Universal Studios Japan",
        imageCaption: "USJ",
        hours:
          "Em geral 9h–21h (às vezes 8h30–22h). Confirmar no calendário oficial do dia. Portão abre um pouco antes; vale estar na fila às 7h30–8h.",
        price:
          "Studio Pass 1 dia (2026): adulto ~¥8.900–¥11.800, criança 4–11 ~¥5.700–¥7.500. Express Pass é extra (~¥8.000–¥18.000 no 4; o 7 sai mais). VIP tour ~¥45.000. Preços mudam por data — cravar de novo em 2027. Comprar no site oficial, não em revenda.",
        queues:
          "Parque mais cheio da Ásia. Mine-Cart Madness 2–4h; Mario Kart 1,5–2,5h; Forbidden Journey e Flying Dinosaur 1,5–3h. Sem Express, um dia rende 4–6 atrações. Com Express, 10–12. Super Nintendo World pede timed entry no app ou Express com entrada garantida — os slots grátis somem de manhã.",
        order:
          "1) Baixar o app USJ e cadastrar o Studio Pass. 2) Chegar cedo (JR Universal City). 3) Ao entrar, pegar timed entry do Super Nintendo World — ou pular isso se o Express já incluir. 4) Nintendo: Mine-Cart (single rider ajuda) → Mario Kart → Yoshi. 5) Ao lado: Harry Potter (Forbidden Journey + Hippogriff + cerveja de manteiga). 6) Flying Dinosaur e Hollywood Dream. 7) Jaws, Spider-Man, Jurassic Park. 8) Minions à tarde, quando o resto estoura.",
        attractions: [
          "Super Nintendo World — Mario Kart: Koopa’s Challenge",
          "Donkey Kong Country — Mine-Cart Madness (a fila mais longa; single rider)",
          "Yoshi’s Adventure",
          "Harry Potter and the Forbidden Journey",
          "Flight of the Hippogriff",
          "The Flying Dinosaur (a mais extrema)",
          "Hollywood Dream: The Ride (tem versão de costas)",
          "Jurassic Park: The Ride (molha)",
          "Jaws — o último Jaws completo do mundo",
          "The Amazing Adventures of Spider-Man",
          "Despicable Me Minion Mayhem / Villain-Con Minion Blast",
          "WaterWorld (show) e NO LIMIT! Parade",
        ],
        tips: [
          "Express Pass não é ingresso: precisa do Studio Pass + o pass. Cada pessoa, um QR. Não compartilha, não reagenda horário perdido.",
          "Ler o que cada Express inclui. Nem todo 4 cobre Mine-Cart e Mario Kart. Para primeira vez, o 7 com Nintendo + Harry Potter é o que mais segura o dia.",
          "Comprar Express com semanas de antecedência — esgota nas datas boas. Abril é sakura, deve lotar.",
          "Sem Express: 60–90 min antes da abertura e timed entry no segundo em que passar a catraca. Segunda leva de slots às vezes cai 12h–13h.",
          "Nintendo e Harry Potter ficam no fundo do parque, um do lado do outro. Fazer os dois na mesma ida, sem cruzar a lagoa duas vezes.",
          "App oficial: filas ao vivo, mapa, shows e o timed entry. Power bank — o celular morre no almoço.",
          "De Umeda/Osaka Station: JR Loop até Nishikujō + JR Yumesaki (Sakurajima) até Universal City. ~12–15 min, ~¥190. Da estação ao portão, 5 min a pé pelo CityWalk.",
          "Power-Up Band do Mario é extra e só vale se for ficar brincando no reino. Não é obrigatório para as montanhas.",
          "Capa de chuva barata no Jurassic. Tênis. Fila de comida também é fila — almoçar cedo ou tarde.",
          "Se o voo atrasar o dia 1, não forçar Universal no mesmo dia da aterrissagem. O parque come o dia inteiro.",
        ],
        notes:
          "Primeiro dia em terra japonesa — só depois da chegada. Valores e horários são de 2026; em 2027 o calendário oficial manda. Discover U (25 anos) vai até 30 mar 2027, então o começo de abril ainda pode herdar fila de aniversário + cerejeira.",
      }),
      topic("osaka-kaiyukan", "Aquário Kaiyukan", {
        image: "images/kansai/kaiyukan.jpg",
        imageAlt: "Aquário Kaiyukan",
        imageCaption: "Kaiyukan",
        hours:
          "Em geral 10h–20h, última entrada 19h. Estica em Golden Week e verão. Fecha uns poucos dias de manutenção por ano — olhar o calendário oficial.",
        price:
          "Preço dinâmico (2026): adulto 16+ ~¥2.700–¥3.500; 7–15 ~¥1.400–¥1.800; 3–6 ~¥700–¥900; <2 grátis. Combo com a roda Tempozan ou o cruzeiro Santa Maria existe. Comprar e-ticket com horário no site oficial e pular o balcão.",
        queues:
          "Fila do bilhete no fim de semana. Com e-ticket, entra no slot. Dentro, o tanque do tubarão-baleia aperta no meio do dia. Manhã de semana ou depois das 17h (Night Aquarium) é mais vazio. 2–3 horas bastam.",
        order:
          "Dia 2, de manhã: abrir no Kaiyukan (oeste, Osakako). Ver o quadro de alimentação na entrada e ir no horário do tubarão-baleia. Depois atravessar a cidade para o sul: Shitennō-ji (fecha 16h30) → Tsūtenkaku/Shinsekai → Dōtonbori ao entardecer.",
        attractions: [
          "Tanque do Pacífico — tubarão-baleia e arraias num cilindro de 9 m",
          "Percurso em espiral, do 8º andar para baixo (um sentido)",
          "Lontras, pinguins, águas-vivas, zona do Ártico",
          "Alimentações do dia (quadro na entrada)",
          "Roda Tempozan e Tempozan Marketplace ao lado, se sobrar tempo",
        ],
        tips: [
          "E-ticket com horário, 30 dias antes no site. Mesmo preço do balcão, sem a fila.",
          "Midosuji até Hommachi + Chūō até Osakako (saída 1), 5 min a pé. De Umeda ~25 min, ~¥240.",
          "Começar em cima e descer. Não voltar contra o fluxo.",
          "Se o dia 1 na Universal cansar, o Kaiyukan de manhã é o reset certo — indoor, fresco, sem Express Pass.",
        ],
        notes:
          "Um dos aquários grandes do Japão. Valores 2026, dinâmicos. Em abril deve estar na faixa mais alta se cair em fim de semana.",
      }),
      topic("osaka-shitennoji", "Shitennō-ji", {
        image: "images/kansai/shitennoji.jpg",
        imageAlt: "Templo Shitennō-ji",
        imageCaption: "Shitennō-ji",
        hours:
          "Pátio externo 24h, de graça. Galeria central e jardim: abr–set 8h30–16h30; out–mar 8h30–16h00. Dia 21 de cada mês abre mais cedo (feira). Tesouro: ~10h–16h30, fecha segunda.",
        price:
          "Oficial: galeria central adulto ¥500 (ensino médio ¥300); jardim Honbō ¥300; tesouro ¥500. Pátio de graça. Dinheiro vivo no bilhete, omamori e goshuin. < fundamental grátis.",
        queues:
          "Templo, não parque. De manhã cedo quase não tem fila. Dia 21 (feira Garakuta-ichi) lotado. 1–1,5 h no recinto; 2 h se subir a pagode e o jardim.",
        order:
          "Dia 2, depois do Kaiyukan e antes das 16h. Pagode + Kondō primeiro (sapatos fora), jardim se der, pátio e tanque das tartarugas no fim. Daí a pé/metro até Shinsekai e a Tsūtenkaku.",
        attractions: [
          "Galeria central — pagode de 5 andares (dá para subir) e Kondō",
          "Jardim Gokuraku-jōdo (Paraíso Ocidental)",
          "Tesouro (exposições rotativas)",
          "Tanque das tartarugas e torii de pedra no pátio livre",
          "Feira do dia 21, se a data bater",
        ],
        tips: [
          "Fundado em 593 por Shōtoku — o primeiro templo estatal do Japão. Os prédios queimaram e foram reconstruídos no traçado do século VI.",
          "Meia + Tanimachi até Shitennōji-mae Yūhigaoka (5 min a pé) ou 10 min a pé de Tennōji (JR Loop / Midōsuji).",
          "Meias limpas: pagode e Kondō pedem sapato fora. Flash proibido dentro.",
          "Goshuin ~¥500 no escritório. Levar iene — cartão não cola em amuleto.",
        ],
        notes:
          "É o pedaço antigo do dia 2, antes do neon. Se o grupo estiver morto depois do aquário, o pátio de graça já conta; a pagode é o que vale o ¥500.",
      }),
      topic("osaka-tsutenkaku", "Tsūtenkaku", {
        image: "images/kansai/tsutenkaku.jpg",
        imageAlt: "Torre Tsūtenkaku",
        imageCaption: "Tsūtenkaku",
        hours:
          "Mirante 9h–21h45, última entrada 21h15. Slider e decks especiais podem fechar com tempo ruim. Reserva de horário na compra do bilhete.",
        price:
          "2026 (depois de abr): adulto 15+ ¥1.500, criança 5–14 ¥800. Pico de agosto sobe. Tower Slider à parte (~¥1.100). Amazing Pass costuma incluir mirante — confirmar o ano.",
        queues:
          "Fila no fim de tarde e à noite. Comprar online com slot. 30–45 min na torre; Shinsekai ao redor pede mais 1 h (kushikatsu).",
        order:
          "Dia 2, fim de tarde, depois de Shitennō-ji (é o mesmo bairro: Tennōji / Shinsekai). Subir, descer, kushikatsu no Billiken, e só então ir para Dōtonbori quando o neon acender.",
        attractions: [
          "Mirante geral — Osaka baixa, neon de Shinsekai",
          "Deck externo / TIP THE TSUTENKAKU (conjunto, fecha com vento)",
          "Tower Slider — tobogã pela torre, ingresso extra",
          "Billiken no 5º andar — esfregar as solas pede sorte",
          "Shinsekai embaixo: kushikatsu, fliperama, cara de 1970",
        ],
        tips: [
          "Estação: Ebisuchō (Sakaisuji, 4 min) ou Dōbutsuen-mae / Shin-Imamiya (7 min).",
          "A vista não é a mais alta de Osaka — o ponto é o bairro. Umeda Sky no dia 3 ganha o skyline.",
          "Kushikatsu Daruma (o original é aqui, não só em Dōtonbori). Um molho, sem molhar o espeto duas vezes.",
          "Se estiver chovendo e o deck externo fechar, o mirante interno ainda vale o neon.",
        ],
        notes:
          "Torre de 103 m, reconstruída em 1956. É o brinquedo do dia 2, não o mirante sério.",
      }),
      topic("osaka-dotonbori", "Dōtonbori", {
        image: "images/kansai/osaka-dotonbori.jpg",
        imageAlt: "Luzes de Dōtonbori à noite",
        imageCaption: "Dōtonbori",
        hours:
          "Rua 24h. Neon de verdade a partir do entardecer, pico 18h–22h. Barracas ~11h até meia-noite ou mais. Tombori River Cruise ~11h–21h (20 min) — cravar o último barco do dia.",
        price:
          "Andar é de graça. Comer: takoyaki ¥600–¥900 o tabuleiro; kushikatsu ¥100–¥300 o espeto; okonomiyaki ¥1.400–¥3.500; 551 Hōrai ~¥190 o pão. Cruzeiro ~¥900–¥1.200. Orçamento honesto ¥1.500–¥3.500 por cabeça se não sentar no caranguejo.",
        queues:
          "Sexta e sábado 19h–22h é ombro. Ichiran e Mizuno passam de 1 h. Barraca anda mais rápido que restaurante. Chegar ~17h–17h30: foto no Glico com céu ainda claro, jantar antes do esmagamento.",
        order:
          "Fecho do dia 2. Foto na ponte Ebisu (Glico) → uma volta no canal → uma coisa sentada OU várias barracas → Hozenji Yokochō se quiser silêncio. Não jantar pesado em Shinsekai e de novo aqui.",
        attractions: [
          "Letreiro do Glico na ponte Ebisu — a foto",
          "Canal e Tombori River Cruise",
          "Takoyaki (Wanaka, Jūhachiban)",
          "Okonomiyaki (Mizuno ou Chibo)",
          "Kushikatsu Daruma — se não tiver comido em Shinsekai",
          "Kani Dōraku (o caranguejo mecânico) — caro, landmark",
          "551 Hōrai — pão de porco para o caminho",
          "Hozenji Yokochō — beco molhado, musgo, o contrário do neon",
        ],
        tips: [
          "Namba (Midōsuji / Yotsubashi / Sennichimae) ou Nipponbashi, 5 min a pé.",
          "Iene nas barracas. Cartão nos restaurantes grandes.",
          "Kuidaore: petiscar em vários lugares, não lotar no primeiro.",
          "Kushikatsu: um molho só, sem redipping. É regra de verdade.",
          "Shinsaibashi e Amerikamura ficam colados se alguém quiser loja — melhor sobrar para o dia 4.",
        ],
        notes:
          "O neon do hero. Melhor à noite; de dia é shopping. Em abril ainda pode estar fresco — casaco leve para ficar na ponte.",
      }),
      topic("osaka-castle", "Castelo de Osaka", {
        image: "images/kansai/osaka-castle.jpg",
        imageAlt: "Castelo de Osaka",
        imageCaption: "Castelo de Osaka",
        hours:
          "Parque 24h, de graça. Torre em geral 9h–17h (última 16h30); no hanami costuma ir até 21h (em 2026 foi 20 mar–12 abr — cravar 2027). Fecha 28 dez–1 jan. Jardim Nishinomaru: 9h–17h, segunda fecha, no sakura abre de noite.",
        price:
          "Torre + Museu do Muro Toyotomi ¥1.200 adulto; <16 grátis com documento. Jardim Nishinomaru ~¥300, ~¥350 no sakura. Amazing Pass costuma incluir a torre. E-ticket fura a fila do balcão.",
        queues:
          "Na cerejeira, fila da torre > 30–90 min sem e-ticket. Ir na abertura (9h) ou depois das 16h. Parque e muralhas são livres e já valem a foto. 1,5–2 h com a torre; só o parque, 45 min.",
        order:
          "Dia 3 de manhã. E-ticket. Muralhas e o Takoishi primeiro (de graça), torre, jardim Nishinomaru se tiver sakura. À tarde livre / deslocar para Umeda. Pôr do sol é no Sky Building, não aqui — a menos que caia na iluminação noturna do hanami.",
        attractions: [
          "Tenshu (torre-museu, reconstrução de 1931) — vista do 8º andar",
          "Museu do Muro de Pedra Toyotomi (no mesmo ingresso, aberto em 2025)",
          "Muralhas Edo, portões e o Takoishi",
          "Jardim Nishinomaru — 600 cerejeiras, a foto clássica da torre",
          "Parque (~3.000 sakuras) e Santuário de Hideyoshi",
        ],
        tips: [
          "JR Osakajōkōen ou metro Tanimachi 4-chōme / Tenmabashi. O parque é grande — não descer no lado errado.",
          "A torre por dentro é museu moderno, não castelo original. O que é velho está do lado de fora.",
          "Hanami: lona + bento de konbini. Meio do sábado de sakura é o horário a evitar.",
          "Se a cerejeira ainda estiver de pé no dia 3, Nishinomaru à noite (iluminação ~18h–21h) compete com o Umeda Sky. Escolher um dos dois.",
        ],
        notes:
          "A viagem cai em abril: sakura em Osaka costuma ser fim de março / começo de abril. Em 2027 pode já ter passado — olhar o forecast na semana.",
      }),
      topic("osaka-umeda", "Umeda Sky Building", {
        image: "images/kansai/umeda-sky.jpg",
        imageAlt: "Umeda Sky Building",
        imageCaption: "Umeda Sky",
        hours:
          "Kūchū Teien 9h30–22h30, última entrada 22h. Terraço fecha com chuva forte. Em 2027 há um dia de manutenção marcado: 18 abr 9h30–18h — só importa se o roteiro atrasar até lá.",
        price:
          "Adulto ¥2.000; 4–12 ¥500; <4 grátis. Amazing Pass / e-Pass: grátis só até 15h; depois 10% off. Pôr do sol = ingresso cheio. Web ticket no site oficial.",
        queues:
          "Pôr do sol e início da noite. Chegar 45–60 min antes do sol baixar para pegar lugar no terraço. De manhã de semana quase não tem fila. 45–70 min no mirante.",
        order:
          "Dia 3, fecho. Castelo de manhã, Umeda o resto do dia / shops, subir no golden hour. De Umeda Station são 10–15 min a pé (torre leste, elevador até o 39º, depois a escada rolante no vazio).",
        attractions: [
          "Terraço ao ar livre 360° — o Floating Garden",
          "Andares 39–40 internos, se ventar",
          "Escada rolante inclinada entre as duas torres",
          "Pôr do sol → luzes da cidade (o horário que justifica o ¥2.000)",
        ],
        tips: [
          "Não é o Abeno Harukas (esse é o mais alto). O Sky é o desenho: duas torres e o jardim no ar.",
          "Casaco — no terraço venta, em abril ainda esfria quando o sol some.",
          "Se o grupo quiser só neon de graça, a passarela do Grand Front / o rooftop do HEP Five não substitui, mas barateia. O Sky ainda é o shot.",
          "Jantar em Umeda depois, sem voltar para Namba se as pernas acabaram.",
        ],
        notes:
          "O mirante sério de Osaka. Tsūtenkaku é charme; este é o mapa da cidade acendendo.",
      }),
      topic("osaka-dia4", "Dia 4 ainda a preencher", {
        notes:
          "Em branco de propósito. Candidatos: Shinsaibashi / Amerikamura, Kuromon, Abeno Harukas, Tempozan se o Kaiyukan tiver ficado curto, ou só andar sem lista. Entra aqui quando a gente decidir.",
        order: "Dia 4 no Japão — sem roteiro até o voo e o cansaço dos três primeiros dias existirem.",
      }),
    ],
    indicacoes: [
      {
        title: "Toadstool Cafe (dentro do Super Nintendo World)",
        note: "Reserva/fila própria. Se for comer no reino, encaixar no timed entry — não deixar para o fim do slot.",
      },
      {
        title: "Three Broomsticks / Butterbeer",
        note: "No Harry Potter, ao lado do Nintendo. Cerveja de manteiga gelada ou quente; a fila da bebida é mais curta que a da montanha.",
      },
      {
        title: "Universal CityWalk",
        note: "Do portão à estação. Jantar depois do parque se ainda houver perna — senão voltar para Dōtonbori/Umeda.",
      },
      {
        title: "Kushikatsu Daruma (Shinsekai)",
        note: "A casa-mãe, ao pé da Tsūtenkaku. Um molho, sem redipping. Melhor aqui do que repetir em Dōtonbori no mesmo dia.",
      },
      {
        title: "Takoyaki Wanaka",
        note: "Filial Sennichimae, um quarteirão fora do canal — fila anda. ~¥600–¥900 o tabuleiro.",
      },
      {
        title: "Hozenji Yokochō",
        note: "Beco ao lado de Dōtonbori. Musgo, lanternas, o anti-neon se o grupo saturar.",
      },
      {
        title: "551 Hōrai",
        note: "Pão de porco ~¥190. Lanche de metrô, não refeição.",
      },
    ],
    description:
      "O Japão começa aqui — no dia 1 em terra, não no dia 31 do Brasil. Universal no primeiro dia útil, depois o aquário, o templo mais antigo, Tsūtenkaku e Dōtonbori. No terceiro sobe o castelo e o Umeda Sky. O quarto ainda está em branco, e as datas do calendário só fecham com o voo.",
    photos: [
      {
        src: "images/kansai/osaka-dotonbori.jpg",
        alt: "Luzes de Dōtonbori à noite",
        caption: "Dōtonbori",
      },
      {
        src: "images/kansai/osaka-castle.jpg",
        alt: "Castelo de Osaka",
        caption: "Castelo de Osaka",
      },
    ],
  },
  {
    id: "kobe",
    city: "Kobe",
    jp: "神戸",
    region: "Kansai",
    days: "data a cravar",
    dayLabel: "Dia 5 no Japão",
    coords: [135.1956, 34.6901],
    places: [
      topic("kobe-preencher", "A preencher"),
      topic("kobe-akashi", "Akashi — talvez"),
    ],
    indicacoes: [],
    description:
      "Um pulo ao lado. Porto, colinas e carne famosa demais para a gente fingir que não vai comer. Akashi ficou como um talvez no roteiro — se der, a gente desvia; se não der, Kobe já basta.",
    photos: [
      {
        src: "images/kansai/kobe-port.jpg",
        alt: "Porto de Kobe ao entardecer",
        caption: "Porto de Kobe",
      },
      {
        src: "images/kansai/kobe-city.jpg",
        alt: "Ruas de Kobe",
        caption: "A cidade",
      },
    ],
  },
  {
    id: "himeji",
    city: "Himeji",
    jp: "姫路",
    region: "Chūgoku",
    days: "data a cravar",
    dayLabel: "Dia 6 · manhã",
    coords: [134.6856, 34.8394],
    places: [topic("himeji-castle", "Castelo da Garça Branca")],
    indicacoes: [],
    description:
      "O castelo que parece flutuar. Himeji é o retrato clássico de um shiro japonês — branco, intacto, impossível de ignorar. Um desvio curto no caminho para o oeste.",
    photos: [
      {
        src: "images/chugoku/himeji-castle.jpg",
        alt: "Castelo de Himeji",
        caption: "Garça Branca",
      },
      {
        src: "images/kansai/cherry-blossoms.jpg",
        alt: "Cerejeiras no Japão",
        caption: "Início de abril",
      },
    ],
  },
  {
    id: "okayama",
    city: "Okayama",
    jp: "岡山",
    region: "Chūgoku",
    days: "data a cravar",
    dayLabel: "Dia 6 · tarde",
    coords: [133.9195, 34.6551],
    places: [topic("okayama-kibitsu", "Kibitsu Jinja (Sanbi Ichinomiya)")],
    indicacoes: [],
    description:
      "O mesmo dia continua para Okayama. Kibitsu Jinja guarda um dos corredores de madeira mais longos do Japão — um santuário que a gente escolheu de propósito, não por estar no folder.",
    photos: [
      {
        src: "images/chugoku/shrine.jpg",
        alt: "Santuário japonês",
        caption: "Kibitsu Jinja",
      },
      {
        src: "images/chugoku/okayama-street.jpg",
        alt: "Rua tradicional no Japão",
        caption: "Okayama",
      },
    ],
  },
  {
    id: "kumamoto",
    city: "Kumamoto",
    jp: "熊本",
    region: "Kyūshū",
    days: "data a cravar",
    dayLabel: "Dias 7–8 no Japão",
    coords: [130.7079, 32.8032],
    places: [
      topic("kumamoto-aso", "Aso Nakadake ou Unzen-Amakusa"),
      topic("kumamoto-estatuas", "Estátuas"),
      topic("kumamoto-castle", "Kumamoto Castle Hall"),
    ],
    indicacoes: [],
    description:
      "O salto para o sul. Dois dias em Kyūshū: vulcão (Aso ou Unzen), estátuas, e o castelo. É o ponto mais longe do resto do roteiro — o mapa acende inteiro embaixo, e a gente some um pouco do Honshu.",
    photos: [
      {
        src: "images/kyushu/kumamoto-volcano.jpg",
        alt: "Paisagem vulcânica no Japão",
        caption: "Aso / Unzen",
      },
      {
        src: "images/kyushu/kumamoto-castle.jpg",
        alt: "Castelo japonês",
        caption: "Kumamoto",
      },
    ],
  },
  {
    id: "kyoto",
    city: "Quioto",
    jp: "京都",
    region: "Kansai",
    days: "data a cravar",
    dayLabel: "Dias 9–10 no Japão",
    coords: [135.7681, 35.0116],
    places: [
      topic("kyoto-castle", "Castelo"),
      topic("kyoto-templos", "Templos e o resto ainda em aberto"),
    ],
    indicacoes: [],
    description:
      "Volta ao Kansai, agora no ritmo certo. Dois dias de Quioto com o castelo no centro do rascunho — Fushimi, Arashiyama, Gion e o que mais couber vão entrar aqui com o tempo.",
    photos: [
      {
        src: "images/kansai/fushimi-inari.jpg",
        alt: "Torii de Fushimi Inari",
        caption: "Fushimi Inari",
      },
      {
        src: "images/kansai/kyoto-temple.jpg",
        alt: "Templo em Quioto",
        caption: "Quioto",
      },
    ],
  },
  {
    id: "nara",
    city: "Nara",
    jp: "奈良",
    region: "Kansai",
    days: "data a cravar",
    dayLabel: "Dia 11 no Japão",
    coords: [135.8048, 34.6851],
    places: [
      topic("nara-veados", "Ver os veados"),
      topic("nara-parque", "Parque e templos"),
    ],
    indicacoes: [],
    description:
      "Um dia só para Nara. Veados no parque, Tōdai-ji se a gente chegar cedo, e a sensação de que o Japão antigo ainda cabe numa tarde.",
    photos: [
      {
        src: "images/kansai/nara-temple.jpg",
        alt: "Templo em Nara",
        caption: "Nara",
      },
      {
        src: "images/chugoku/himeji-castle.jpg",
        alt: "Paisagem tradicional",
        caption: "Kansai",
      },
    ],
  },
  {
    id: "kyoto-2",
    city: "Quioto de novo",
    jp: "京都",
    region: "Kansai",
    days: "data a cravar",
    dayLabel: "Dia 12 no Japão",
    coords: [135.7681, 35.0116],
    places: [topic("kyoto2-nova", "Nova Quioto — o que ainda não vimos")],
    indicacoes: [],
    description:
      "Volta para fechar o que ficou. No rascunho isso se chama só “Nova Quioto”: o dia extra para não sair da cidade com a sensação de que a gente correu.",
    photos: [
      {
        src: "images/kansai/cherry-blossoms.jpg",
        alt: "Cerejeiras em Quioto",
        caption: "Ainda Quioto",
      },
      {
        src: "images/kansai/fushimi-inari.jpg",
        alt: "Caminho de torii",
        caption: "O que faltar",
      },
    ],
  },
  {
    id: "takayama",
    city: "Takayama",
    jp: "高山",
    region: "Alpes",
    days: "data a cravar",
    dayLabel: "Dia 13 no Japão",
    coords: [137.2522, 36.1461],
    places: [topic("takayama-tudo", "A cidade inteira")],
    indicacoes: [],
    description:
      "Sobe para as montanhas. Takayama é rua de madeira, manhã fria e a porta dos Alpes. No roteiro está escrito “tudo” — o que, neste caso, é o elogio certo.",
    photos: [
      {
        src: "images/chugoku/shrine.jpg",
        alt: "Rua tradicional nas montanhas",
        caption: "Takayama",
      },
      {
        src: "images/alpes/alps.jpg",
        alt: "Montanhas",
        caption: "Alpes japoneses",
      },
    ],
  },
  {
    id: "alpine",
    city: "Tateyama Kurobe",
    jp: "立山黒部",
    region: "Alpes",
    days: "data a cravar",
    dayLabel: "Dia 14 no Japão",
    coords: [137.566, 36.566],
    places: [
      topic("alpine-route", "Alpine Route"),
      topic("alpine-nagano", "Nagano no mesmo dia"),
    ],
    indicacoes: [],
    description:
      "A travessia. Em abril o corredor de neve da Alpine Route ainda está de pé — ônibus, funicular, e a sensação de atravessar o Japão pelo teto. No fim do dia, Nagano.",
    photos: [
      {
        src: "images/alpes/alpine-route.jpg",
        alt: "Montanhas com neve",
        caption: "Alpine Route",
      },
      {
        src: "images/alpes/alpine-snow.jpg",
        alt: "Paisagem alpina",
        caption: "Neve em abril",
      },
    ],
  },
  {
    id: "nagano",
    city: "Nagano",
    jp: "長野",
    region: "Alpes",
    days: "data a cravar",
    dayLabel: "Dia 14 · noite",
    coords: [138.195, 36.6485],
    places: [topic("nagano-cidade", "Ver o que der na cidade")],
    indicacoes: [],
    description:
      "Chegada sem lista rígida. Templo Zenko-ji se couber, um jantar quente, e dormir antes de descer para Tóquio.",
    photos: [
      {
        src: "images/kansai/nara-temple.jpg",
        alt: "Templo no interior do Japão",
        caption: "Nagano",
      },
      {
        src: "images/kanto/fuji.jpg",
        alt: "Horizonte montanhoso",
        caption: "Interior",
      },
    ],
  },
  {
    id: "tokyo",
    city: "Tóquio",
    jp: "東京",
    region: "Kantō",
    days: "até 22 abr",
    dayLabel: "Dias 15–23 no Japão",
    coords: [139.6503, 35.6762],
    places: [
      topic("tokyo-shibuya", "Shibuya"),
      topic("tokyo-palace", "Palácio → Shinjuku"),
      topic("tokyo-akihabara", "Akihabara e região"),
      topic("tokyo-fuji-day", "Fuji (solo ou trilha)"),
      topic("tokyo-livre", "Dia livre"),
      topic("tokyo-compras", "Compras e eletrônicos"),
      topic("tokyo-extra-1", "A preencher"),
      topic("tokyo-extra-2", "A preencher"),
      topic("tokyo-volta", "22 abr — ir embora", {
        notes:
          "Este é o dia fixo: saída do Japão pelo calendário japonês. Horário do voo de volta ainda entra aqui.",
        hours: "Horário do voo a cravar",
      }),
    ],
    indicacoes: [],
    description:
      "Nove dias para caber uma cidade que não cabe. Shibuya, o palácio caminhando até Shinjuku, Akihabara, um dia de Fuji, um dia livre, o ritual das compras, e dois dias ainda em branco. No dia 22, pelo calendário japonês, a gente vai embora.",
    photos: [
      {
        src: "images/kanto/tokyo-shibuya.jpg",
        alt: "Cruzamento de Shibuya",
        caption: "Shibuya",
      },
      {
        src: "images/kanto/tokyo-night.jpg",
        alt: "Tóquio à noite",
        caption: "Tóquio",
      },
    ],
  },
  {
    id: "fuji",
    city: "Fuji",
    jp: "富士山",
    region: "Kantō",
    days: "durante Tóquio",
    dayLabel: "Dia 18 no Japão",
    coords: [138.7274, 35.3606],
    places: [
      topic("fuji-dia", "Dia no Fuji"),
      topic("fuji-trilha", "Trilha ou só olhar"),
    ],
    indicacoes: [],
    description:
      "Um dia só para a montanha. Ainda vamos decidir se é trilha (Komosawa) ou se é só ficar olhando. Em abril o cume continua branco. De qualquer jeito, o mapa acende aqui.",
    photos: [
      {
        src: "images/kanto/fuji.jpg",
        alt: "Monte Fuji",
        caption: "Fuji-san",
      },
      {
        src: "images/chugoku/shrine.jpg",
        alt: "Paisagem ao redor do Fuji",
        caption: "O dia fora da cidade",
      },
    ],
  },
];
