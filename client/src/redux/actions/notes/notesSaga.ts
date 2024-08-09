import { put, call, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { Note, NotesState } from '../../reducers/notes/types';
import { BACKEND, NOTES } from '../../endpoints';
import { addNote, getNotes, setNotes } from '../../reducers/notes/notesReducer';
import { PayloadAction } from '@reduxjs/toolkit';

type GetNotesResponse = AxiosResponse<NotesState>;

export function* getNotesSaga() {
    try {
        const response: GetNotesResponse = yield call(axios.get, `${BACKEND}${NOTES}`);
        const notes: NotesState = response.data;
        yield put(setNotes(notes));
    } catch (error) {
        console.log(error);
    }
}

export function* addNotesSaga(action: PayloadAction<Note>) {
    const requestBody = {
        fav: action.payload.fav,
        tags: action.payload.tags,
    };

    try {
        yield call(axios.post, `${BACKEND}${NOTES}`, requestBody);
        yield call(axios.get, `${BACKEND}${NOTES}`);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export default function* notesSaga() {
    yield takeEvery(getNotes.type, getNotesSaga);
    yield takeEvery(addNote.type, addNotesSaga);
}
