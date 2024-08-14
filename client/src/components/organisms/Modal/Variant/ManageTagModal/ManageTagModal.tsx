import { useDispatch, useSelector } from 'react-redux';
import { clearNote } from '../../../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../../../redux/store';
import Form, { FormFieldConfig } from '../../../Form/Form';
import { tagFields } from '../../../Form/constants';
import Loader from '../../../../atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { addTag, clearTag, deleteTag, editTag } from '../../../../../redux/reducers/tags/tagsReducer';
import { Note } from '../../../../../redux/reducers/notes/types';

type ManageTagModalProps = {
    setIsOpen?: (isOpen: boolean) => void;
    isOpen?: boolean;
};

const ManageTagModal: React.FC<ManageTagModalProps> = ({ setIsOpen, isOpen }) => {
    const dispatch = useDispatch();
    const [fields, setFields] = useState<FormFieldConfig[]>(tagFields);
    const { loading, tags, id } = useSelector((state: AppState) => state.notes.currentNote) as Note;
    const currentTag = useSelector((state: AppState) => state.tags.currentTag) as string;

    const handleDelete = () => {
        dispatch(deleteTag({ id: id, tagToDelete: currentTag, oldTag: tags }));
        setIsOpen && setIsOpen(false);
    };

    const handleFormSubmit = (formData: Record<string, string>) => {
        if (currentTag === null) {
            dispatch(addTag({ id: id, tags: tags, newTag: formData.tag }));
        } else {
            dispatch(editTag({ id: id, tags: tags, newTag: formData.tag, oldTag: currentTag }));
        }
        dispatch(clearTag());
        dispatch(clearNote());
        setIsOpen && setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen && currentTag) {
            let newFields = tagFields.map(field => ({
                ...field,
                value: currentTag ? currentTag : field.value,
            }));
            setFields([...newFields]);
        }
    }, [isOpen, currentTag]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Form
                handleDelete={handleDelete}
                fields={fields}
                onSubmit={handleFormSubmit}
                submitButtonText={currentTag ? 'Save' : 'Add'}
                inModal
            />
        </>
    );
};

export default ManageTagModal;
