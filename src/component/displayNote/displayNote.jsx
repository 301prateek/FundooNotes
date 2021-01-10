import React from 'react';
import './displayNote.css';
import IconButtons from '../iconMenu/iconButtons'

export default function DisplayNotes(props) {

    // const [notes, setNotes] = React.useState(props.notes);


    return (
        <div className="notes-content">
            {props.notes.map((user) => (
                <div className="noteDisplay" style={{backgroundColor: user.color}}>
                    <small>{user.title}</small>
                    <small>{user.description}</small>
                    <div className="buttonsHover">
                        <IconButtons />
                    </div>
                </div>
            ))}
        </div>
    )
}