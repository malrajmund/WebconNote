import React from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import NotesList from '../../organisms/NotesList/NotesList';

const HomePage: React.FC = () => {
    return (
        <div>
            <MainTemplate>
                <NotesList />
            </MainTemplate>
        </div>
    );
};

export default HomePage;
