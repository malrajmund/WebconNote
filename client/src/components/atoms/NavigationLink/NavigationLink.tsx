import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
    title: string;
    href: string;
    end?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ title, href, end }) => {
    return (
        <li className="nav-item">
            <NavLink to={href} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end={end}>
                {title}
            </NavLink>
        </li>
    );
};

export default NavigationLink;
