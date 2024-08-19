import React, { useCallback } from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Form from '../../organisms/Form/Form';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../redux/reducers/notes/notesReducer';
import { noteFields } from '../../organisms/Form/constants';

const AddNotePage: React.FC = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = useCallback(
        (formData: Record<string, string>) => {
            dispatch(
                addNote({
                    created_at: new Date().toISOString().split('T')[0].split('-').reverse().join('.'),
                    title: formData.title,
                    description: formData.description,
                    tags: '',
                    fav: false,
                })
            );
        },
        [dispatch]
    );

    return (
        <MainTemplate title="Add note">
            <Form fields={noteFields} onSubmit={handleFormSubmit} submitButtonText={'Add'} />
        </MainTemplate>
    );
};

export default AddNotePage;
