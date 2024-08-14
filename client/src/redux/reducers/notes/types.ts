import { NoteVariantType } from '../../../components/molecules/NoteListItem/NoteListItem.types';

export interface Note {
    id: string;
    fav: boolean | string;
    tags: string;
    variant: NoteVariantType;
    created_at: string;
    description: string;
    title: string;
    [key: string]: unknown;
}

export type NotesState = Note[];
