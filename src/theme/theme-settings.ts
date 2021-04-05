export const shadows = {
  1: 'rgba(66, 62, 60, 0.1) 0px 10px 16px, rgba(105, 99, 97, 0.05) 0px 3px 16px',
  2: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  3: '0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
  4: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
};

export const gradients = {
  1: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55))',
};

export const breakpoints = {
  xs: '500px', //larger than portrait phone
  small: '768px',
  medium: '992px',
  large: '1200px',
  headerSearch: '1500px',
  xl: '1800px',
};

export const mq = {
  xs: `@media (min-width: ${breakpoints.xs}) and (max-width: 767px)`, //iPad mini
  small: `@media(min-width: ${breakpoints.small})`,
  medium: `@media(min-width: ${breakpoints.medium})`,
  large: `@media(min-width: ${breakpoints.large})`,
};

// All theme spacing changes based on this
const unit = 8;

export const spacing = {
  unit, // keep unit for the rare math need
  xs: unit / 4 + 'px',
  small: unit / 2 + 'px',
  medium: unit + 'px',
  xm: unit * 1.5 + 'px',
  default: unit * 2 + 'px',
  large: unit * 3 + 'px',
  xl: unit * 4 + 'px',
  // Convenience methods for phone and desktop. Identical to 'default' and 'xl'
  mobile: unit * 2 + 'px',
  desktop: unit * 4 + 'px',
};

export const borderRadius = {
  '4': '4px',
  '8': '8px',
  '16': '16px',
};

export const fontSize = {
  '10': '1rem',
  '12': '1.2rem',
  '14': '1.4rem',
  '15': '1.5rem',
  '16': '1.6rem',
  '18': '1.8rem',
  '20': '2.0rem',
  '24': '2.4rem',
  '26': '2.6rem',
  '36': '3.6rem',
  '58': '5.8rem',
};
