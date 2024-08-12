import React, { useEffect } from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Form from '../../organisms/Form/Form';
import { useDispatch } from 'react-redux';
import { addNote, getNote } from '../../../redux/reducers/notes/notesReducer';
import { getNoteById } from '../../../redux/actions/notes/notesSaga';
import { useNavigate, useParams } from 'react-router-dom';

let formFields = [
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

const EditNotePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleFormSubmit = (formData: Record<string, string>) => {
        //TODO: ADD SAVE ON EDIT
    };

    useEffect(() => {
        if (id) {
            dispatch(getNote({ id: id }));
        } else {
            navigate('/');
        }
    }, []);

    return (
        <MainTemplate noFooter noHeader title="Add note">
            <Form fields={formFields} onSubmit={handleFormSubmit} />
        </MainTemplate>
    );
};

export default EditNotePage;
