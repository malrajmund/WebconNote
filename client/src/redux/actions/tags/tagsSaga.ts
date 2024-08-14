import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { BACKEND, NOTES, TAGS } from '../../endpoints';
import { addTag, deleteTag, editTag, getTags, setTags } from '../../reducers/tags/tagsReducer';
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

export function* addTagSaga(action: PayloadAction<Note & { newTag: string }>) {
    const { id, newTag, tags } = action.payload;
    let requestBody;
    if (tags === '') {
        requestBody = { tags: newTag };
    } else {
        let requestTags = tags.split(',');
        requestTags.push(newTag);
        requestBody = {
            tags: requestTags.join(','),
        };
    }

    try {
        yield call(axios.put, `${BACKEND}${NOTES}/${id}`, requestBody);
        yield call(getTagsSaga);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export function* editTagSaga(
    action: PayloadAction<Pick<Note, 'id'> & { newTag: string; tags: string; oldTag: string }>
) {
    const { id, newTag, tags, oldTag } = action.payload;
    const requestBody = {
        tags: tags
            .split(',')
            .map(tagItem => (tagItem.trim() === oldTag ? newTag : tagItem.trim()))
            .join(','),
    };
    try {
        yield call(axios.put, `${BACKEND}${NOTES}/${id}`, requestBody);
        yield call(getTagsSaga);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export function* deleteTagSaga(action: PayloadAction<Pick<Note, 'id'> & { tagToDelete: string; oldTag: string }>) {
    const { id, tagToDelete, oldTag } = action.payload;
    const requestBody = {
        tags: oldTag
            .split(',')
            .filter(tagItem => tagItem.trim() !== tagToDelete)
            .join(','),
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
    yield takeEvery(editTag.type, editTagSaga);
    yield takeEvery(deleteTag.type, deleteTagSaga);
}
