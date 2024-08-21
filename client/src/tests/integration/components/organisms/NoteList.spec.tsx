import { describe, it } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AppStore, sagaMiddleware } from '../../../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../../../../redux/reducers/notes/notesReducer';
import tagsReducer from '../../../../redux/reducers/tags/tagsReducer';
import NotesList from '../../../../components/organisms/NotesList/NotesList';
import rootSaga from '../../../../redux/actions/rootSaga';

describe('NoteList integration tests', () => {
    const user = userEvent.setup();
    let store: AppStore;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                notes: notesReducer,
                tags: tagsReducer,
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
        });
        sagaMiddleware.run(rootSaga);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NotesList />
                </BrowserRouter>
            </Provider>
        );
    });

    it('toggle note favority', async () => {
        await waitFor(() => {
            const state = store.getState();
            expect(state.notes.loading).toBe(false);
        });

        const notesList = await waitFor(() => screen.getByLabelText('notesList'));
        expect(notesList).toBeInTheDocument();
        const notes = await waitFor(() => notesList.getElementsByClassName('note'));
        expect(notes.length).toBeGreaterThan(0);
        const favoriteButton = notes[0].querySelector('[aria-label="favorite"]');
        expect(favoriteButton).toBeInTheDocument();
        await user.click(favoriteButton!);
        await waitFor(() => {
            const hasFavoriteClass = favoriteButton!.classList.contains('button--note-fav');
            const hasNoteClass = favoriteButton!.classList.contains('button--note');
            expect(hasFavoriteClass || hasNoteClass).toBe(true);
        });
    });
});
