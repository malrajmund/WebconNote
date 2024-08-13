import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { Note, NotesState } from './types';

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
            loading: true,
        }),
        setNote: (state, action: PayloadAction<Note>) => ({
            ...state,
            loading: false,
            currentNote: {
                title: action.payload.title,
                description: action.payload.description,
                variant: action.payload.variant,
                id: action.payload.id,
            },
        }),
        clearNote: (state, _action: PayloadAction) => ({
            ...state,
            loading: false,
            currentNote: initialState.currentNote,
        }),
        updateNote: (state, _action: PayloadAction<Pick<Note, 'id' | 'title' | 'description'>>) => ({
            ...state,
            loading: true,
        }),
    },
});

export const { setNotes, getNotes, addNote, deleteNote, getNote, setNote, updateNote, clearNote } = notesSlice.actions;

export default notesSlice.reducer;
