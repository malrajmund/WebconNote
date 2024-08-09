import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { NotesState } from './types';

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotesId: (state, action: PayloadAction<NotesState>) => ({
            ...state,
            notes: action.payload,
        }),
    },
});

export const { setNotesId } = notesSlice.actions;

export default notesSlice.reducer;
