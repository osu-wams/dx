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
  'neutral-800' = '#2E2B2A',
  'neutral-900' = '#1F1D1C',
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
  'lava-400' = '#C72127',
  'luminance-300' = '#FFCE57',
  'roguewave-400' = '#00859B'
}

export const shadows = {
  1: 'rgba(66, 62, 60, 0.1) 0px 10px 16px, rgba(105, 99, 97, 0.05) 0px 3px 16px',
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
    unit: 8,
    mobile: '1rem', // padding/padding or row/column gaps
    desktop: '3rem'
  },
  widths: {
    contentMax: '1024px'
  },
  borderRadius: {
    '8': '8px',
    '16': '16px'
  },
  fontSize: {
    '12': '1.2rem',
    '14': '1.4rem',
    '15': '1.5rem',
    '16': '1.6rem',
    '18': '1.8rem',
    '20': '2.0rem',
    '24': '2.4rem',
    '36': '3.6rem',
    '58': '5.8rem'
  }
};

export interface ThemeConfiguration {
  header: {
    background: string;
    userButton: {
      background: string;
      color: string;
    };
    profileMenuList: {
      background: string;
      color: string;
      svg: {
        color: string;
      };
      menuItem: {
        borderTop: string;
      };
      menuItemSelected: {
        background: string;
      };
    };
    mainNavList: {
      background: string;
      color: string;
      hoverColor: string;
      popOver: {
        background: string;
        primaryNav: {
          color: string;
          link: {
            color: string;
            svg: {
              color: string;
            };
          };
        };
        secondaryNav: {
          background: string;
          borderTop: string;
          link: {
            color: string;
            svg: {
              color: string;
            };
          };
        };
      };
    };
  };
  alert: {
    background: string;
    header: {
      badge: {
        background: string;
      };
    };
    rave: {
      background: string;
      color: string;
      icon: {
        color: string;
      };
    };
    dx: {
      info: {
        background: string;
        color: string;
        icon: {
          color: string;
        };
      };
      warn: {
        background: string;
        color: string;
        icon: {
          color: string;
        };
      };
    };
  };
  mainGrid: {
    background: string;
    borderBottom: string;
    borderTop: string;
  };
  secondGrid: {
    background: string;
  };
  footer: {
    background: string;
    color: string;
    link: {
      color: string;
    };
    iconLink: {
      border: string;
      color: string;
      icon: {
        color: string;
      };
    };
    adminText: {
      color: string;
    };
    masquerade: {
      background: string;
      color: string;
    };
  };
  ui: {
    customButton: {
      background: string;
      selectedBackground: string;
      border: string;
      color: string;
      selectedColor: string;
    };
    date: {
      color: string;
    };
    divider: {
      border: string;
    };
    eventCard: {
      color: string;
      background: string;
      title: {
        color: string;
      };
      largeTitle: {
        color: string;
      };
      date: {
        background: string;
        firstChild: {
          color: string;
        };
        lastChild: {
          color: string;
        };
      };
      image: {
        background: string;
        color: string;
        title: {
          color: string;
        };
      };
      button: {
        color: string;
        icon: {
          color: string;
        };
      };
    };
    highlights: {
      card: {
        border: string;
      };
      description: {
        color: string;
      };
      emphasis: {
        color: string;
      };
      emphasisInline: {
        color: string;
      };
      title: {
        color: string;
      };
    };
    icon: {
      background: string;
      color: string;
      counter: {
        background: string;
        color: string;
      };
    };
    input: {
      border: string;
      default: {
        color: string;
      };
      small: {
        color: string;
      };
    };
    label: {
      color: string;
    };
  };
}

export const lightTheme: ThemeConfiguration = {
  header: {
    background: Color.white,
    userButton: {
      background: Color.transparent,
      color: Color['neutral-550']
    },
    profileMenuList: {
      background: Color['neutral-800'],
      color: Color.white,
      svg: {
        color: Color['orange-400']
      },
      menuItem: {
        borderTop: Color['neutral-500']
      },
      menuItemSelected: {
        background: Color.transparent
      }
    },
    mainNavList: {
      background: Color.transparent,
      color: Color['neutral-550'],
      hoverColor: Color['orange-400'],
      popOver: {
        background: Color['neutral-800'],
        primaryNav: {
          color: Color.white,
          link: {
            color: Color.white,
            svg: {
              color: Color['orange-400']
            }
          }
        },
        secondaryNav: {
          background: Color['neutral-700'],
          borderTop: Color['neutral-500'],
          link: {
            color: Color.white,
            svg: {
              color: Color.white
            }
          }
        }
      }
    }
  },
  alert: {
    background: Color.transparent,
    header: {
      badge: {
        background: Color.transparent
      }
    },
    rave: {
      background: Color['lava-400'],
      color: Color.white,
      icon: {
        color: Color.white
      }
    },
    dx: {
      info: {
        background: Color['stratosphere-400'],
        color: Color.white,
        icon: {
          color: Color.white
        }
      },
      warn: {
        background: Color['luminance-300'],
        color: Color.black,
        icon: {
          color: Color.black
        }
      }
    }
  },
  mainGrid: {
    background: Color['neutral-100'],
    borderBottom: Color['neutral-300'],
    borderTop: Color['neutral-200']
  },
  secondGrid: {
    background: Color['neutral-200']
  },
  footer: {
    background: Color.black,
    color: Color.white,
    link: {
      color: Color.white
    },
    iconLink: {
      border: Color['neutral-400'],
      color: Color.white,
      icon: {
        color: Color['orange-400']
      }
    },
    adminText: {
      color: Color['neutral-500']
    },
    masquerade: {
      background: Color.transparent,
      color: Color.white
    }
  },
  ui: {
    customButton: {
      background: Color.white,
      selectedBackground: Color['neutral-550'],
      border: Color['neutral-300'],
      color: Color.black,
      selectedColor: Color.white
    },
    date: {
      color: Color['orange-400']
    },
    divider: {
      border: Color['neutral-200']
    },
    eventCard: {
      color: Color['neutral-600'],
      background: Color.white,
      title: {
        color: Color['neutral-700']
      },
      largeTitle: {
        color: Color.white
      },
      date: {
        background: Color.white,
        firstChild: {
          color: Color['neutral-700']
        },
        lastChild: {
          color: Color['neutral-700']
        }
      },
      image: {
        background: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55))',
        color: Color.white,
        title: {
          color: Color.white
        }
      },
      button: {
        color: Color.white,
        icon: {
          color: Color.white
        }
      }
    },
    highlights: {
      card: {
        border: Color['neutral-200']
      },
      description: {
        color: Color['neutral-550']
      },
      emphasis: {
        color: Color['orange-400']
      },
      emphasisInline: {
        color: Color['orange-400']
      },
      title: {
        color: Color['neutral-550']
      }
    },
    icon: {
      background: Color.transparent,
      color: Color['neutral-400'],
      counter: {
        background: Color['orange-400'],
        color: Color.white
      }
    },
    input: {
      border: Color['neutral-300'],
      default: {
        color: Color['neutral-700']
      },
      small: {
        color: Color['stratosphere-400']
      }
    },
    label: {
      color: Color['neutral-700']
    }
  }
};

//export default theme;
