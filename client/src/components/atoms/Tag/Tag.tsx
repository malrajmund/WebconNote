import { ComponentPropsWithoutRef } from 'react';

type TagProps = ComponentPropsWithoutRef<'div'> & {
    label: string;
};

const Tag: React.FC<TagProps> = ({ label }) => {
    return <div className="tag__wrapper">#{label}</div>;
};

export default Tag;
