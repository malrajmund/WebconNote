import { ComponentPropsWithoutRef } from 'react';

type TagProps = ComponentPropsWithoutRef<'div'> & {
    label: string;
    onClick?: () => void;
};

const Tag: React.FC<TagProps> = ({ label, onClick }) => {
    return (
        <div className={`tag__wrapper ${onClick ? 'tag__wrapper--clickable' : ''}`} onClick={onClick && onClick}>
            #{label}
        </div>
    );
};

export default Tag;
