import React, { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
    onChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Input: React.FC<InputProps> = ({ onChange, value, type, placeholder, className, id, onBlur }) => {
    return type !== 'textarea' ? (
        <input
            id={id}
            onChange={onChange}
            value={value}
            type={type}
            placeholder={placeholder}
            className={className}
            onBlur={onBlur}
        />
    ) : (
        <textarea
            id={id}
            onChange={onChange as ChangeEventHandler<HTMLTextAreaElement>}
            value={value}
            placeholder={placeholder}
            className={className}
            rows={5}
            maxLength={300}
        />
    );
};

export default Input;
