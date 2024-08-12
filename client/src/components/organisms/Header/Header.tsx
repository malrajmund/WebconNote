import React from 'react';
import NavigationBar from '../../molecules/NavigationBar/NavigationBar';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div>
            <NavigationBar>SEARCH</NavigationBar>
        </div>
    );
};

export default Header;
