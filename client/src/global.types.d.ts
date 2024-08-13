export type MakeOptionalExceptId<T> = {
    [K in keyof T as K extends 'id' ? K : never]: T[K]; // Keep 'id' required
} & Partial<Omit<T, 'id'>>;
