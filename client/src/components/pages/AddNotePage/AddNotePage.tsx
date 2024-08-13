import React from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Form from '../../organisms/Form/Form';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../redux/reducers/notes/notesReducer';
import { noteFields } from '../../organisms/Form/constants';

const AddNotePage: React.FC = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (formData: Record<string, string>) => {
        dispatch(
            addNote({
                created_at: new Date().toISOString().split('T')[0].split('-').reverse().join('.'),
                title: formData.title,
                description: formData.description,
                tags: null,
                fav: false,
            })
        );
    };
    return (
        <MainTemplate noFooter noHeader title="Add note">
            <Form fields={noteFields} onSubmit={handleFormSubmit} submitButtonText={'Add'} />
        </MainTemplate>
    );
};

export default AddNotePage;
