import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { Note, NotesState } from './types';

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getNotes: state => {
            state.loading = true;
            state.error = null;
        },
        setNotes: (state, action: PayloadAction<NotesState>) => ({
            ...state,
            loading: false,
            items: [...action.payload],
        }),
        addNote: (state, _action: PayloadAction<Omit<Note, 'id'>>) => ({
            ...state,
        }),
        deleteNote: (state, _action: PayloadAction<Pick<Note, 'id'>>) => ({
            ...state,
        }),
        getNote: (state, _action: PayloadAction<Pick<Note, 'id'>>) => ({
            ...state,
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
    },
});

export const { setNotes, getNotes, addNote, deleteNote, getNote, setNote } = notesSlice.actions;

export default notesSlice.reducer;
