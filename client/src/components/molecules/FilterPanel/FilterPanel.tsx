import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import Tag from '../../atoms/Tag/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, getFavoriteNotes, setFilter } from '../../../redux/reducers/notes/notesReducer';
import { getTags } from '../../../redux/reducers/tags/tagsReducer';
import { AppState } from '../../../redux/store';

const FilterPanel: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isToggledFavorites, setIsToggledFavorites] = useState(false);
    const filter = useSelector((state: AppState) => state.notes.filter);
    const items = useSelector((state: AppState) => state.tags.items);
    const favoritesButtonVariant = isToggledFavorites ? ButtonVariant.light : ButtonVariant.dark;

    const handleToggleList = () => {
        return setIsOpen(!isOpen);
    };

    const handleFilter = useCallback(
        (clickedFilter: string) => {
            return () => {
                if (filter === clickedFilter) {
                    return resetFilter();
                }
                setIsToggledFavorites(false);
                dispatch(setFilter({ filter: clickedFilter }));
            };
        },
        [dispatch, filter]
    );

    const handleToggleFavorites = useCallback(() => {
        if (isToggledFavorites) {
            return resetFilter();
        } else {
            dispatch(clearFilter());
        }

        setIsToggledFavorites(true);
        dispatch(getFavoriteNotes());
    }, [dispatch, isToggledFavorites]);

    const resetFilter = useCallback(() => {
        setIsToggledFavorites(false);
        dispatch(setFilter({ filter: '' }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTags());
    }, []);

    return (
        <div aria-label="filterPanel" className="filter-panel__wrapper">
            <Button buttonVariant={ButtonVariant.icon} iconVariant="filter" onClick={handleToggleList} />
            {isOpen && (
                <div className="filter-panel__tags">
                    {items &&
                        items
                            .filter(tag => tag !== '')
                            .map((tag: string) => (
                                <Tag key={tag} activeFilter={filter} label={tag} onClick={handleFilter(tag)} />
                            ))}

                    <Button buttonVariant={favoritesButtonVariant} onClick={handleToggleFavorites} iconVariant="star">
                        Favorites
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
