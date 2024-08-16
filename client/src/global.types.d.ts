export type MakeOptionalExceptId<T> = {
    [K in keyof T as K extends 'id' ? K : never]: T[K];
} & Partial<Omit<T, 'id'>>;
