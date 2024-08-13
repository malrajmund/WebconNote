import React, { ComponentPropsWithoutRef } from 'react';
import { Note } from '../../../redux/reducers/notes/types';
import { NoteVariantType } from './NoteListItem.types';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';

type NoteProps = ComponentPropsWithoutRef<'li'> & {
    variant: NoteVariantType;
};

const NoteListItem: React.FC<Note & NoteProps> = ({
    // tags,
    // fav,
    id,
    variant = 'primary',
    created_at,
    title,
    description,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (id: string): void => {
        navigate(`edit-note/${id}`);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteNote({ id: id }));
    };

    return (
        <li className={`note note--${variant}`}>
            <div className="note__header">
                <h2 className="note__title">{title}</h2>
                <Button buttonVariant={ButtonVariant.note} iconVariant="edit" onClick={() => handleEdit(id)} />
                <Button buttonVariant={ButtonVariant.note} iconVariant="delete" onClick={() => handleDelete(id)} />
            </div>
            <p className="note__description">{description}</p>
            <div className="note__created-date">{created_at}</div>
        </li>
    );
};

export default NoteListItem;
