export interface Note {
    id: string;
    fav: boolean;
    tags: string;
    [key: string]: unknown;
}

export type NotesState = Note[];
