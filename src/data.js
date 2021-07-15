export const gamePhases = ['strategy', 'action', 'status', 'agenda'];

export const strategyCards = [
  {
    initiative: 1,
    name: 'leadership',
    primaryText: [
      'Gain 3 command tokens',
      'Spend any amount of influence to gain 1 command token for every 3 influence spent',
    ],
    secondaryText: [
      'Spend any amount of influence to gain 1 command token for every 3 influence spent',
    ],
  },
  {
    initiative: 2,
    name: 'diplomacy',
    primaryText: [
      'Choose 1 system other than the Mecatol Rex system that contains a planet you control; each other player places a command token from their reinforcements in the chosen system. Then, ready up to 2 exhausted planets you control',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool to ready up to 2 exhausted planets you control',
    ],
  },
  {
    initiative: 3,
    name: 'politics',
    primaryText: [
      'Choose a player other than the speaker; that player gains the speaker token',
      'Draw 2 action cards',
      'Look at the top 2 cards of the agenda deck; place each card on the top or bottom of the deck in any order',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool to draw 2 action cards',
    ],
  },
  {
    initiative: 4,
    name: 'construction',
    primaryText: [
      'Place 1 PDS or 1 Space Dock on a planet you control',
      'Place 1 PDS on a planet you control',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool and place it in any system; you may place either 1 space dock or 1 PDS on a planet you control in that system',
    ],
  },
  {
    initiative: 5,
    name: 'trade',
    primaryText: [
      'Gain 3 trade goods',
      'Replenish commodities',
      'Choose any number of other players; those players use the secondary ability of this strategy card without spending a command token',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool to replenish your commodities',
    ],
  },
  {
    initiative: 6,
    name: 'warfare',
    primaryText: [
      'Remove 1 of your command tokens from the game board; then, gain 1 command token',
      'Redistribute any number of the command tokens on your command sheet',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool to use the Production ability of 1 of your space docks in your home system (This token is not placed in your home system)',
    ],
  },
  {
    initiative: 7,
    name: 'technology',
    primaryText: [
      'Research 1 technology',
      'Spend 6 resources to research 1 technology',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool and 4 resources to research 1 technology',
    ],
  },
  {
    initiative: 8,
    name: 'imperial',
    primaryText: [
      'Immediately score 1 public objective if you fulfill its requirements',
      'Gain 1 victory point if you control Mecatol Rex; otherwise, draw 1 secret objective',
    ],
    secondaryText: [
      'Spend 1 token from your strategy pool to draw 1 secret objective',
    ],
  },
];

export const playerColors = [
  { color: 'black', set: 'core' },
  { color: 'red', set: 'core' },
  { color: 'yellow', set: 'core' },
  { color: 'green', set: 'core' },
  { color: 'blue', set: 'core' },
  { color: 'purple', set: 'core' },
  { color: 'orange', set: 'pok' },
  { color: 'pink', set: 'pok' },
];

export const playerFactions = [
  {
    name: 'The Arborec',
    shortName: 'arborec',
    set: 'core',
    colors: { green: 1.6, black: 0.1, yellow: 0.1, blue: 0.1 },
  },
  {
    name: 'The Barony of Letnev',
    shortName: 'letnev',
    set: 'core',
    colors: { red: 0.95, black: 0.8, blue: 0.1 },
  },
  {
    name: 'The Clan of Saar',
    shortName: 'saar',
    set: 'core',
    colors: { orange: 0.85, green: 0.5, yellow: 0.4 },
  },
  {
    name: 'The Embers of Muaat',
    shortName: 'muaat',
    set: 'core',
    colors: { red: 1.25, orange: 0.65 },
  },
  {
    name: 'The Emirates of Hacan',
    shortName: 'hacan',
    set: 'core',
    colors: { yellow: 1.2, orange: 0.7 },
  },
  {
    name: 'The Federation of Sol',
    shortName: 'sol',
    set: 'core',
    colors: { blue: 1.15, yellow: 0.75 },
  },
  {
    name: 'The Ghosts of Creuss',
    shortName: 'creuss',
    set: 'core',
    colors: { blue: 1.7, black: 0.1, purple: 0.1 },
  },
  {
    name: 'The L1Z1X Mindnet',
    shortName: 'l1z1x',
    set: 'core',
    colors: { black: 0.7, blue: 0.6, red: 0.6 },
  },
  {
    name: 'The Mentak Coalition',
    shortName: 'mentak',
    set: 'core',
    colors: { orange: 0.95, black: 0.5, yellow: 0.45 },
  },
  {
    name: 'The Naalu Collective',
    shortName: 'naalu',
    set: 'core',
    colors: { green: 1.15, yellow: 0.45, orange: 0.3 },
  },
  {
    name: 'The Nekro Virus',
    shortName: 'nekro',
    set: 'core',
    colors: { red: 1.75, black: 0.15 },
  },
  {
    name: "Sardakk N'orr",
    shortName: 'sardakk',
    set: 'core',
    colors: { black: 1, red: 0.9 },
  },
  {
    name: 'The Universities of Jol-Nar',
    shortName: 'jol-nar',
    set: 'core',
    colors: { blue: 1.6, purple: 0.3 },
  },
  {
    name: 'The Winnu',
    shortName: 'winnu',
    set: 'core',
    colors: { orange: 0.75, purple: 0.6, yellow: 0.55 },
  },
  {
    name: 'The Xxcha Kingdom',
    shortName: 'xxcha',
    set: 'core',
    colors: { green: 1.1, blue: 0.8 },
  },
  {
    name: 'The Yin Brotherhood',
    shortName: 'yin',
    set: 'core',
    colors: { purple: 1.05, black: 0.6, yellow: 0.25 },
  },
  {
    name: 'The Yssaril Tribes',
    shortName: 'yssaril',
    set: 'core',
    colors: { green: 0.93, yellow: 0.63, red: 0.25, black: 0.1 },
  },
  {
    name: 'The Argent Flight',
    shortName: 'argent',
    set: 'pok',
    colors: { orange: 1.6, blue: 0.15, green: 0.15 },
  },
  {
    name: 'The Empyrean',
    shortName: 'empyrean',
    set: 'pok',
    colors: { purple: 1.6, red: 0.15, pink: 0.15 },
  },
  {
    name: 'The Mahact Gene Sorcerers',
    shortName: 'mahact',
    set: 'pok',
    colors: { yellow: 1.6, purple: 0.3 },
  },
  {
    name: 'The Naaz-Rokha Alliance',
    shortName: 'naaz-rokha',
    set: 'pok',
    colors: { green: 1.6, yellow: 0.3 },
  },
  {
    name: 'The Nomad',
    shortName: 'nomad',
    set: 'pok',
    colors: { blue: 1.5, purple: 0.65 },
  },
  {
    name: 'The Titans of Ul',
    shortName: 'ul',
    set: 'pok',
    colors: { magenta: 1.9 },
  },
  {
    name: "The Vuil'Raith Cabal",
    shortName: 'vuil-raith',
    set: 'pok',
    colors: { red: 1.35, black: 0.4, pink: 0.1 },
  },
];
