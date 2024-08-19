import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';

type TagProps = ComponentPropsWithoutRef<'div'> & {
    label: string;
    onClick?: () => void;
    activeFilter?: string | null;
};

const Tag = React.forwardRef<HTMLDivElement, TagProps>(({ label, onClick, activeFilter, ...rest }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'tag__wrapper',
                { 'tag__wrapper--clickable': onClick },
                { 'tag__wrapper--active': activeFilter === label }
            )}
            onClick={onClick}
            {...rest}
        >
            #{label}
        </div>
    );
});

export default React.memo(Tag);
