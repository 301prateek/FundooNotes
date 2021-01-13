import React from 'react';
import './displayNote.css';
import IconButtons from '../iconMenu/iconButtons'
import UpdateNote from '../updateNote/updateNote'

export default function DisplayNotes(props) {

    const [openPopup, setOpenPopup] = React.useState(false);
    const [data, setData] =React.useState({});
    const [noteId, setNoteId] = React.useState();
    const handleClickOpen = (value) => {
        setOpenPopup(true);
        setData(value);
    };
    const handleClose = () => {
        setOpenPopup(false);
    };
    const handleId =(value) =>{
        setNoteId(value);
    }

    const [color, setColor] = React.useState();

    const colorChange = (value) => {
        setColor(value);
    }

    return (
        <div className="notes-content">
            {props.notes.filter((data) => data.isArchived === false).filter((data) => data.isDeleted === false).map((data, i) => (
                    <div key={i} className="noteDisplay" style={{ backgroundColor: data.color }}>
                        <div onClick={() => handleClickOpen(data)}>
                            <div>
                            <small>{data.title} </small>
                            </div>
                            <div>
                            <small><strong>{data.description}</strong></small>
                            </div>
                        </div>
                        <div className="buttonsHover">
                            <IconButtons noteId={data.id} colorChange={colorChange} />
                        </div>
                    </div> 
            ))}
            <UpdateNote openPopup={openPopup} data={data} noteId={noteId} closePopup={handleClose}/>
        </div>
    )
}