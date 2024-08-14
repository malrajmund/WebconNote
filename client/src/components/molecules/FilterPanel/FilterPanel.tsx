import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import Tag from '../../atoms/Tag/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteNotes, setFilter } from '../../../redux/reducers/notes/notesReducer';
import { getTags } from '../../../redux/reducers/tags/tagsReducer';
import { AppState } from '../../../redux/store';
import { TagsState } from '../../../redux/reducers/tags/types';

const FilterPanel: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isToggledFavorites, setIsToggledFavorites] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('');
    const { items, loading } = useSelector((state: AppState) => state.tags) as TagsState;

    const handleFilter = (filter: string) => {
        if (activeFilter === filter) {
            return resetFilter();
        }
        setIsToggledFavorites(false);
        setActiveFilter(filter);
        dispatch(setFilter({ filter: filter }));
    };

    const handleToggleFavorites = () => {
        if (isToggledFavorites) {
            return resetFilter();
        }
        setActiveFilter('');
        setIsToggledFavorites(true);
        dispatch(getFavoriteNotes());
    };

    const resetFilter = () => {
        setIsToggledFavorites(false);
        setActiveFilter('');
        dispatch(setFilter({ filter: '' }));
    };

    useEffect(() => {
        dispatch(getTags());
    }, []);

    return (
        <div className="filter-panel__wrapper">
            <Button buttonVariant={ButtonVariant.icon} iconVariant="filter" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <>
                    <div className="filter-panel__tags">
                        {!loading &&
                            items &&
                            items
                                .filter(tag => tag !== '')
                                .map((tag: string, index: number) => (
                                    <Tag
                                        key={index}
                                        activeFilter={activeFilter}
                                        label={tag}
                                        onClick={() => handleFilter(tag)}
                                    />
                                ))}
                    </div>
                    <Button
                        buttonVariant={isToggledFavorites ? ButtonVariant.light : ButtonVariant.dark}
                        onClick={() => handleToggleFavorites()}
                        iconVariant="star"
                    >
                        Favorites
                    </Button>
                </>
            )}
        </div>
    );
};

export default FilterPanel;
