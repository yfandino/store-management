import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0C4160'
    },
    secondary: {
      main: '#EFEFEF'
    },
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiDrawer: {
      root: {
        "@media print": {
          display: "none"
        }
      },
      paperAnchorLeft: {
        backgroundColor: '#0C4160',
        borderRadius: '0 8px 8px 0'
      }
    },
    MuiToolbar: {
      root: {
        '& .breadcrumb-title': {
          flexGrow: 1,
          textTransform: 'uppercase'
        },
        "@media print": {
          display: "none"
        }
      }
    },
    MuiContainer: {
      root: {
        "& .grid__-invoice-sheet": {
          padding: 32,
          "@media print": {
            padding: "8px 16px"
          }
        }
      }
    },
    MuiPaper: {
      elevation1: {
        "@media print": {
          boxShadow: "none"
        }
      }
    },
    MuiList: {
      root: {
        '& .selected': {
          backgroundColor: '#093047'
        }
      }
    },
    MuiTableContainer: {
      root: {
        marginTop: 24
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 'bold'
      },
      stickyHeader: {
        backgroundColor: '#EFEFEF'
      }
    },
    MuiCard: {
      root: {
        '& .card__card-header--invoice-title': {
          textTransform: "uppercase",
          fontSize: '1rem',
          fontWeight: 600
        },
        '& .card-header__invoice-body': {
          paddingBottom: 0
        }
      }
    },
    MuiCardContent: {
      root: {
        paddingBottom: 8
      }
    }
  }
});

export default theme;