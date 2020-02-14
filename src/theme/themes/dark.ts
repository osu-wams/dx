import { ThemeConfiguration, Color, shadows, gradients } from '..';

const neutral100 = Color['neutral-900'];
const neutral200 = Color['neutral-800'];
const neutral300 = Color['neutral-700'];
const neutral400 = Color['neutral-600'];
const neutral500 = Color['neutral-550'];
const neutral550 = Color['neutral-500'];
const neutral600 = Color['neutral-400'];
const neutral700 = Color['neutral-300'];
const neutral800 = Color['neutral-200'];

const bodyText = neutral700;
const bodyBackground = neutral200;
const primary = Color['orange-400'];
const alert = Color['lava-400'];
const warn = Color['luminance-300'];
const info = Color['stratosphere-400'];
const success = Color['pine-400'];
const mainGridBackground = neutral100;
const mainGridBorderTop = neutral200;
const secondGridBackground = neutral200;
const secondGridBorderTop = neutral300;
const componentBackground = neutral300;
const linkForeground = Color.white;
const iconPrimary = Color.white;
const iconSecondary = Color.black;
const buttonPrimary = Color.white;
const buttonSecondary = Color.black;
const titlePrimary = Color.white;
const titleSecondary = Color.black;

export const dark: ThemeConfiguration = {
  body: {
    color: bodyText,
    background: bodyBackground
  },
  header: {
    background: componentBackground,
    userButton: {
      background: Color.transparent,
      color: neutral550
    },
    headerNavList: {
      background: neutral800,
      color: linkForeground,
      svg: {
        color: primary
      },
      menuItem: {
        borderTop: neutral500
      },
      menuItemSelected: {
        color: bodyText,
        background: Color.transparent
      }
    },
    mainNavList: {
      background: Color.transparent,
      color: neutral550,
      hoverColor: primary,
      popOver: {
        background: neutral800,
        primaryNav: {
          color: linkForeground,
          link: {
            color: linkForeground,
            svg: {
              color: primary
            }
          }
        },
        secondaryNav: {
          background: neutral700,
          borderTop: neutral500,
          link: {
            color: linkForeground,
            svg: {
              color: iconPrimary
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
      background: alert,
      color: linkForeground,
      icon: {
        color: iconPrimary
      }
    },
    dx: {
      info: {
        background: info,
        color: linkForeground,
        icon: {
          color: iconPrimary
        }
      },
      warn: {
        background: warn,
        color: titleSecondary,
        icon: {
          color: titleSecondary
        }
      }
    }
  },
  mainGrid: {
    background: mainGridBackground,
    borderTop: mainGridBorderTop
  },
  secondGrid: {
    background: secondGridBackground,
    borderTop: secondGridBorderTop
  },
  footer: {
    background: titleSecondary,
    color: linkForeground,
    link: {
      color: linkForeground
    },
    iconLink: {
      border: neutral400,
      color: linkForeground,
      icon: {
        color: primary
      }
    },
    adminText: {
      color: neutral500
    },
    masquerade: {
      background: Color.transparent,
      color: iconPrimary
    }
  },
  pageNotFound: {
    link: {
      background: primary,
      color: linkForeground
    }
  },
  features: {
    academics: {
      courses: {
        header: {
          color: neutral600
        },
        sectionHeader: {
          color: neutral550
        },
        emptyList: {
          text: {
            color: neutral550
          },
          link: {
            color: primary
          }
        },
        dayList: {
          borderBottom: neutral200,
          dayInFocus: {
            borderBottom: neutral300
          },
          daySelected: {
            borderBottom: primary
          },
          dayIndicator: {
            color: primary
          },
          dayOfWeek: {
            color: neutral550
          },
          dayOfWeekSelected: {
            color: primary
          },
          dayOfMonth: {
            color: neutral700,
            borderBottom: Color.transparent
          },
          dayOfMonthSelected: {
            color: primary,
            borderBottom: primary
          }
        },
        dialog: {
          meetingTime: {
            icon: {
              color: neutral600
            }
          },
          faculty: {
            link: {
              color: primary
            },
            icon: {
              color: primary
            }
          },
          map: {
            link: {
              color: primary
            },
            icon: {
              color: primary
            }
          }
        },
        list: {
          title: {
            color: neutral700
          }
        },
        plannerItems: {
          list: {
            icon: {
              color: primary
            }
          },
          emptyText: {
            color: neutral550
          }
        }
      },
      pastCourses: {
        title: {
          color: neutral700
        },
        grade: {
          color: primary
        },
        search: {
          icon: {
            color: neutral600
          }
        }
      }
    },
    beta: {
      title: {
        color: primary
      },
      releaseNotes: {
        title: {
          color: primary
        },
        subTitle: {
          color: neutral550
        }
      },
      resources: {
        icon: {
          color: primary
        }
      }
    },
    canvas: {
      authorizeButton: {
        background: info,
        color: iconPrimary
      }
    },
    finances: {
      accountBalance: {
        emphasis: {
          color: neutral550
        }
      },
      mealPlans: {
        emphasisBalance: {
          color: success
        },
        emphasisNoBalance: {
          color: alert
        }
      },
      transactions: {
        amount: {
          color: success
        },
        amountCharge: {
          color: alert
        },
        name: {
          color: neutral700
        },
        detail: {
          color: neutral550
        },
        emptyText: {
          color: neutral550
        }
      }
    },
    itStatus: {
      item: {
        emptyText: {
          color: neutral550
        },
        name: {
          color: neutral700
        },
        status: {
          color: neutral550
        },
        icon: {
          unknown: neutral500,
          operational: Color['pine-300'],
          performanceIssues: Color['luminance-400'],
          partialOutage: Color['luminance-400'],
          majorOutage: Color['lava-400']
        }
      },
      sticky: {
        message: {
          color: neutral550
        },
        title: {
          color: neutral600
        },
        date: {
          color: neutral700
        },
        icon: {
          color: alert
        },
        badge: {
          background: neutral550,
          color: titlePrimary
        }
      }
    },
    masquerade: {
      buttonAlt: {
        color: neutral700,
        background: neutral200
      }
    },
    profile: {
      name: {
        color: primary
      },
      detail: {
        color: neutral550
      },
      icon: {
        color: primary
      },
      settings: {
        emphasis: {
          color: primary
        }
      }
    },
    resources: {
      name: {
        color: neutral700
      },
      icon: {
        color: iconSecondary
      },
      search: {
        input: {
          background: componentBackground
        },
        border: neutral200
      }
    }
  },
  ui: {
    button: {
      background: primary,
      color: buttonPrimary,
      close: {
        background: Color.transparent,
        color: buttonSecondary
      },
      custom: {
        background: componentBackground,
        selectedBackground: neutral550,
        border: neutral300,
        color: buttonSecondary,
        selectedColor: buttonPrimary
      },
      info: {
        background: Color.transparent,
        icon: {
          color: neutral600
        }
      }
    },
    card: {
      boxShadow: shadows[1],
      background: componentBackground,
      badge: {
        background: primary,
        color: buttonPrimary
      },
      contentRow: {
        background: componentBackground,
        borderBottom: neutral200
      },
      contentCell: {
        borderLeft: neutral200
      },
      header: {
        borderBottom: neutral200
      },
      icon: {
        color: neutral550
      }
    },
    date: {
      color: primary
    },
    divider: {
      border: neutral200
    },
    eventCard: {
      color: neutral600,
      background: componentBackground,
      title: {
        color: neutral700
      },
      largeTitle: {
        color: titlePrimary
      },
      date: {
        background: componentBackground,
        firstChild: {
          color: neutral700
        },
        lastChild: {
          color: neutral700
        }
      },
      image: {
        background: gradients[1],
        color: linkForeground,
        title: {
          color: titlePrimary
        }
      },
      button: {
        color: buttonPrimary,
        icon: {
          color: iconPrimary
        }
      }
    },
    highlights: {
      card: {
        border: neutral200
      },
      description: {
        color: neutral550
      },
      emphasis: {
        color: primary
      },
      emphasisInline: {
        color: primary
      },
      title: {
        color: neutral550
      }
    },
    icon: {
      background: Color.transparent,
      color: neutral400,
      counter: {
        background: primary,
        color: titlePrimary
      }
    },
    input: {
      border: neutral300,
      default: {
        color: neutral700
      },
      large: {
        color: neutral700
      },
      small: {
        color: info
      }
    },
    label: {
      color: neutral700
    },
    link: {
      background: Color.transparent,
      color: primary,
      icon: {
        external: {
          color: primary
        },
        internal: {
          color: primary
        }
      }
    },
    list: {
      color: neutral700,
      item: {
        background: Color.transparent,
        header: {
          color: neutral700
        },
        leadText: {
          color: primary
        },
        description: {
          color: neutral550
        },
        link: {
          color: neutral700,
          hoverColor: primary,
          boxShadow: shadows[1]
        }
      }
    },
    myDialog: {
      background: componentBackground,
      h2: {
        color: primary
      },
      h3: {
        color: neutral200
      },
      header: {
        border: neutral200
      },
      details: {
        color: neutral600
      }
    },
    siteTitle: {
      color: neutral600,
      badge: {
        background: info,
        color: buttonPrimary
      }
    },
    pageTitle: {
      color: neutral600
    },
    plainCard: {
      header: {
        color: neutral550
      }
    },
    subNav: {
      link: {
        borderBottom: Color.transparent,
        color: neutral600,
        svg: {
          color: neutral600
        },
        currentSvg: {
          borderBottom: primary
        }
      }
    },
    table: {
      border: 'rgba(34, 36, 38, 0.15)',
      color: neutral600,
      cell: {
        color: neutral550,
        borderBottom: 'rgba(34, 36, 38, 0.15)',
        notFirstChild: {
          borderLeft: 'rgba(34, 36, 38, 0.15)'
        }
      },
      row: {
        borderTop: 'rgba(34, 36, 38, 0.15)',
        stripedEvenChildren: {
          background: '#f9fafb'
        }
      }
    }
  }
};

export default dark;
