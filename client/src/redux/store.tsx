import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { getNotes } from './actions/notes/notesSaga';
import notesReducer from './reducers/notes/notesReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

//sagaMiddleware.run(getNotes);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
