import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';

interface FormFieldConfig {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string | unknown;
}

interface FormProps {
    fields: FormFieldConfig[];
    onSubmit: (formData: Record<string, string>) => void;
    submitButtonText: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitButtonText }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {})
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
        navigate('/');
    };

    return (
        <form className="form__wrapper" onSubmit={handleSubmit}>
            {fields.map(field => (
                <FormField
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id] || ''}
                    onChange={handleChange}
                    id={field.id}
                    placeholder={field.placeholder}
                />
            ))}
            <div className="form__button-wrapper">
                <Button type="submit" buttonVariant={ButtonVariant.light} onClick={handleSubmit}>
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
};

export default Form;
