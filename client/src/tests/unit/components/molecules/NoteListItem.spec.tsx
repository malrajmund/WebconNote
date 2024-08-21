import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NoteListItem, { NoteProps } from '../../../../components/molecules/NoteListItem/NoteListItem';
import { Note } from '../../../../redux/reducers/notes/types';
import { NoteVariant } from '../../../../components/molecules/NoteListItem/constants';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('NoteListItem unit tests', () => {
    const props: Note & NoteProps = {
        variant: NoteVariant.primary,
        tags: 'tag1,tag2',
        fav: 'false',
        id: '1',
        created_at: new Date().toString(),
        title: 'Note',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac quam diam. Nullam aliquet neque nulla, luctus elementum nibh sollicitudin vitae. Curabitur accumsan lacus diam. Quisque malesuada massa vitae posuere suscipit. Fusce bibendum elementum lacinia. Cras convallis condimentum viverra. Pellentesque pharetra commodo dolor sed bibendum. In a massa mi.',
    };

    it('renders note', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NoteListItem
                        variant={props.variant}
                        id={props.id}
                        fav={props.fav}
                        tags={props.tags}
                        created_at={props.created_at}
                        description={props.description}
                        title={props.title}
                    />
                </BrowserRouter>
            </Provider>
        );
        const note = screen.getByLabelText('note');
        expect(note).toBeInTheDocument();
        const description = note.getElementsByClassName('note__description')[0].textContent;
        expect(description).toBe(props.description);
    });
});
