import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { Note, NotesState } from './types';

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getNotes(state) {
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
    },
});

export const { setNotes, getNotes, addNote } = notesSlice.actions;

export default notesSlice.reducer;
