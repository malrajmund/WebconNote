import Popup from 'reactjs-popup';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'storybook/internal/components';
import { updateNote, clearNote, getNote } from '../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../redux/store';
import { noteFields } from '../Form/constants';
import Form from '../Form/Form';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';

type ModalProps = {
    trigger: React.ReactNode;
    title: string;
    id: string;
};

const Modal: React.FC<ModalProps> = ({ trigger, title, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const isLoading = useSelector((state: AppState) => state.notes.currentNote.loading);
    const editNote = useSelector((state: AppState) => state.notes.currentNote);

    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(updateNote({ id: id ? id : '', title: formData.title, description: formData.description }));
        dispatch(clearNote());
        setIsOpen(false);
    };

    useEffect(() => {
        if (id && isOpen) {
            dispatch(getNote({ id: id }));
        }
    }, [isOpen, id]);

    return (
        <Popup
            open={isOpen}
            trigger={trigger}
            modal
            closeOnEscape
            closeOnDocumentClick
            nested
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
        >
            <Button buttonVariant={ButtonVariant.icon} iconVariant="back" onClick={() => setIsOpen(false)} isAbsolute />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="popup-header">{title}</h2>
                    <Form
                        fields={noteFields.map(field => ({
                            ...field,
                            value: editNote[field.id] ? editNote[field.id] : field.value,
                        }))}
                        onSubmit={handleFormSubmit}
                        submitButtonText={'Save'}
                        inModal
                    />
                </>
            )}
        </Popup>
    );
};

export default Modal;
