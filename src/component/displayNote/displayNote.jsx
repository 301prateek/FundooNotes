import React from 'react';
import './displayNote.css';
import IconButtons from '../iconMenu/iconButtons'

export default function DisplayNotes(props) {

    // const [trashNote, setTrashNote] = React.useState(false);

    // const handleTrash = (value) => {
    //     setTrashNote(value);
    // }

    const [color, setColor] = React.useState();

    const colorChange = (value) => {
        setColor(value);
    }

    return (
        <div className="notes-content">
            {props.notes.map((data,i) => (
                <div key={i} className="noteDisplay" style={{backgroundColor: data.color, color}}>
                    <div>
                        <small>{data.title}</small>
                    </div>
                    <div>
                        <small><strong>{data.description}</strong></small>
                    </div>
                    <div className="buttonsHover">
                        <IconButtons noteId={data.id} colorChange={colorChange}/>
                    </div>
                </div>
                //fragment
            ))}
        </div>
    )
}