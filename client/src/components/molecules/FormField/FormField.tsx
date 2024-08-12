import React from 'react';
import Label, { LabelProps } from '../../atoms/Label/Label';
import Input, { InputProps } from '../../atoms/Input/Input';

type FormFieldProps = LabelProps & InputProps;

const FormField: React.FC<FormFieldProps> = ({ label, id, type, value, onChange, placeholder }) => {
    return (
        <div className="form-field">
            <Label className="form-field__label" id={id} label={label} />
            <Input
                className="form-field__input"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
            />
        </div>
    );
};

export default FormField;
