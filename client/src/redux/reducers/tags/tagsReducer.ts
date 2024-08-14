import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { TagsState } from './types';
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
        setTags: (state, action: PayloadAction<Pick<TagsState, 'items'>>) => ({
            ...state,
            loading: false,
            items: action.payload.items,
        }),
        addTag: (state, _action: PayloadAction<Omit<Note, 'id'>>) => ({
            ...state,
            loading: true,
        }),
        setTag: (state, action: PayloadAction<Pick<TagsState, 'currentTag'>>) => ({
            ...state,
            currentTag: action.payload.currentTag,
        }),
        editTag: (
            state,
            _action: PayloadAction<Pick<Note, 'id'> & { newTag: string; tags: string; oldTag: string }>
        ) => ({
            ...state,
        }),
        clearTag: (state, _action: PayloadAction) => ({
            ...state,
            currentTag: initialState.currentTag,
        }),
        deleteTag: (state, _action: PayloadAction<Pick<Note, 'id'> & { tagToDelete: string; oldTag: string }>) => ({
            ...state,
        }),
    },
});

export const { setTags, getTags, addTag, setTag, clearTag, editTag, deleteTag } = tagsSlice.actions;

export default tagsSlice.reducer;
