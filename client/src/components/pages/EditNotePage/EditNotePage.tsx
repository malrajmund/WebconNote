import React, { useCallback, useEffect } from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Form from '../../organisms/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { clearNote, getNote, updateNote } from '../../../redux/reducers/notes/notesReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { noteFields } from '../../organisms/Form/constants';
import { AppState } from '../../../redux/store';
import Loader from '../../atoms/Loader/Loader';

const EditNotePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isLoading = useSelector((state: AppState) => state.notes.loading);
    const editNote = useSelector((state: AppState) => state.notes.currentNote);

    const handleFormSubmit = useCallback(
        (formData: Record<string, string>) => {
            dispatch(updateNote({ id: id ? id : '', title: formData.title, description: formData.description }));
            dispatch(clearNote());
        },
        [dispatch]
    );

    useEffect(() => {
        if (id) {
            dispatch(getNote({ id: id }));
        } else {
            navigate('/');
        }
    }, []);

    return (
        <MainTemplate title="Edit note">
            {isLoading ? (
                <Loader />
            ) : (
                <Form
                    fields={noteFields.map(field => ({
                        ...field,
                        value: editNote[field.id] ? editNote[field.id] : field.value,
                    }))}
                    onSubmit={handleFormSubmit}
                    submitButtonText={'Save'}
                />
            )}
        </MainTemplate>
    );
};

export default EditNotePage;
