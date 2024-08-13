import React, { ComponentPropsWithoutRef } from 'react';
import { Note, NotesState } from '../../../redux/reducers/notes/types';
import NoteListItem from '../../molecules/NoteListItem/NoteListItem';
import { NoteVariant } from '../../molecules/NoteListItem/constants';

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
    notes: NotesState;
};

const NotesList: React.FC<NoteListProps> = ({ notes }) => {
    return (
        <ul className="notes__list">
            {notes &&
                notes.length > 0 &&
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
                ))}
        </ul>
    );
};

export default NotesList;
