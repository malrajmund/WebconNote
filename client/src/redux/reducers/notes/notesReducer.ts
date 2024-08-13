import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, initialState } from './initialState';
import { Note, NotesState } from './types';
import { MakeOptionalExceptId } from '../../../global.types';

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getNotes: state => ({
            ...state,
            loading: true,
            error: null,
        }),
        setNotes: (state, action: PayloadAction<NotesState>) => ({
            ...state,
            loading: false,
            items: [...action.payload],
        }),
        addNote: (state, _action: PayloadAction<Omit<Note, 'id'>>) => ({
            ...state,
            loading: true,
        }),
        deleteNote: (state, _action: PayloadAction<Pick<Note, 'id'>>) => ({
            ...state,
            loading: true,
        }),
        getNote: (state, _action: PayloadAction<Pick<Note, 'id'>>) => ({
            ...state,
            currentNote: { ...state.currentNote, loading: true },
        }),
        setNote: (state, action: PayloadAction<Note>) => ({
            ...state,
            currentNote: {
                title: action.payload.title,
                description: action.payload.description,
                variant: action.payload.variant,
                id: action.payload.id,
                tags: action.payload.tags,
                loading: false,
            },
        }),
        clearNote: (state, _action: PayloadAction) => ({
            ...state,
            currentNote: initialState.currentNote,
        }),
        updateNote: (state, _action: PayloadAction<MakeOptionalExceptId<Note>>) => ({
            ...state,
            loading: true,
        }),
        setFilter: (state, action: PayloadAction<Pick<InitialState, 'filter'>>) => ({
            ...state,
            filter: action.payload.filter,
        }),
    },
});

export const { setNotes, getNotes, addNote, deleteNote, getNote, setNote, updateNote, clearNote, setFilter } =
    notesSlice.actions;

export default notesSlice.reducer;
