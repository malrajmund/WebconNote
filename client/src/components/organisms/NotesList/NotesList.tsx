import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, getNotes } from '../../../redux/reducers/notes/notesReducer';
import { Note } from '../../../redux/reducers/notes/types';
import NoteListItem from '../../molecules/NoteListItem/NoteListItem';
import { AppState } from '../../../redux/store';

const NotesList: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state: AppState) => state.notes.items);

    const addListItem = () => {
        dispatch(addNote({ tags: 'test', fav: false }));
    };

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    return (
        <ul>
            {notes &&
                notes.length > 0 &&
                notes.map((note: Note) => <NoteListItem key={note.id} id={note.id} fav={note.fav} tags={note.tags} />)}
            <button onClick={() => addListItem()}>Dodaj</button>
        </ul>
    );
};

export default NotesList;
