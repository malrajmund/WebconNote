import { all } from 'redux-saga/effects';
import notesSaga from './notes/notesSaga';

export default function* rootSaga() {
    yield all([notesSaga()]);
}
