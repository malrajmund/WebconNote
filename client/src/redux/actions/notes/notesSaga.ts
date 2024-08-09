import { put, call } from 'redux-saga/effects';
import { GET_NOTES, ERROR_NOTES } from '../actionTypes';
import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { NotesState } from '../../reducers/notes/types';
import { NOTES } from '../../endpoints';

type GetNotesResponse = AxiosResponse<NotesState>;

interface ErrorAction extends Action<typeof ERROR_NOTES> {
    error: string | unknown;
}

interface SetNotesAction extends Action<typeof GET_NOTES> {
    notes: NotesState;
}

export function* getNotes() {
    try {
        const response: GetNotesResponse = yield call(axios.get, NOTES);
        const notes: NotesState = response.data;
        yield put<SetNotesAction>({ type: GET_NOTES, notes });
    } catch (error) {
        yield put<ErrorAction>({ type: ERROR_NOTES, error });
    }
}
