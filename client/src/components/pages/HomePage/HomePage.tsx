import React from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import NotesList from '../../organisms/NotesList/NotesList';

const HomePage: React.FC = () => {
    return (
        <MainTemplate isHomepage title="Homepage">
            <NotesList />
        </MainTemplate>
    );
};

export default HomePage;
