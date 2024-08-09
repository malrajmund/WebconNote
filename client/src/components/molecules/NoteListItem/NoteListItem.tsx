import React from 'react';
import { Note } from '../../../redux/reducers/notes/types';

const NoteListItem: React.FC<Note> = ({ id, tags, fav }) => {
    return <li>{`${id}, ${tags}, ${fav}`}</li>;
};

export default NoteListItem;
