import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'storybook/internal/components';
import { updateNote, clearNote } from '../../../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../../../redux/store';
import Form, { FormFieldConfig } from '../../../Form/Form';
import { useEffect, useState } from 'react';
import { noteFields } from '../../../Form/constants';

type EditNoteModalProps = {
    setIsOpen?: (isOpen: boolean) => void;
    isOpen?: boolean;
};

const EditNoteModal: React.FC<EditNoteModalProps> = ({ setIsOpen, isOpen }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppState) => state.notes.currentNote.loading);
    const editNote = useSelector((state: AppState) => state.notes.currentNote);
    const [fields, setFields] = useState<FormFieldConfig[]>([]);

    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(
            updateNote({ id: editNote.id ? editNote.id : '', title: formData.title, description: formData.description })
        );
        dispatch(clearNote());
        setIsOpen && setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            let newFields = noteFields.map(field => ({
                ...field,
                value: editNote[field.id] ? editNote[field.id] : field.value,
            }));
            setFields([...newFields]);
        }
    }, [isOpen]);

    return isLoading ? (
        <Loader />
    ) : (
        <Form
            fields={fields}
            onSubmit={handleFormSubmit}
            submitButtonText={'Save'}
            noBorder
            flexColumn
            heightFull
            noPadding
        />
    );
};

export default EditNoteModal;
