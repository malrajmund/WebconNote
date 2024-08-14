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
            className={`tag__wrapper ${onClick ? 'tag__wrapper--clickable' : ''} ${activeFilter === label ? 'tag__wrapper--active' : ''}`}
            onClick={onClick}
            {...rest}
        >
            #{label}
        </div>
    );
});

export default Tag;
