import React from 'react';
import './addNote.css';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IconButton from "@material-ui/core/IconButton";
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { useState } from 'react';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(1),
    
      },
    pallete: {
        display: 'flex',
        flexDirection: 'row',
        // width: '30px',
        height: '30px',
        padding: '2px 2px 2px 2px',
        width: '130px',
    },
      button: {
        margin: theme.spacing(0.5),
        borderRadius: "50%",
        // backgroundColor: '#f28b82',
        width: '5px',
        height: '5px',
      },
}));    

export default function AddNote() {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handlePalleteMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [noteContent, setNoteContent] = React.useState(false);

    const handleChange = () => {
        setNoteContent(true);
    }

    const handleClose = () => {
        setNoteContent(false);
    }

    const menuId = 'pallete-menu';
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
            <div className={classes.pallete} >
                <IconButton className={classes.button} style={{backgroundColor : '#fff' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#f28b82' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#fbbc04' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#fff475' }}></IconButton>
            </div>
            <div className={classes.pallete}>
                <IconButton className={classes.button} style={{backgroundColor : '#ccff90' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#a7ffeb' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#cbf0f8' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#aecbfa' }}></IconButton>
            </div>
            <div className={classes.pallete}>
                <IconButton className={classes.button} style={{backgroundColor : '#d7aefb' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#fdcfe8' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#e6c9a8' }}></IconButton>
                <IconButton className={classes.button} style={{backgroundColor : '#e8eaed' }}></IconButton>
            </div>
        </Menu>
    );


    if (noteContent === true) {
        return (
            <div className="take-note" >
                <div className="field-change">
                    <InputBase
                        fullWidth
                        placeholder="Title"
                        inputProps={{ 'aria-label': 'text' }}
                    />
                    <InputBase
                        multiline
                        rowsMax={8}
                        fullWidth
                        placeholder="Take a note..."
                        inputProps={{ 'aria-label': 'text' }}
                    />
                    <div className="buttons">
                        <div className="group">
                            <IconButton type="submit" >
                                <AddAlertOutlinedIcon />
                            </IconButton>
                            <IconButton type="submit" >
                                <PersonAddOutlinedIcon />
                            </IconButton>
                            <IconButton
                                className="profile"
                                className={classes.paper}
                                name="pallete-menu"
                                edge="end"
                                aria-label="color pallete"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handlePalleteMenuOpen}
                                color="inherit"
                            >
                                 <PaletteOutlinedIcon />
                            </IconButton>
                            <IconButton type="submit" >
                                <ImageOutlinedIcon />
                            </IconButton>
                            <IconButton type="submit" >
                                <ArchiveOutlinedIcon />
                            </IconButton>
                            <IconButton type="submit" >
                                <MoreVertOutlinedIcon />
                            </IconButton>
                            {/* <IconButton type="submit" >
                                <UndoOutlinedIcon />
                            </IconButton>
                            <IconButton type="submit" >
                                <RedoOutlinedIcon />
                            </IconButton> */}
                        </div>
                        {renderMenu}
                        <div className="close-button">
                            <Button type="submit" onClick={handleClose} >
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
                    <IconButton type="submit" >
                        <CheckBoxOutlinedIcon />
                    </IconButton>
                    <IconButton type="submit">
                        <BrushOutlinedIcon />
                    </IconButton>
                    <IconButton type="submit">
                        <ImageOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        );
    }

}