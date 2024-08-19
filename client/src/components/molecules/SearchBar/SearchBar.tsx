import React, { useCallback, useState } from 'react';
import { ButtonVariant } from '../../atoms/Button/constants';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import useClickOutside from '../../../utils/hooks/useClickOutside';
import { searchNotes, setFilter } from '../../../redux/reducers/notes/notesReducer';
import { useDispatch } from 'react-redux';

const SearchBar: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const ref = useClickOutside(() => setIsActive(false));

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFilter({ filter: '' }));
            dispatch(searchNotes({ query: e.target.value }));
        },
        [dispatch]
    );

    const handleToggle = useCallback(() => {
        setIsActive(prev => !prev);
    }, []);

    const handleBlur = useCallback(() => {
        setIsActive(false);
    }, []);

    return (
        <div className="search-bar__wrapper" ref={ref}>
            <Button buttonVariant={ButtonVariant.icon} iconVariant={'search'} onClick={handleToggle} />
            {isActive && (
                <div className="search-bar__input">
                    <Input onChange={handleChange} onBlur={handleBlur} />
                </div>
            )}
        </div>
    );
});

export default SearchBar;
