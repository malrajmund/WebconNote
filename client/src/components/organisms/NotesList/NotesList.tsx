import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../../../redux/reducers/notes/notesReducer';
import { Note } from '../../../redux/reducers/notes/types';
import NoteListItem from '../../molecules/NoteListItem/NoteListItem';
import { AppState } from '../../../redux/store';
import { NoteVariant } from '../../molecules/NoteListItem/constants';
import { useNavigate } from 'react-router-dom';

const NotesList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state: AppState) => state.notes.items);

    const handleDelete = (id: string) => {
        dispatch(deleteNote({ id: id }));
    };

    const handleEdit = (id: string) => {
        navigate(`edit-note/${id}`);
    };

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    return (
        <ul className="notes__list">
            {notes &&
                notes.length > 0 &&
                notes.map((note: Note) => (
                    <NoteListItem
                        handleEdit={() => handleEdit(note.id)}
                        handleDelete={() => handleDelete(note.id)}
                        title={note.title}
                        description={note.description}
                        created_at={note.created_at}
                        key={note.id}
                        id={note.id}
                        fav={note.fav}
                        tags={note.tags}
                        variant={NoteVariant[note.variant]}
                    />
                ))}
        </ul>
    );
};

export default NotesList;
