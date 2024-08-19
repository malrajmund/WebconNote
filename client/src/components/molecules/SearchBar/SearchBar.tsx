import React, { useCallback, useState } from 'react';
import { ButtonVariant } from '../../atoms/Button/constants';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import { searchNotes, setFilter } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

const SearchBar: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const buttonVariantOnClick = isActive ? ButtonVariant['icon-active'] : ButtonVariant.icon;

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(searchNotes({ query: e.target.value }));
        },
        [dispatch]
    );

    const handleToggle = useCallback(() => {
        dispatch(setFilter({ filter: '' }));
        setIsActive(prev => !prev);
    }, [dispatch]);

    return (
        <div className="search-bar__wrapper">
            <Button buttonVariant={buttonVariantOnClick} iconVariant={'search'} onClick={handleToggle} />
            <div className={clsx('search-bar__input', { 'search-bar__input--visible': isActive })}>
                <Input onChange={handleChange} />
            </div>
        </div>
    );
});

export default SearchBar;
