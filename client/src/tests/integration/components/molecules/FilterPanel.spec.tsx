import { describe, it, expect } from 'vitest';
import FilterPanel from '../../../../components/molecules/FilterPanel/FilterPanel';
import { AppStore, sagaMiddleware } from '../../../../redux/store';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../../../../redux/reducers/notes/notesReducer';
import tagsReducer from '../../../../redux/reducers/tags/tagsReducer';
import rootSaga from '../../../../redux/actions/rootSaga';

describe('FilterPanel integration tests', () => {
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
                <FilterPanel />
            </Provider>
        );
    });

    it('renders the filter panel, click filter and check if store update it', async () => {
        await waitFor(() => {
            const state = store.getState();
            expect(state.tags.loading).toBe(false);
        });
        const filterPanel = screen.getByLabelText('filterPanel');
        expect(filterPanel).toBeInTheDocument();
        const filterPanelTrigger = filterPanel.querySelectorAll('button')[0];
        expect(filterPanelTrigger).toBeInTheDocument();
        await user.click(filterPanelTrigger);
        const tagFilter = await waitFor(
            () => filterPanel.querySelector('.filter-panel__tags')?.querySelectorAll('.tag__wrapper')[0]
        );
        expect(tagFilter).toBeInTheDocument();
        await user.click(tagFilter!);
        const filter = store.getState().notes.filter;
        await waitFor(() => expect(filter).toEqual(tagFilter!.textContent?.replace('#', '')));
    });
});
