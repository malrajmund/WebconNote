import React from 'react';

interface NavigationBarProps {
    children: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ children }) => {
    return <nav className="navigation__wrapper">{children}</nav>;
};

export default NavigationBar;
