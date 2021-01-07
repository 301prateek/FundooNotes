import React from 'react';
import './addNote.css';
import InputBase from '@material-ui/core/InputBase';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IconButton from "@material-ui/core/IconButton";
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(1),
    
      },
    palette: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        padding: '2px 2px 2px 2px',
        width: '130px',
        border: 'none',
    },
      button: {
        margin: theme.spacing(0.5),
        borderRadius: "50%",
        width: '5px',
        height: '5px',
      },
}));    

export default function AddNote() {

        const colors = [
          '#fff',
          '#f28b82',
          '#fbbc04',
          '#fff475',
          '#ccff90',
          '#a7ffeb',
          '#cbf0f8',
          '#aecbfa',
          '#d7aefb',
          '#fdcfe8',
          '#e6c9a8',
          '#e8eaed'
        ];
      

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [noteContent, setNoteContent] = React.useState(false);

    const handlePalleteMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleChange = () => {
        setNoteContent(true);
    }

    const handleClose = () => {
        setNoteContent(false);
    }

    const [color, setColor] = React.useState();


    const menuId = 'palette-menu';
    const renderMenu = (
        <Menu
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'top' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <div  className={classes.palette}>
            {colors.map((value) => (
                <IconButton 
                    className={classes.button} 
                    style={{backgroundColor : value }} 
                    onClick={() => setColor(value)}> 
                </IconButton>
            ))}
        </div>
        </Menu>
    );

    if (noteContent === true) {
        return (
            <div className="take-note" >
                <div className="field-change" style={{ backgroundColor : color }} >
                    <InputBase
                        fullWidth
                        placeholder="Title"
                        inputProps={{ 'aria-label': 'text' }}
                    />
                    <InputBase
                        multiline
                        rowsMax={5}
                        fullWidth
                        placeholder="Take a note..."
                        inputProps={{ 'aria-label': 'text' }}
                    />
                    <div className="buttons">
                        <div className="group">
                            <IconButton>
                                <AddAlertOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <PersonAddOutlinedIcon />
                            </IconButton>
                            <IconButton
                                className="profile"
                                className={classes.paper}
                                name="palette-menu"
                                edge="end"
                                aria-label="color palette"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handlePalleteMenuOpen}
                                color="inherit"
                            >
                                 <PaletteOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <ImageOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <ArchiveOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <MoreVertOutlinedIcon />
                            </IconButton>
                        </div>
                        {renderMenu}
                        <div className="close-button">
                            <Button onClick={handleClose} >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="note-main">
                <div className="first-field">
                    <InputBase
                        onClick={handleChange}
                        // className={classes.input}
                        fullWidth
                        placeholder="Take a note.."
                        inputProps={{ 'aria-label': 'text' }}
                    />
                    <IconButton >
                        <CheckBoxOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <BrushOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ImageOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
    
}