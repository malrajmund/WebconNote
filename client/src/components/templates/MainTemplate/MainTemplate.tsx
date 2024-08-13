import React from 'react';
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import SideBar from '../../organisms/SideBar/SideBar';

interface MainTemplateProps {
    children: React.ReactNode;
    noHeader?: boolean;
    noFooter?: boolean;
    isHomepage?: boolean;
    title: string;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children, noHeader, noFooter, isHomepage = false, title }) => {
    return (
        <>
            <SideBar isHomepage={isHomepage} />
            <main className="main-template__content">
                <h1 className="main-template__title">{title}</h1>
                {!noHeader && <Header />}
                {children}
                {!noFooter && <Footer />}
            </main>
        </>
    );
};

export default MainTemplate;
