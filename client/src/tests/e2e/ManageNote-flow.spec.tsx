import { describe, it } from 'vitest';
import { render, waitFor, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../../redux/reducers/notes/notesReducer';
import tagsReducer from '../../redux/reducers/tags/tagsReducer';
import { AppStore } from '../../redux/store';
import App from '../../App';
import rootSaga from '../../redux/actions/rootSaga';
import createSagaMiddleware from 'redux-saga';

describe('Manage notes tests', () => {
    const sagaMiddleware = createSagaMiddleware();
    const user = userEvent.setup();
    let store: AppStore;
    let testTitle: string;
    let testDescription: string;

    beforeEach(() => {
        testTitle = 'Test title note';
        testDescription = 'Description of the note';

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
                <App />
            </Provider>
        );
    });

    it('add note and then delete', async () => {
        const addNoteButton = screen.getByLabelText('addNoteButton');
        expect(addNoteButton).toBeInTheDocument();
        await user.click(addNoteButton);

        const addNotePageHeading = await screen.findByText('Add note');
        expect(addNotePageHeading).toBeInTheDocument();

        const titleInput = await screen.findByLabelText('Title');
        expect(titleInput).toBeInTheDocument();
        await user.type(titleInput, testTitle);
        expect(titleInput).toHaveValue(testTitle);

        const descriptionInput = await screen.findByLabelText('Description');
        expect(descriptionInput).toBeInTheDocument();
        await user.type(descriptionInput, testDescription);
        expect(descriptionInput).toHaveValue(testDescription);

        const submitButton = screen.getByLabelText('submitFormButton');
        expect(submitButton).toBeInTheDocument();

        await user.click(submitButton);

        await waitFor(async () => {
            const homePageHeading = await screen.findByText('Homepage');

            expect(homePageHeading).toBeInTheDocument();
        });

        const noteComponent = (await screen.findByText(testTitle)).closest('li');
        expect(noteComponent).toBeInTheDocument();

        const deleteButton = within(noteComponent!).getByLabelText('deleteNoteButton');
        expect(deleteButton).toBeInTheDocument();
        await userEvent.click(deleteButton);

        const deleteNoteButtonModal = await screen.findByText('Delete');
        await userEvent.click(deleteNoteButtonModal);
    });
});
