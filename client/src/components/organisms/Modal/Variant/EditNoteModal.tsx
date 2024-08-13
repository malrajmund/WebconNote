import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'storybook/internal/components';
import { updateNote, clearNote, getNote } from '../../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../../redux/store';
import Form, { FormFieldConfig } from '../../Form/Form';
import { useEffect } from 'react';
import { noteFields } from '../../Form/constants';

type EditNoteModalProps = {
    setIsOpen?: (isOpen: boolean) => void;
    fields?: FormFieldConfig[];
    isOpen?: boolean;
};

const EditNoteModal: React.FC<EditNoteModalProps> = ({ setIsOpen, isOpen }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppState) => state.notes.currentNote.loading);
    const editNote = useSelector((state: AppState) => state.notes.currentNote);

    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(
            updateNote({ id: editNote.id ? editNote.id : '', title: formData.title, description: formData.description })
        );
        dispatch(clearNote());
        setIsOpen && setIsOpen(false);
    };

    useEffect(() => {
        if (editNote.id && isOpen) {
            dispatch(getNote({ id: editNote.id }));
        }
    }, [isOpen, editNote.id]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
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
    );
};

export default EditNoteModal;
