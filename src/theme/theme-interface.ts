import baseStyled, { ThemedStyledInterface, ThemeContext as TS } from 'styled-components';

export interface ThemeConfiguration {
  body: {
    color: string;
    background: string;
  };
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
    borderTop: string;
  };
  secondGrid: {
    background: string;
    borderTop: string;
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
  pageNotFound: {
    link: {
      background: string;
      color: string;
    };
  };
  features: {
    academics: {
      courses: {
        header: {
          color: string;
        };
        sectionHeader: {
          color: string;
        };
        emptyList: {
          text: {
            color: string;
          };
          link: {
            color: string;
          };
        };
        dayList: {
          borderBottom: string;
          dayInFocus: {
            borderBottom: string;
          };
          daySelected: {
            borderBottom: string;
          };
          dayIndicator: {
            color: string;
          };
          dayOfWeek: {
            color: string;
          };
          dayOfWeekSelected: {
            color: string;
          };
          dayOfMonth: {
            color: string;
            borderBottom: string;
          };
          dayOfMonthSelected: {
            color: string;
            borderBottom: string;
          };
        };
        dialog: {
          meetingTime: {
            icon: {
              color: string;
            };
          };
          faculty: {
            link: {
              color: string;
            };
            icon: {
              color: string;
            };
          };
          map: {
            link: {
              color: string;
            };
            icon: {
              color: string;
            };
          };
        };
        list: {
          title: {
            color: string;
          };
        };
        plannerItems: {
          list: {
            icon: {
              color: string;
            };
          };
          emptyText: {
            color: string;
          };
        };
      };
      pastCourses: {
        title: {
          color: string;
        };
        grade: {
          color: string;
        };
        search: {
          icon: {
            color: string;
          };
        };
      };
    };
    beta: {
      title: {
        color: string;
      };
      releaseNotes: {
        title: {
          color: string;
        };
        subTitle: {
          color: string;
        };
      };
      resources: {
        icon: {
          color: string;
        };
      };
    };
    canvas: {
      authorizeButton: {
        background: string;
        color: string;
      };
    };
    finances: {
      accountBalance: {
        emphasis: {
          color: string;
        };
      };
      mealPlans: {
        emphasisBalance: {
          color: string;
        };
        emphasisNoBalance: {
          color: string;
        };
      };
      transactions: {
        amount: {
          color: string;
        };
        amountCharge: {
          color: string;
        };
        name: {
          color: string;
        };
        detail: {
          color: string;
        };
        emptyText: {
          color: string;
        };
      };
    };
    itStatus: {
      item: {
        emptyText: {
          color: string;
        };
        name: {
          color: string;
        };
        status: {
          color: string;
        };
        icon: {
          unknown: string;
          operational: string;
          performanceIssues: string;
          partialOutage: string;
          majorOutage: string;
        };
      };
      sticky: {
        message: {
          color: string;
        };
        title: {
          color: string;
        };
        date: {
          color: string;
        };
        icon: {
          color: string;
        };
        badge: {
          background: string;
          color: string;
        };
      };
    };
    masquerade: {
      buttonAlt: {
        color: string;
        background: string;
      };
    };
    profile: {
      name: {
        color: string;
      };
      detail: {
        color: string;
      };
      icon: {
        color: string;
      };
      settings: {
        emphasis: {
          color: string;
        };
      };
    };
    resources: {
      name: {
        color: string;
      };
      icon: {
        color: string;
      };
      search: {
        input: {
          background: string;
        };
        border: string;
      };
    };
  };
  ui: {
    button: {
      background: string;
      color: string;
      close: {
        background: string;
        color: string;
      };
      custom: {
        background: string;
        selectedBackground: string;
        border: string;
        color: string;
        selectedColor: string;
      };
      info: {
        background: string;
        icon: {
          color: string;
        };
      };
    };
    card: {
      boxShadow: string;
      background: string;
      badge: {
        background: string;
        color: string;
      };
      contentRow: {
        background: string;
        borderBottom: string;
      };
      contentCell: {
        borderLeft: string;
      };
      header: {
        borderBottom: string;
      };
      icon: {
        color: string;
      };
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
      large: {
        color: string;
      };
      small: {
        color: string;
      };
    };
    label: {
      color: string;
    };
    link: {
      background: string;
      color: string;
      icon: {
        external: {
          color: string;
        };
        internal: {
          color: string;
        };
      };
    };
    list: {
      color: string;
      item: {
        background: string;
        header: {
          color: string;
        };
        leadText: {
          color: string;
        };
        description: {
          color: string;
        };
        link: {
          color: string;
          hoverColor: string;
          boxShadow: string;
        };
      };
    };
    myDialog: {
      background: string;
      h2: {
        color: string;
      };
      h3: {
        color: string;
      };
      header: {
        border: string;
      };
      details: {
        color: string;
      };
    };
    pageTitle: {
      color: string;
      badge: {
        background: string;
        color: string;
      };
    };
    plainCard: {
      header: {
        color: string;
      };
    };
    subNav: {
      link: {
        borderBottom: string;
        color: string;
        svg: {
          color: string;
        };
        currentSvg: {
          borderBottom: string;
        };
      };
    };
    table: {
      border: string;
      color: string;
      cell: {
        color: string;
        borderBottom: string;
        notFirstChild: {
          borderLeft: string;
        };
      };
      row: {
        borderTop: string;
        stripedEvenChildren: {
          background: string;
        };
      };
    };
  };
}

export const ThemeContext = TS as React.Context<ThemeConfiguration>;
export const styled = baseStyled as ThemedStyledInterface<ThemeConfiguration>;
