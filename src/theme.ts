export enum Color {
  'transparent' = 'transparent',
  'white' = '#ffffff',
  'black' = '#000000',
  // Neutral Palette
  'neutral-100' = '#F7F5F5', // only use as an off white background
  'neutral-200' = '#E9E5E4', // use as a light gray background with dark text
  'neutral-300' = '#D4CFCD', // use as a gray background with very dark text
  'neutral-400' = '#B7B1AF', // use carefully
  'neutral-500' = '#8F8582', // minimum contrast for dark ui (non-text) elements on white - WCAG 2.1
  'neutral-550' = '#7B746F', // minimum contrast for dark text with white background
  'neutral-600' = '#696361', // minimum for dark text with background up to neutral-200
  'neutral-700' = '#423E3C', // use as a text color for backgrounds as dark as neutral-400
  // Primary
  'orange-100' = '#FFE7DE',
  'orange-200' = '#F79572',
  'orange-300' = '#E85F2E',
  'orange-400' = '#D73F09', // Base shade
  'orange-500' = '#B22F00',
  'orange-600' = '#7D2100',
  'orange-700' = '#611A00',
  // Accents
  'stratosphere-100' = '#ECF1F4',
  'stratosphere-200' = '#C6DAE7',
  'stratosphere-300' = '#2490B5',
  'stratosphere-400' = '#006A8E', // Base shade
  'stratosphere-500' = '#005875',
  'stratosphere-600' = '#003B5C',
  'stratosphere-700' = '#002235',
  'pine-100' = '#EDF3E3',
  'pine-200' = '#C4D6A4',
  'pine-300' = '#73A663',
  'pine-400' = '#4A773C', // Base shade
  'pine-500' = '#3C692E',
  'pine-600' = '#254A1A',
  'pine-700' = '#142E0C',
  'lava-400' = '#C72127'
}

export const shadows = {
  1: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  2: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  3: '0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
  4: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
};

export const breakpoints = {
  '768': '768px',
  '1024': '1024px'
};

export const theme = {
  spacing: {
    unit: 8
  },
  widths: {
    contentMax: '1024px'
  },
  borderRadius: '8px',
  fontSize: {
    '12': '1.2rem',
    '14': '1.4rem',
    '15': '1.5rem',
    '16': '1.6rem',
    '18': '1.8rem',
    '20': '2.0rem',
    '24': '2.4rem'
  }
};

//export default theme;
