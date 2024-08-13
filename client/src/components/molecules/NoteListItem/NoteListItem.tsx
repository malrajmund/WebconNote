import React, { ComponentPropsWithoutRef } from 'react';
import { Note } from '../../../redux/reducers/notes/types';
import { NoteVariantType } from './NoteListItem.types';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';
import { deleteNote, setNote } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';
import Modal from '../../organisms/Modal/Modal';
import Tag from '../../atoms/Tag/Tag';
import EditNoteModal from '../../organisms/Modal/Variant/EditNoteModal';

type NoteProps = ComponentPropsWithoutRef<'li'> & {
    variant: NoteVariantType;
};

const NoteListItem: React.FC<Note & NoteProps> = ({
    tags,
    fav,
    id,
    variant = 'primary',
    created_at,
    title,
    description,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditNoteThroughModal = () => {
        dispatch(
            setNote({
                title: title,
                description: description,
                variant: variant,
                id: id,
                created_at: created_at,
                tags: tags,
                fav: fav,
            })
        );
    };

    const handleEdit = (id: string): void => {
        navigate(`edit-note/${id}`);
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();
        dispatch(deleteNote({ id: id }));
    };

    return (
        <li className={`note note--${variant}`}>
            <div className="note__header">
                <h2 className="note__title" onClick={() => handleEdit(id)}>
                    {title}
                </h2>
                <Modal
                    id={id}
                    title="Edit note"
                    onOpen={handleEditNoteThroughModal}
                    trigger={<Button buttonVariant={ButtonVariant.note} iconVariant="edit" />}
                >
                    <EditNoteModal />
                </Modal>
                <Button
                    buttonVariant={ButtonVariant.note}
                    iconVariant="delete"
                    onClick={event => handleDelete(event, id)}
                />
            </div>
            <p className="note__description">{description}</p>
            <div className="note__footer">
                <div className="note__date">{created_at}</div>
                <div className="note__tags-wrapper">
                    {tags ? <Tag label="tag" /> : <Button buttonVariant={ButtonVariant.note} iconVariant="add" />}
                </div>
            </div>
        </li>
    );
};

export default NoteListItem;
