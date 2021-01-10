import React from 'react';
import IconButtons from '../iconMenu/iconButtons'

export default function Note(props){
    return(
        <div className="note" style={{ backgroundColor : props.data.color }}>
            <h2>{props.data.title}</h2>
            <p>{props.data.description}</p>
            <IconButtons />
        </div>
    );
}