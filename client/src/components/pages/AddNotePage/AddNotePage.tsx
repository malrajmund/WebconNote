import React from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Form from '../../organisms/Form/Form';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../redux/reducers/notes/notesReducer';

const formFields = [
    {
        id: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter your title',
        value: '',
    },
    {
        id: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter your description',
        value: '',
    },
];

const AddNotePage: React.FC = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(
            addNote({
                created_at: new Date(),
                title: formData.title,
                description: formData.description,
                tags: null,
                fav: false,
            })
        );
    };
    return (
        <MainTemplate noFooter noHeader title="Add note">
            <Form fields={formFields} onSubmit={handleFormSubmit} />
        </MainTemplate>
    );
};

export default AddNotePage;
