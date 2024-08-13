import { put, call, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { Note, NotesState } from '../../reducers/notes/types';
import { BACKEND, NOTES } from '../../endpoints';
import {
    addNote,
    deleteNote,
    getNote,
    getNotes,
    setFilter,
    setNote,
    setNotes,
    updateNote,
} from '../../reducers/notes/notesReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../../reducers/notes/initialState';

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

export function* getNotesByFilter(action: PayloadAction<Pick<InitialState, 'filter'>>) {
    const tag = action.payload.filter;
    try {
        const response: GetNotesResponse = yield call(axios.get, `${BACKEND}${NOTES}/tags/${tag}`);
        const notes: NotesState = response.data;
        yield put(setNotes(notes));
    } catch (error) {
        console.log(error);
    }
}

export function* getNoteById(action: PayloadAction<Note>) {
    const id = action.payload.id;
    try {
        const response: AxiosResponse<Note> = yield call(axios.get, `${BACKEND}${NOTES}/${id}`);
        const note: Note = response.data;
        yield put(setNote(note));
    } catch (error) {
        console.log(error);
    }
}

export function* addNoteSaga(action: PayloadAction<Note>) {
    const requestBody = {
        fav: action.payload.fav,
        tags: action.payload.tags,
        variant: action.payload.color,
        title: action.payload.title,
        description: action.payload.description,
        created_at: action.payload.created_at,
    };

    try {
        yield call(axios.post, `${BACKEND}${NOTES}`, requestBody);
        yield call(axios.get, `${BACKEND}${NOTES}`);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export function* deleteNoteSaga(action: PayloadAction<Note>) {
    const id = action.payload.id;
    try {
        yield call(axios.delete, `${BACKEND}${NOTES}/${id}`);
        yield call(axios.get, `${BACKEND}${NOTES}`);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export function* updateNoteSaga(action: PayloadAction<Note>) {
    const id = action.payload.id;
    const requestBody = {
        title: action.payload.title,
        description: action.payload.description,
    };
    try {
        yield call(axios.put, `${BACKEND}${NOTES}/${id}`, requestBody);
        yield call(axios.get, `${BACKEND}${NOTES}`);
        yield call(getNotesSaga);
    } catch (error) {
        console.log(error);
    }
}

export default function* notesSaga() {
    yield takeEvery(getNotes.type, getNotesSaga);
    yield takeEvery(addNote.type, addNoteSaga);
    yield takeEvery(deleteNote.type, deleteNoteSaga);
    yield takeEvery(getNote.type, getNoteById);
    yield takeEvery(updateNote.type, updateNoteSaga);
    yield takeEvery(setFilter.type, getNotesByFilter);
}
