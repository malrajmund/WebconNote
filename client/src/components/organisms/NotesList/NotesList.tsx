import React, { useEffect } from 'react';
import { Note } from '../../../redux/reducers/notes/types';
import NoteListItem from '../../molecules/NoteListItem/NoteListItem';
import { NoteVariant } from '../../molecules/NoteListItem/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../../../redux/reducers/notes/notesReducer';
import { AppState, channel } from '../../../redux/store';
import Loader from '../../atoms/Loader/Loader';

const NotesList: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state: AppState) => state.notes.items);
    const isLoading = useSelector((state: AppState) => state.notes.loading);

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'UPDATE_NOTE') {
                dispatch(getNotes());
            }
        };

        channel.addEventListener('message', handleMessage);

        return () => {
            channel.removeEventListener('message', handleMessage);
        };
    }, []);

    return notes && notes.length > 0 ? (
        <ul className="notes__list" aria-label="notesList">
            {isLoading ? (
                <Loader />
            ) : (
                notes.map((note: Note) => (
                    <NoteListItem
                        title={note.title}
                        description={note.description}
                        created_at={note.created_at}
                        key={note.id}
                        id={note.id}
                        fav={note.fav}
                        tags={note.tags}
                        variant={NoteVariant[note.variant]}
                    />
                ))
            )}
        </ul>
    ) : (
        <h2 className="notes__header">No notes.</h2>
    );
};

export default NotesList;
