import React, { useEffect } from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import NotesList from '../../organisms/NotesList/NotesList';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../../../redux/reducers/notes/notesReducer';
import { AppState } from '../../../redux/store';
import Loader from '../../atoms/Loader/Loader';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state: AppState) => state.notes.items);
    const isLoading = useSelector((state: AppState) => state.notes.loading);

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    return (
        <MainTemplate noHeader noFooter isHomepage title="Homepage">
            {isLoading ? <Loader /> : <NotesList notes={notes} />}
        </MainTemplate>
    );
};

export default HomePage;
