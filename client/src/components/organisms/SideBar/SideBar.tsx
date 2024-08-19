import React, { useCallback } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '../../molecules/FilterPanel/FilterPanel';
import SearchBar from '../../molecules/SearchBar/SearchBar';

type SideBarProps = {
    isHomepage: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ isHomepage }) => {
    const navigate = useNavigate();
    const handleAddNoteClick = useCallback(() => navigate('add-note'), [navigate]);
    const handleBackClick = useCallback(() => navigate('/'), [navigate]);

    return (
        <aside className="sidebar__wrapper">
            <h1 className="sidebar__title">WebconNote</h1>

            {!isHomepage && (
                <Button buttonVariant={ButtonVariant.icon} iconVariant={'back'} onClick={handleBackClick} />
            )}

            {isHomepage && (
                <>
                    <Button buttonVariant={ButtonVariant.icon} iconVariant={'add'} onClick={handleAddNoteClick} />
                    <SearchBar />
                    <FilterPanel />
                </>
            )}
        </aside>
    );
};

export default React.memo(SideBar);
