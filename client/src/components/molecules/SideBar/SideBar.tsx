import React from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';

type SideBarProps = {
    isHomepage: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ isHomepage }) => {
    const navigate = useNavigate();

    const handleButton = () => {
        isHomepage && navigate('add-note');
        !isHomepage && navigate('/');
    };

    return (
        <aside className="sidebar__wrapper">
            <h1 className="sidebar__title">WebconNote</h1>
            <Button
                buttonVariant={ButtonVariant.icon}
                iconVariant={isHomepage ? 'add' : 'back'}
                onClick={handleButton}
            ></Button>
        </aside>
    );
};

export default SideBar;
