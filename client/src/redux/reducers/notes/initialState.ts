import { NoteVariantType } from '../../../components/molecules/NoteListItem/NoteListItem.types';
import { NotesState, Note } from './types';

interface CurrentNote extends Omit<Note, 'id' | 'variant'> {
    id: string | null;
    variant: NoteVariantType | null;
}
export interface InitialState {
    items: NotesState;
    currentNote: CurrentNote;
    filter: null | string;
    loading: boolean;
    error: string | null;
}

export const initialState: InitialState = {
    items: [] as NotesState,
    currentNote: {
        id: null,
        title: '',
        description: '',
        variant: null,
        loading: false,
    },
    filter: null,
    loading: false,
    error: null,
};
