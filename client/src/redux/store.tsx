import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import notesReducer from './reducers/notes/notesReducer';
import rootSaga from './actions/rootSaga';
import tagsReducer from './reducers/tags/tagsReducer';

export const channel = new BroadcastChannel('note_channel');

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        notes: notesReducer,
        tags: tagsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
