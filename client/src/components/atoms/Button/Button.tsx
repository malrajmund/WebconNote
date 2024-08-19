import React, { ComponentPropsWithoutRef } from 'react';
import { ButtonVariantType } from './Button.types';
import Icon from '../Icon/Icon';
import { IconVariant } from '../Icon/Icon.types';
import clsx from 'clsx';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    iconVariant?: IconVariant;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, ...args: any[]) => void;
    buttonVariant: ButtonVariantType;
    isAbsolute?: boolean;
};

const Button = React.memo(
    React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ type = 'button', children, buttonVariant, onClick, iconVariant, isAbsolute }, ref) => {
            const isVisibleChildren =
                children && buttonVariant !== 'icon' && buttonVariant !== 'note' && buttonVariant !== 'note-fav';
            return (
                <button
                    ref={ref}
                    type={type}
                    onClick={onClick && onClick}
                    className={clsx('button', `button--${buttonVariant}`, { 'button--absolute': isAbsolute })}
                >
                    {iconVariant && <Icon variant={iconVariant} />}
                    {isVisibleChildren && children}
                </button>
            );
        }
    )
);

export default Button;
