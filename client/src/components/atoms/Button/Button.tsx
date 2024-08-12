import React, { ComponentPropsWithoutRef } from 'react';
import { ButtonVariantType } from './Button.types';
import Icon from '../Icon/Icon';
import { IconVariant } from '../Icon/Icon.types';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    iconVariant?: IconVariant;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    buttonVariant: ButtonVariantType;
};

const Button: React.FC<ButtonProps> = ({ children, buttonVariant, onClick, iconVariant, type }) => {
    return (
        <button type={type} onClick={onClick && onClick} className={`button button--${buttonVariant}`}>
            {iconVariant && <Icon variant={iconVariant} />}
            {children && buttonVariant !== 'icon' && buttonVariant !== 'note' && children}
        </button>
    );
};

export default Button;
