import React from 'react';

export type LabelProps = {
    label: string;
    id: string;
    className?: string;
};

const Label: React.FC<LabelProps> = ({ label, id, className }) => {
    return (
        <label className={className} htmlFor={id}>
            {label}
        </label>
    );
};

export default Label;
