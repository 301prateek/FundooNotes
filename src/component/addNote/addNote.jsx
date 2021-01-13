import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IconButton from "@material-ui/core/IconButton";
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NoteService from '../../Services/noteService';
import IconButtons from '../iconMenu/iconButtons'
import './addNote.css'


const service = new NoteService();

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

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [noteContent, setNoteContent] = React.useState(false);
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteDescription, setNoteDescription] = React.useState("");

    const [color, setColor] = React.useState("#fff");

    const handleColorChange = (value) => {
        setColor(value);
    }

    const handleChange = () => {
        setNoteContent(true);
    }

    const handleNoteTitle = (e) => {
        setNoteTitle(e.target.value);
    }

    const handleNoteDescription = (e) => {
        setNoteDescription(e.target.value);
    }

    const save = (e) => {
        e.preventDefault();
        if (noteTitle.length === 0) {
            setNoteContent(false);
            setColor("#fff");
        } else {
            console.log('note added', noteTitle, noteDescription);
            
            const noteData = new FormData();
                noteData.set("title", noteTitle);
                noteData.set("description", noteDescription);
                noteData.set("color",color);
                
            service.addNote(noteData, localStorage.getItem("userToken")).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
            setColor("#fff");
            setNoteContent(false);
        }
    };

    return (
        <div className="note-main">
            { !noteContent ?
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
                :
                <div className="take-note" >
                    <div className="field-change" style={{ backgroundColor: color  }} > 
                        <InputBase
                            name="title"
                            onChange={handleNoteTitle}
                            value={noteTitle}
                            fullWidth
                            placeholder="Title"
                            inputProps={{ 'aria-label': 'text' }}
                        />
                        <InputBase
                            name="discription"
                            onChange={handleNoteDescription}
                            value={noteDescription}
                            multiline
                            rowsMax={5}
                            fullWidth
                            placeholder="Take a note..."
                            inputProps={{ 'aria-label': 'text' }}
                        />
                        <div className="icon-buttons">
                                <IconButtons 
                                    handleColor={handleColorChange}
                                />
                            <div className="close-button">
                                <Button onClick={save} >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
