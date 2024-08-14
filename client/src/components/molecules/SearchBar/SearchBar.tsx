import React, { ChangeEventHandler, useState } from 'react';
import { ButtonVariant } from '../../atoms/Button/constants';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import useClickOutside from '../../../utils/hooks/useClickOutside';
import { searchNotes, setFilter } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const ref = useClickOutside(() => setIsActive(false));

    const handleChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({ filter: '' }));
        dispatch(searchNotes({ query: e.target.value }));
    };

    return (
        <div className="search-bar__wrapper" ref={ref}>
            <Button buttonVariant={ButtonVariant.icon} iconVariant={'search'} onClick={() => setIsActive(!isActive)} />
            {isActive && (
                <div className="search-bar__input">
                    <Input onChange={handleChange} onBlur={() => setIsActive(false)} />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
