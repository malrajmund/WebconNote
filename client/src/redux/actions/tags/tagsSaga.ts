import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { BACKEND, NOTES, TAGS } from '../../endpoints';
import { addTag, getTags, setTags } from '../../reducers/tags/tagsReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../reducers/notes/types';
import { getNotesSaga } from '../notes/notesSaga';

type GetTagsResponse = AxiosResponse;

export function* getTagsSaga() {
    try {
        const response: GetTagsResponse = yield call(axios.get, `${BACKEND}${TAGS}`);
        const tags = response.data;
        yield put(setTags({ items: tags }));
    } catch (error) {
        console.log(error);
    }
}

export function* addTagSaga(action: PayloadAction<Note>) {
    const id = action.payload.id;
    const requestBody = {
        tags: action.payload.tags ? action.payload.tags : '',
    };
    try {
        yield call(axios.put, `${BACKEND}${NOTES}/${id}`, requestBody);
        yield call(getTagsSaga);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export default function* tagsSaga() {
    yield takeEvery(getTags.type, getTagsSaga);
    yield takeEvery(addTag.type, addTagSaga);
}
