import React, { ComponentPropsWithoutRef } from 'react';
import { Note } from '../../../redux/reducers/notes/types';
import { NoteVariantType } from './NoteListItem.types';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';
import { deleteNote, setNote, toggleNoteFavorite } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';
import Modal from '../../organisms/Modal/Modal';
import Tag from '../../atoms/Tag/Tag';
import EditNoteModal from '../../organisms/Modal/Variant/EditNoteModal/EditNoteModal';
import ManageTagModal from '../../organisms/Modal/Variant/ManageTagModal/ManageTagModal';
import { clearTag, setTag } from '../../../redux/reducers/tags/tagsReducer';

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

    const handleToggleFavorityNote = () => {
        dispatch(toggleNoteFavorite({ id: id, fav: fav !== 'true' }));
    };

    const handleEditTagThroughModal = (tag: string) => {
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
        dispatch(setTag({ currentTag: tag }));
    };

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
                <Button
                    buttonVariant={ButtonVariant.note}
                    iconVariant="delete"
                    onClick={event => handleDelete(event, id)}
                />
                <Modal
                    id={id}
                    title="Edit note"
                    onOpen={handleEditNoteThroughModal}
                    trigger={<Button buttonVariant={ButtonVariant.note} iconVariant="edit" />}
                >
                    <EditNoteModal />
                </Modal>
                <Button
                    onClick={() => handleToggleFavorityNote()}
                    buttonVariant={fav === 'true' ? ButtonVariant['note-fav'] : ButtonVariant.note}
                    iconVariant="star"
                />
            </div>
            <p className="note__description">{description}</p>
            <div className="note__footer">
                <div className="note__date">{created_at}</div>
                <div className="note__tags-wrapper">
                    <Modal
                        id={id}
                        title="Add tag"
                        onOpen={handleEditNoteThroughModal}
                        trigger={<Button buttonVariant={ButtonVariant.note} iconVariant="add" />}
                        noHeight
                        onClose={() => dispatch(clearTag())}
                    >
                        <ManageTagModal />
                    </Modal>
                    {tags &&
                        tags.split(',').map((tag, index) => (
                            <Modal
                                id={id}
                                key={index}
                                title="Edit tag"
                                onOpen={() => handleEditTagThroughModal(tag)}
                                trigger={<Tag key={index} label={tag} />}
                                noHeight
                                onClose={() => dispatch(clearTag())}
                            >
                                <ManageTagModal />
                            </Modal>
                        ))}
                </div>
            </div>
        </li>
    );
};

export default NoteListItem;
