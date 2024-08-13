import Popup from 'reactjs-popup';
import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';

type ModalProps = {
    trigger: React.ReactNode;
    title: string;
    id: string;
    children: React.ReactElement;
    onOpen: () => void;
    noHeight?: boolean;
};

const Modal: React.FC<ModalProps> = ({ trigger, title, children, onOpen, noHeight }) => {
    const [isOpen, setIsOpen] = useState(false);
    const childWithProps = React.cloneElement(children, { setIsOpen, isOpen });

    return (
        <Popup
            open={isOpen}
            trigger={trigger}
            modal
            closeOnEscape
            closeOnDocumentClick
            nested
            onOpen={() => {
                onOpen && onOpen();
                setIsOpen(true);
            }}
            onClose={() => setIsOpen(false)}
        >
            <Button buttonVariant={ButtonVariant.icon} iconVariant="back" onClick={() => setIsOpen(false)} isAbsolute />
            <h2 className="popup-header">{title}</h2>
            <div className={`popup-body ${noHeight ? 'popup-body--no-height' : ''}`}>{childWithProps}</div>
        </Popup>
    );
};

export default Modal;
