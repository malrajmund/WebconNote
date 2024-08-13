import { ComponentPropsWithoutRef } from 'react';

type TagProps = ComponentPropsWithoutRef<'div'> & {
    label: string;
    onClick?: () => void;
    activeFilter?: string;
};

const Tag: React.FC<TagProps> = ({ label, onClick, activeFilter }) => {
    return (
        <div
            className={`tag__wrapper ${onClick ? 'tag__wrapper--clickable' : ''} ${activeFilter === label ? 'tag__wrapper--active' : ''}`}
            onClick={onClick && onClick}
        >
            #{label}
        </div>
    );
};

export default Tag;
