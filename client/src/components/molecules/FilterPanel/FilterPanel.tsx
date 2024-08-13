import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import Tag from '../../atoms/Tag/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/reducers/notes/notesReducer';
import { getTags } from '../../../redux/reducers/tags/tagsReducer';
import { AppState } from '../../../redux/store';

const FilterPanel: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { items } = useSelector((state: AppState) => state.tags);

    const handleFilter = (filter: string) => {
        dispatch(setFilter({ filter: filter }));
    };

    useEffect(() => {
        dispatch(getTags());
    }, []);

    return (
        <div className="filter-panel__wrapper">
            <Button buttonVariant={ButtonVariant.icon} iconVariant="filter" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div className="filter-panel__tags">
                    {items &&
                        items
                            .filter(tag => tag !== '')
                            .map((tag: string) => <Tag label={tag} onClick={() => handleFilter(tag)} />)}
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
