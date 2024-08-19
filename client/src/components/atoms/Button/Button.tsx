import React, { ComponentPropsWithoutRef } from 'react';
import { ButtonVariantType } from './Button.types';
import Icon from '../Icon/Icon';
import { IconVariant } from '../Icon/Icon.types';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    iconVariant?: IconVariant;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, ...args: any[]) => void;
    buttonVariant: ButtonVariantType;
    isAbsolute?: boolean;
};

const Button = React.memo(
    React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ children, buttonVariant, onClick, iconVariant, type = 'button', isAbsolute }, ref) => {
            return (
                <button
                    ref={ref}
                    type={type}
                    onClick={onClick && onClick}
                    className={`button button--${buttonVariant} ${isAbsolute ? 'button--absolute' : ''}`}
                >
                    {iconVariant && <Icon variant={iconVariant} />}
                    {children &&
                        buttonVariant !== 'icon' &&
                        buttonVariant !== 'note' &&
                        buttonVariant !== 'note-fav' &&
                        children}
                </button>
            );
        }
    )
);

export default Button;
