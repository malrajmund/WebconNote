import React, { ComponentPropsWithoutRef } from 'react';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Input: React.FC<InputProps> = ({ onChange, value, type, placeholder, className, id }) => {
    return type !== 'textarea' ? (
        <input id={id} onChange={onChange} value={value} type={type} placeholder={placeholder} className={className} />
    ) : (
        <textarea
            id={id}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={className}
            rows={5}
            maxLength={300}
        />
    );
};

export default Input;
