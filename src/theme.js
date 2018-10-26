export const colors = {
  // OSU Brand Colours
  orange: '#d73f09',
  black: '#000000',
  white: '#ffffff',
  pineStand: '#4a773c',
  highTide: '#00859b',
  luminance: '#ffb500',
  stratosphere: '#006a8e',
  reindeerMoss: '#c4d6a4',
  seafoam: '#b8dde1',
  candela: '#fdd26e',
  moondust: '#c6dae7',
  hopBine: '#aa9d2e',
  rogueWave: '#0d5257',
  solarFlare: '#d3832b',
  starCanvas: '003b5c',
  till: '#b7a99a',
  coastline: '#a7aca2',
  highDesert: '#7a6855',
  crater: '#8e9089',
  // Web errors, gray scales
  lava: '#af292e',
  vulcan: '#e69198',
  basalt: '#5e131a',
  mist: '#f0f0f0',
  fog: '#e0e0e0',
  overcast: '#999',
  dusk: '#444',
  charcoal: '#252525'
};

const theme = {
  default: {
    fg: colors.black,
    bg: colors.white
  },
  mist: {
    fg: colors.charcoal,
    bg: colors.mist
  },
  primary: {
    fg: colors.white,
    bg: colors.orange
  },
  secondary: {
    fg: colors.white,
    bg: colors.black
  },
  academic: {
    fg: colors.white,
    bg: colors.stratosphere
  },
  finance: {
    fg: colors.white,
    bg: colors.pineStand
  },
  spacing: {
    unit: 8
  },
  rounded: {
    normal: '0.8rem',
    subtle: '0.3rem'
  },
  fontSize: {
    small: '1.4rem',
    normal: '1.6rem',
    large: '1.8rem'
  }
};

export default theme;
