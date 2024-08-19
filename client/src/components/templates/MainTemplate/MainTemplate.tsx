import React from 'react';
import SideBar from '../../organisms/SideBar/SideBar';

interface MainTemplateProps {
    children: React.ReactNode;
    isHomepage?: boolean;
    title: string;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ isHomepage = false, children, title }) => {
    return (
        <>
            <SideBar isHomepage={isHomepage} />
            <main className="main-template__content">
                <h1 className="main-template__title">{title}</h1>
                {children}
            </main>
        </>
    );
};

export default MainTemplate;
