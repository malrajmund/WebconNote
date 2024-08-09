import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import notesReducer from './reducers/notes/notesReducer';
import rootSaga from './actions/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
