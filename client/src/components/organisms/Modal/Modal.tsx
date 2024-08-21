import Popup from 'reactjs-popup';
import React, { useCallback, useState } from 'react';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import clsx from 'clsx';

export type ModalProps = {
    trigger: JSX.Element;
    title: string;
    id: string;
    children: React.ReactElement;
    onOpen?: () => void;
    onClose?: () => void;
    noHeight?: boolean;
};

const Modal: React.FC<ModalProps> = ({ trigger, title, children, onOpen, noHeight, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const childWithProps = React.cloneElement(children, { setIsOpen, isOpen });

    const handleOnOpen = useCallback(() => {
        onOpen && onOpen();
        setIsOpen(true);
    }, [onOpen]);

    const handleClose = useCallback(() => {
        onClose && onClose();
        setIsOpen(false);
    }, [onClose]);

    const handleCloseOnButton = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <Popup
            open={isOpen}
            trigger={trigger}
            modal
            closeOnEscape
            closeOnDocumentClick
            nested
            onOpen={handleOnOpen}
            onClose={handleClose}
        >
            <Button buttonVariant={ButtonVariant.icon} iconVariant="back" onClick={handleCloseOnButton} isAbsolute />
            <h2 className="popup-header">{title}</h2>
            <div className={clsx('popup-body', { 'popup-body--no-height': noHeight })}>{childWithProps}</div>
        </Popup>
    );
};

export default Modal;
