import { useDispatch, useSelector } from 'react-redux';
import { updateNote, clearNote } from '../../../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../../../redux/store';
import Form, { FormFieldConfig } from '../../../Form/Form';
import { tagFields } from '../../../Form/constants';
import Loader from '../../../../atoms/Loader/Loader';
import { useEffect, useState } from 'react';

type AddTagModalProps = {
    setIsOpen?: (isOpen: boolean) => void;
    isOpen?: boolean;
};

const AddTagModal: React.FC<AddTagModalProps> = ({ setIsOpen, isOpen }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: AppState) => state.notes.currentNote.loading);
    const editNote = useSelector((state: AppState) => state.notes.currentNote);
    const [fields, setFields] = useState<FormFieldConfig[]>([]);

    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(updateNote({ id: editNote.id ? editNote.id : '', tags: formData.tags }));
        dispatch(clearNote());
        setIsOpen && setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            let newFields = tagFields.map(field => ({
                ...field,
                value: editNote[field.id] ? editNote[field.id] : field.value,
            }));

            setFields([...newFields]);
        }
    }, [isOpen]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Form fields={fields} onSubmit={handleFormSubmit} submitButtonText={'Add'} inModal />
        </>
    );
};

export default AddTagModal;
