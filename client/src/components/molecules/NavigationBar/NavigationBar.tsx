import React from 'react';

interface NavigationBarProps {
    children: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ children }) => {
    return (
        <nav className="nav">
            <ul className="nav-list">{children}</ul>
        </nav>
    );
};

export default NavigationBar;
