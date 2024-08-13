import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { InitialState } from './types';
import { Note } from '../notes/types';

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        getTags: state => ({
            ...state,
            loading: true,
            error: null,
        }),
        setTags: (state, action: PayloadAction<Pick<InitialState, 'items'>>) => ({
            ...state,
            loading: false,
            items: action.payload.items,
        }),
        addTag: (state, _action: PayloadAction<Omit<Note, 'id'>>) => ({
            ...state,
            loading: true,
        }),
    },
});

export const { setTags, getTags, addTag } = tagsSlice.actions;

export default tagsSlice.reducer;
