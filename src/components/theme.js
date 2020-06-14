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
    }
  }
});

export default theme;