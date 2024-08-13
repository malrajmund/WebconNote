import { all } from 'redux-saga/effects';
import notesSaga from './notes/notesSaga';
import tagsSaga from './tags/tagsSaga';

export default function* rootSaga() {
    yield all([notesSaga(), tagsSaga()]);
}
