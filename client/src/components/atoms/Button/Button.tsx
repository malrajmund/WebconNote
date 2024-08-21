import React, { ComponentPropsWithoutRef } from 'react';
import { ButtonVariantType } from './Button.types';
import Icon from '../Icon/Icon';
import { IconVariant } from '../Icon/Icon.types';
import clsx from 'clsx';
import { ButtonVariant } from './constants';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    iconVariant?: IconVariant;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, ...args: any[]) => void;
    buttonVariant?: ButtonVariantType;
    isAbsolute?: boolean;
    ariaLabel?: string;
};

const Button = React.memo(
    React.forwardRef<HTMLButtonElement, ButtonProps>(
        (
            {
                type = 'button',
                ariaLabel,
                buttonVariant = ButtonVariant.dark,
                children,
                onClick,
                iconVariant,
                isAbsolute,
            },
            ref
        ) => {
            const isVisibleChildren =
                children &&
                buttonVariant !== 'icon' &&
                buttonVariant !== 'note' &&
                buttonVariant !== 'note-fav' &&
                buttonVariant !== 'icon-active';
            return (
                <button
                    aria-label={ariaLabel}
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
