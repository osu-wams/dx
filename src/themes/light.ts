import { ThemeConfiguration, Color, shadows, gradients } from '../theme';

export const light: ThemeConfiguration = {
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
  pageNotFound: {
    link: {
      background: Color['orange-400'],
      color: Color.white
    }
  },
  features: {
    academics: {
      courses: {
        header: {
          color: Color['neutral-600']
        },
        sectionHeader: {
          color: Color['neutral-550']
        },
        emptyList: {
          text: {
            color: Color['neutral-550']
          },
          link: {
            color: Color['orange-400']
          }
        },
        dayList: {
          borderBottom: Color['neutral-200'],
          item: {
            childInFocus: {
              borderBottom: Color['neutral-300']
            },
            childInFocusSelected: {
              borderBottom: Color['orange-400']
            },
            firstChild: {
              color: Color['orange-400']
            },
            evenChildren: {
              color: Color['neutral-550']
            },
            evenChildrenSelected: {
              color: Color['orange-400']
            },
            lastChild: {
              color: Color['neutral-700'],
              borderBottom: Color.transparent
            },
            lastChildSelected: {
              color: Color['orange-400'],
              borderBottom: Color['orange-400']
            }
          }
        },
        dialog: {
          meetingTime: {
            icon: {
              color: Color['orange-400']
            }
          },
          faculty: {
            icon: {
              color: Color['neutral-600']
            }
          }
        },
        list: {
          title: {
            color: Color['neutral-700']
          }
        },
        plannerItems: {
          list: {
            icon: {
              color: Color['orange-400']
            }
          },
          emptyText: {
            color: Color['neutral-550']
          }
        }
      },
      pastCourses: {
        title: {
          color: Color['neutral-700']
        },
        grade: {
          color: Color['orange-400']
        },
        search: {
          icon: {
            color: Color['neutral-600']
          }
        }
      }
    },
    beta: {
      title: {
        color: Color['orange-400']
      },
      releaseNotes: {
        title: {
          color: Color['orange-400']
        },
        subTitle: {
          color: Color['neutral-550']
        }
      },
      resources: {
        icon: {
          color: Color['orange-400']
        }
      }
    },
    canvas: {
      authorizeButton: {
        background: Color['stratosphere-400'],
        color: Color.white
      }
    },
    finances: {
      accountBalance: {
        emphasis: {
          color: Color['neutral-550']
        }
      },
      mealPlans: {
        emphasisBalance: {
          color: Color['pine-400']
        },
        emphasisNoBalance: {
          color: Color['lava-400']
        }
      },
      transactions: {
        amount: {
          color: Color['pine-400']
        },
        amountCharge: {
          color: Color['lava-400']
        },
        name: {
          color: Color['neutral-700']
        },
        detail: {
          color: Color['neutral-550']
        },
        emptyText: {
          color: Color['neutral-550']
        }
      }
    },
    masquerade: {
      buttonDark: {
        color: Color['neutral-700'],
        background: Color['neutral-200']
      }
    },
    profile: {
      name: {
        color: Color['orange-400']
      },
      detail: {
        color: Color['neutral-550']
      },
      icon: {
        color: Color['orange-400']
      }
    },
    resources: {
      name: {
        color: Color['neutral-700']
      },
      icon: {
        color: Color.black
      },
      search: {
        input: {
          background: Color.white
        },
        border: Color['neutral-200']
      }
    }
  },
  ui: {
    button: {
      background: Color['orange-400'],
      color: Color.white,
      close: {
        background: Color.transparent,
        color: Color.black
      },
      custom: {
        background: Color.white,
        selectedBackground: Color['neutral-550'],
        border: Color['neutral-300'],
        color: Color.black,
        selectedColor: Color.white
      },
      info: {
        background: Color.transparent,
        icon: {
          color: Color['neutral-600']
        }
      }
    },
    card: {
      boxShadow: shadows[1],
      background: Color.white,
      badge: {
        background: Color['orange-400'],
        color: Color.white
      },
      contentRow: {
        background: Color.white,
        borderBottom: Color['neutral-200']
      },
      contentCell: {
        borderLeft: Color['neutral-200']
      },
      header: {
        borderBottom: Color['neutral-200']
      },
      icon: {
        color: Color['neutral-550']
      }
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
        background: gradients[1],
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
      large: {
        color: Color['neutral-700']
      },
      small: {
        color: Color['stratosphere-400']
      }
    },
    label: {
      color: Color['neutral-700']
    },
    link: {
      background: Color.transparent,
      color: Color['orange-400'],
      icon: {
        external: {
          color: Color['orange-400']
        },
        internal: {
          color: Color['orange-400']
        }
      }
    },
    list: {
      color: Color['neutral-700'],
      item: {
        background: Color.transparent,
        header: {
          color: Color['neutral-700']
        },
        leadText: {
          color: Color['orange-400']
        },
        description: {
          color: Color['neutral-550']
        },
        link: {
          color: Color['orange-400'],
          boxShadow: shadows[1]
        }
      }
    },
    myDialog: {
      h2: {
        color: Color['orange-400']
      },
      h3: {
        color: Color['neutral-200']
      },
      details: {
        color: Color['neutral-600']
      }
    },
    pageTitle: {
      color: Color['neutral-600'],
      badge: {
        background: Color['stratosphere-400'],
        color: Color.white
      }
    },
    plainCard: {
      header: {
        color: Color['neutral-550']
      }
    },
    subNav: {
      link: {
        borderBottom: Color.transparent,
        color: Color['neutral-600'],
        svg: {
          color: Color['neutral-600']
        },
        currentSvg: {
          borderBottom: Color['orange-400']
        }
      }
    },
    table: {
      border: 'rgba(34, 36, 38, 0.15)',
      color: Color['neutral-600'],
      cell: {
        color: Color['neutral-550'],
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

export default light;
