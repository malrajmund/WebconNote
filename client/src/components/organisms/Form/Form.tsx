import React, { useCallback, useEffect, useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { ButtonVariant } from '../../atoms/Button/constants';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export interface FormFieldConfig {
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
    heightFull?: boolean;
    flexColumn?: boolean;
    noBorder?: boolean;
    noPadding?: boolean;
    handleDelete?: () => void;
}

const Form: React.FC<FormProps> = ({
    heightFull = false,
    flexColumn = false,
    noBorder = false,
    noPadding = false,
    fields,
    onSubmit,
    submitButtonText,
    handleDelete,
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {})
    );

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            onSubmit(formData);
            navigate('/');
        },
        [formData]
    );

    useEffect(() => {
        let newFields = fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {});
        setFormData(newFields);
    }, [fields]);

    return (
        <form
            className={clsx(
                'form__wrapper',
                { 'form__wrapper--height-100': heightFull },
                { 'form__wrapper--no-border': noBorder },
                { 'form__wrapper--column': flexColumn },
                { 'form__wrapper--no-padding': noPadding }
            )}
            onSubmit={handleSubmit}
        >
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
                {handleDelete && (
                    <Button type="button" onClick={handleDelete} buttonVariant={ButtonVariant.light}>
                        Delete
                    </Button>
                )}
                <Button ariaLabel="submitFormButton" type="submit" buttonVariant={ButtonVariant.dark}>
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
};

export default Form;
