import { Divider, Toolbar } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import './dashboard.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddNote from '../addNote/addNote'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DisplayNotes from '../displayNote/displayNote';
import NoteService from '../../Services/noteService';

const service = new NoteService();


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  search: {
    alignItems: 'center',
    position: 'relative',
    borderRadius: '5px',
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '40%',
    height: '45px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '55%',
      height: '45px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    
  },
  inputInput: {
    width: '70%',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  paper: {
    marginRight: theme.spacing(1),

  },
  hide: {
    display: 'menuIcon',
  },
  drawer: {
    // zIndex: '999',
    width: drawerWidth,
    paddingLeft: '8px',
    paddingTop: '60px',
    // flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    borderBottom: '1px',
    flex: 'none'
  },
  drawerOpen: {
    zIndex: '999',
    paddingTop: '60px',
    paddingLeft: '8px',
    border: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: '999',
    paddingTop: '60px',
    paddingLeft: '8px',
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
      paddingLeft: '3px',
    },
    '@media(maxWidth: 600px)' : {
      paddingLeft: '3px',
    }
  },
  appbar:{
    boxShadow: 'none',
    borderBottom: '1px solid lightgray' 
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: '3%',
    flexGrow: 1,
    // paddingRight: 200, 
  },

}));

export default function Dashboard() {

  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [notes,setNotes]= React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(open ? false : true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => { 
    getAllNotes();
  }, [] )

  const getAllNotes = () => {
    service.getNotes().then((data) => {
        let array = data.data.data.data;
        console.log(array);
        setNotes(array);
    }).catch(error => {
        console.log(error);
    })
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className="profile">
        <div className="profile-picture">
          <Avatar alt="picture" src="/static/images/avatar/1.jpg" className={classes.large} />
          <small>{localStorage.getItem("email")}</small>
        </div>
        <div className="sign-out">
            <Button size="small" variant="outlined"> Sign out</Button>
        </div>
      </div>
    </Menu>
  );

  return (
    <div className="main">
      <div>
      <AppBar position="fixed" color="inherit" className={classes.appbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
                [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src="../images/AppLogo.png" alt="" />
          <Typography>Fundoo</Typography>
          <div className="group1">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <IconButton
              className="profile"
              className={classes.paper}
              name="primary-search-account-menu"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle /> 
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      </div>
      <div className="drawer">
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <EmojiObjectsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsNoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Reminder" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LabelOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Exam" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit labels" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.content}>
        <AddNote />
        <DisplayNotes notes={notes}/>
      </div>
      </div>
    </div>
  )

}
