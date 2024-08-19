import React, { ComponentPropsWithoutRef, useCallback } from 'react';
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
import clsx from 'clsx';

type NoteProps = ComponentPropsWithoutRef<'li'> & {
    variant: NoteVariantType;
};

const NoteListItem: React.FC<Note & NoteProps> = ({
    variant = 'primary',
    tags,
    fav,
    id,
    created_at,
    title,
    description,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFavorite = fav === 'true' ? ButtonVariant['note-fav'] : ButtonVariant.note;

    const handleToggleFavorityNote = useCallback(() => {
        dispatch(toggleNoteFavorite({ id: id, fav: fav !== 'true' }));
    }, [fav, id]);

    const handleEditTagThroughModal = useCallback(
        (tag: string) => {
            return () => {
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
        },
        [dispatch, title, description, variant, id, created_at, tags, fav]
    );

    const handleEditNoteThroughModal = useCallback(() => {
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
    }, [dispatch, title, description, variant, id, created_at, tags, fav]);

    const handleDelete = useCallback(
        (id: string) => {
            return () => dispatch(deleteNote({ id: id }));
        },
        [dispatch]
    );

    const handleEdit = useCallback(
        (id: string) => {
            return () => navigate(`edit-note/${id}`);
        },
        [id]
    );

    const handleClearTag = useCallback(() => {
        return dispatch(clearTag());
    }, []);

    return (
        <li className={clsx('note', `note--${variant}`)}>
            <div className="note__header">
                <h2 className="note__title" onClick={handleEdit(id)}>
                    {title}
                </h2>
                <Button buttonVariant={ButtonVariant.note} iconVariant="delete" onClick={handleDelete(id)} />
                <Modal
                    id={id}
                    title="Edit note"
                    onOpen={handleEditNoteThroughModal}
                    trigger={<Button buttonVariant={ButtonVariant.note} iconVariant="edit" />}
                >
                    <EditNoteModal />
                </Modal>
                <Button onClick={handleToggleFavorityNote} buttonVariant={isFavorite} iconVariant="star" />
            </div>
            <p className="note__description">{description}</p>
            <div className="note__footer">
                <div className="note__date">{created_at}</div>
                <div className="note__add">
                    <Modal
                        id={id}
                        title="Add tag"
                        onOpen={handleEditNoteThroughModal}
                        trigger={<Button buttonVariant={ButtonVariant.note} iconVariant="add" />}
                        noHeight
                        onClose={handleClearTag}
                    >
                        <ManageTagModal />
                    </Modal>
                </div>
                <div className="note__tags-wrapper">
                    {tags &&
                        tags.split(',').map(tag => (
                            <Modal
                                id={id}
                                key={tag}
                                title="Edit tag"
                                onOpen={handleEditTagThroughModal(tag)}
                                trigger={<Tag label={tag} />}
                                noHeight
                                onClose={handleClearTag}
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
