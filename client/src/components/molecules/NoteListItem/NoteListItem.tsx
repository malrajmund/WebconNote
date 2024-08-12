import React, { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import { Note } from '../../../redux/reducers/notes/types';
import { NoteVariantType } from './NoteListItem.types';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';

type NoteProps = ComponentPropsWithoutRef<'li'> & {
    variant: NoteVariantType;
    handleDelete: MouseEventHandler<HTMLButtonElement>;
    handleEdit: () => void;
};

const NoteListItem: React.FC<Note & NoteProps> = ({
    // tags,
    // fav,
    variant = 'primary',
    created_at,
    title,
    description,
    handleDelete,
    handleEdit,
}) => {
    return (
        <li className={`note note--${variant}`}>
            <div className="note__header">
                <h2 className="note__title">{title}</h2>
                <Button buttonVariant={ButtonVariant.note} iconVariant="edit" onClick={handleEdit} />
                <Button buttonVariant={ButtonVariant.note} iconVariant="delete" onClick={handleDelete} />
            </div>
            <p className="note__description">{description}</p>
            <div className="note__created-date">
                {new Date(created_at).toISOString().split('T')[0].split('-').reverse().join('.')}
            </div>
        </li>
    );
};

export default NoteListItem;
