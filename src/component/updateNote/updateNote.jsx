import React from "react";
import NoteService from '../../Services/noteService';
import IconButtons from '../iconMenu/iconButtons'
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const service = new NoteService();

const useStyles = makeStyles((theme) => ({
    dialogMain: {
        width: "500px !important",
        padding: "12px 12px 12px 12px",
    },
    controls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }

}));

export default function UpdateNote(props) {

    const classes = useStyles();
    const theme = useTheme();

    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteDescription, setNoteDescription] = React.useState("");

    const handleNoteTitle = (e) => {
        setNoteTitle(e.target.value);
        console.log("Change1");
    }

    const handleNoteDescription = (e) => {
        setNoteDescription(e.target.value);
        console.log("Change2");
    }

    // const [color, setColor] = React.useState();

    // const handleColorUpdate = (value) =>{
    //     setColor(value);
    // }

    React.useEffect(() => { 
        setNoteTitle(props.data.title);
        setNoteDescription(props.data.description);
      }, [props] )

    const update = (e) => {
        e.preventDefault();
        console.log("Changed");
        console.log('Updated', props.data.id, noteTitle, noteDescription);

        const noteData = new FormData();
        noteData.set("noteId", props.data.id);
        noteData.set("title", noteTitle);
        noteData.set("description", noteDescription);
        // noteData.set("color", color);
        console.log(props.data.id, noteTitle,  noteDescription);

        service.updateNote(noteData, localStorage.getItem("userToken")).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })

        props.closePopup();
    };

    return (
        <>
            <Dialog open={props.openPopup} onClose={props.closePopup} >
                <DialogContent style={{ backgroundColor: props.data.color }} className={classes.dialogMain} >
                    <div >
                        <InputBase
                            className="title"
                            name="title"
                            onChange={handleNoteTitle}
                            value={noteTitle}
                            fullWidth
                            placeholder="Title"
                            inputProps={{ 'aria-label': 'text' }}
                        />
                    </div>
                    <div >
                        <InputBase
                            className="description"
                            name="description"
                            onChange={handleNoteDescription}
                            value={noteDescription}
                            multiline
                            rowsMax={5}
                            fullWidth
                            placeholder="Note"
                            inputProps={{ 'aria-label': 'text' }}
                        />
                    </div>
                    <div className={classes.controls}>
                        <div>
                            <IconButtons id={props.data.id}/>
                        </div>
                        <div>
                            <Button color="primary" onClick={update}>
                                close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
