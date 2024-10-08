export const BACKEND = 'http://localhost:3000';

/**
 * @method GET
 * @description Zwraca kolekcje notatek.
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 * {...rest} - pozostałe pola
 *
 * @method GET
 * @description Zwraca notatke o podanym ID.
 * @param {id} - id notatki
 * @example /notes/10
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 * {...rest} - pozostałe pola
 *
 *  * @method GET
 * @description Zwraca notatki o podanym tagu.
 * @param {tag} - tag
 * @example /notes/tags/tag891
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 * {...rest} - pozostałe pola
 *
 * @method POST
 * @description Dodaje nową notatkę.
 * @body
 * {tags} - przypisane tagi do kategoryzacji
 * {fav} - czy jest w ulubionych?
 * {...rest} - pozostałe pola
 *
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 *
 * @method PUT
 * @description Aktualizacja notatki.
 * @param {id} - id notatki
 * @example /notes/10
 * @body
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 *
 * @method DELETE
 * @description Usunięcie notatki.
 * @param {id} - id notatki
 * @example /notes/10
 */
export const NOTES = '/notes';

/**
 * @method GET
 * @description Zwraca kolekcje tagów.
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 * {...rest} - pozostałe pola
 *
 */
export const TAGS = '/tags';

/**
 * @method GET
 * @description Zwraca kolekcje notatek na podstawie query.
 * @param {q} - wyszukiwana fraza.
 * @returns
 * * Obiekt JSON z polami:
 * {id} - id notatki
 * {fav} - czy jest w ulubionych?
 * {tags} - tag do kategoryzacji
 * {...rest} - pozostałe pola
 *
 */
export const SEARCH = '/search';
