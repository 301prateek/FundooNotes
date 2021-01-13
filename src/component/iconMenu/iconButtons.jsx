import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './iconButtons.css';
import NoteService from '../../Services/noteService';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const service = new NoteService();

const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(0),
        paddingLeft: theme.spacing(1),

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
    more: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        padding: '2px 2px 2px 2px',
        width: '130px',
        border: 'none',
    },
    root:{
        "&.MuiIconButton-root" : {
            padding:"8px",
            backgroundColor: "blue"
        },
        display: "flex",
        flexDirection: "row",
        width: "fitContent",
    }    
}));

export default function IconButtons(props) {
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

    const [color, setColor] = React.useState();
    const [trashNote, setTrashNote] = React.useState(false);

    // const handleColorChange = (value) => {
    //     props.handleColor(value);  
    // }

    const handleColorChange = (value) => {
        if(props.id !== undefined){
            console.log(props.id);
            setColor(value);
            let data ={
                noteIdList : [props.id],
                color : color
            }
            service.updateColor(data,localStorage.getItem("userToken")).then(res=>{
                console.log(res);
            }).catch(error =>{
                console.log(error);
            })
        }
        else{
            console.log(value);
            props.handleColor(value);  
        }
    }

    // const handleColorUpdate = (value) => {
    //     setColor(value);
    // }

    const handlePalleteMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const colorChange = (value) => {
    //     props.setColor(value);
    // }

    const handleTrash = () => {
         setTrashNote(true);
        
    }

    const menuId = 'palette-menu';
    const renderMenu = (
        <Menu
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className={classes.palette}>
                {colors.map((value) => (
                    <IconButton
                        className={classes.button}
                        style={{ backgroundColor: value }}
                        onClick={() => handleColorChange(value)}>
                    </IconButton>
                ))}
            </div>
        </Menu>
    );

    const trash = () => {
        let data = {
          noteIdList : [props.noteId],
          "isDeleted": true
        };
        service.deleteNote(data, localStorage.getItem("userToken")).then((data) => {
            console.log(data);
            // props.allNotes();
           
        }).catch(error => {
            console.log(error);
        })
        setAnchorEl1(null);
    }

    const archive = () => {
        let data = {
            noteIdList : [props.noteId],
            "isArchived": true
        };
        service.archiveNote(data, localStorage.getItem("userToken")).then((data) => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }
    
        const [anchorEl1, setAnchorEl1] = React.useState(null);
        const isOpen = Boolean(anchorEl1);
    
        const handleOpen = (event) => {
            setAnchorEl1(event.currentTarget);
        };
    
        const handleClose = () => {
            setAnchorEl1(null);
        };
    
        const menu = 'options';
        const renderMenuMore = (
            <Menu
                getContentAnchorEl={null}
                anchorEl={anchorEl1}
                id={menu}
                keepMounted
                open={isOpen}
                onClose={handleClose}
                anchorEl={anchorEl1}
                keepMounted
            >
                <div className={classes.more}>
                    <MenuItem onClick={() => trash()}>Delete</MenuItem>
                </div>
            </Menu>
        );

    return (
        <div className="buttons">
            <IconButton className={classes.paper}>
                <AddAlertOutlinedIcon style={{ fontSize: 20 }} />
            </IconButton>
            <IconButton className={classes.paper}>
                <PersonAddOutlinedIcon style={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
                // id={menuId}
                className={classes.paper}
                name="palette-menu"
                edge="end"
                aria-label="color palette"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handlePalleteMenuOpen}
                color="inherit"
            >
                <PaletteOutlinedIcon style={{ fontSize: 20 }} />
            </IconButton >
            <IconButton className={classes.paper}>
                <ImageOutlinedIcon style={{ fontSize: 20 }}  />
            </IconButton>
            <IconButton className={classes.paper}>
                <ArchiveOutlinedIcon onClick={() => archive()} style={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
                className={classes.paper}
                name="options"
                anchorEl={anchorEl1}
                aria-haspopup="true"
                aria-controls={menu}
                aria-label="more"
                edge="end"
                keepMounted
                onClick={handleOpen}
                aria-controls={menu}
            >
                <MoreVertOutlinedIcon  />
            </IconButton>
            {renderMenu}
            {renderMenuMore} 
        </div>
    );
}