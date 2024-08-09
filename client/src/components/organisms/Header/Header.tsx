import React from 'react';
import NavigationLink from '../../atoms/NavigationLink/NavigationLink';
import NavigationBar from '../../molecules/NavigationBar/NavigationBar';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div>
            <NavigationBar>
                <NavigationLink title="Home" href="/" end />
                <NavigationLink title="Add" href="/add-note" end />
            </NavigationBar>
        </div>
    );
};

export default Header;
