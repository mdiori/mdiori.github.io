const TRIP_START = "2027-03-31T00:00:00-03:00";

const ISLANDS = {
  hokkaido: [
    [140.1, 41.55], [140.7, 42.3], [141.4, 42.5], [143.2, 42.1],
    [145.55, 43.35], [145.8, 43.9], [145.1, 44.45], [143.2, 44.35],
    [141.65, 45.4], [141.2, 45.4], [140.05, 43.4], [139.75, 42.15],
    [140.0, 41.65],
  ],
  honshu: [
    [130.95, 33.95], [131.5, 34.05], [132.1, 33.9], [132.8, 34.05],
    [133.5, 34.3], [134.6, 34.35], [135.0, 34.4], [135.25, 34.55],
    [135.15, 34.2], [135.05, 33.75], [135.4, 33.43], [135.78, 33.43],
    [136.05, 33.85], [136.75, 34.25], [137.2, 34.55], [137.95, 34.65],
    [138.85, 34.6], [139.08, 34.58], [139.18, 35.05], [139.5, 35.22],
    [139.78, 35.25], [139.85, 35.6], [140.1, 35.15], [140.4, 35.25],
    [140.55, 35.7], [140.75, 35.85], [140.9, 36.55], [140.95, 37.5],
    [141.05, 38.25], [141.55, 38.55], [141.7, 39.0], [142.05, 39.65],
    [141.95, 40.35], [141.7, 40.9], [141.5, 41.48], [141.15, 41.55],
    [140.9, 41.25], [140.35, 41.55], [139.85, 40.65], [139.75, 39.7],
    [139.5, 38.75], [139.3, 37.9], [138.25, 37.15], [137.05, 37.55],
    [136.75, 37.15], [136.9, 36.35], [136.0, 35.95], [135.15, 35.55],
    [134.3, 35.55], [133.05, 35.55], [132.2, 35.35], [131.4, 34.8],
    [130.85, 34.35],
  ],
  shikoku: [
    [132.55, 34.0], [133.3, 34.4], [134.3, 34.4], [134.75, 33.85],
    [134.2, 33.0], [132.95, 32.72], [132.35, 32.9], [132.4, 33.55],
  ],
  kyushu: [
    [130.35, 33.88], [131.0, 33.7], [131.8, 33.45], [131.75, 32.7],
    [131.5, 31.55], [131.2, 31.2], [130.65, 31.15], [130.35, 31.35],
    [129.75, 31.7], [129.55, 32.75], [129.85, 33.25], [130.2, 33.6],
  ],
};

const STOPS = [
  {
    id: "osaka",
    city: "Osaka",
    jp: "大阪",
    region: "Kansai",
    days: "31 mar – 3 abr",
    dayLabel: "Dias 1–4",
    coords: [135.5023, 34.6937],
    places: [
      "Universal Studios Japan",
      "Aquário Kaiyukan",
      "Shitennō-ji",
      "Tsūtenkaku",
      "Dōtonbori",
      "Castelo de Osaka",
      "Umeda Sky Building",
      "Dia 4 ainda a preencher",
    ],
    description:
      "A viagem começa no neon. Universal no primeiro dia, depois o aquário, o templo mais antigo do Japão, a torre de Tsūtenkaku e o caos gostoso de Dōtonbori. No terceiro dia sobe o castelo e o Umeda Sky. O quarto dia ainda está em branco — e tudo bem.",
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
    days: "4 abr",
    dayLabel: "Dia 5",
    coords: [135.1956, 34.6901],
    places: ["A preencher", "Akashi — talvez"],
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
    days: "5 abr",
    dayLabel: "Dia 6 · manhã",
    coords: [134.6856, 34.8394],
    places: ["Castelo da Garça Branca"],
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
    days: "5 abr",
    dayLabel: "Dia 6 · tarde",
    coords: [133.9195, 34.6551],
    places: ["Kibitsu Jinja (Sanbi Ichinomiya)"],
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
    days: "6–7 abr",
    dayLabel: "Dias 7–8",
    coords: [130.7079, 32.8032],
    places: [
      "Aso Nakadake ou Unzen-Amakusa",
      "Estátuas",
      "Kumamoto Castle Hall",
    ],
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
    days: "8–9 abr",
    dayLabel: "Dias 9–10",
    coords: [135.7681, 35.0116],
    places: ["Castelo", "Templos e o resto ainda em aberto"],
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
    days: "10 abr",
    dayLabel: "Dia 11",
    coords: [135.8048, 34.6851],
    places: ["Ver os veados", "Parque e templos"],
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
    days: "11 abr",
    dayLabel: "Dia 12",
    coords: [135.7681, 35.0116],
    places: ["Nova Quioto — o que ainda não vimos"],
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
    days: "12 abr",
    dayLabel: "Dia 13",
    coords: [137.2522, 36.1461],
    places: ["A cidade inteira"],
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
    days: "13 abr",
    dayLabel: "Dia 14",
    coords: [137.566, 36.566],
    places: ["Alpine Route", "Nagano no mesmo dia"],
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
    days: "13 abr",
    dayLabel: "Dia 14 · noite",
    coords: [138.195, 36.6485],
    places: ["Ver o que der na cidade"],
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
    days: "14–22 abr",
    dayLabel: "Dias 15–23",
    coords: [139.6503, 35.6762],
    places: [
      "Shibuya",
      "Palácio → Shinjuku",
      "Akihabara e região",
      "Fuji (solo ou trilha)",
      "Dia livre",
      "Compras e eletrônicos",
      "A preencher",
      "A preencher",
      "22 abr — ir embora",
    ],
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
    days: "17 abr",
    dayLabel: "Dia 18",
    coords: [138.7274, 35.3606],
    places: ["Dia no Fuji", "Trilha ou só olhar"],
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
