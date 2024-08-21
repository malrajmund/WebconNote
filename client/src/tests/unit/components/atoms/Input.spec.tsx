import { render, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Input from '../../../../components/atoms/Input/Input';

describe('Input unit tests', () => {
    const user = userEvent.setup();

    let onChange: Mock;
    let onBlur: Mock;
    let typeValue: string;

    beforeEach(() => {
        onChange = vi.fn();
        onBlur = vi.fn();
        typeValue = 'test';
    });

    afterEach(() => {
        onChange.mockClear();
        onBlur.mockClear();
    });

    it('renders the input', () => {
        render(<Input onChange={onChange} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('renders the input with focus', async () => {
        render(<Input onChange={onChange} />);
        const input = screen.getByRole('textbox');
        await user.click(input);
        expect(input).toHaveFocus();
    });

    it('render the controlled input', async () => {
        render(<Input onChange={onChange} onBlur={onBlur} />);
        const input = screen.getByRole('textbox');
        await user.type(input, typeValue);
        expect(input).toHaveValue(typeValue);
        expect(onChange).toHaveBeenCalledTimes(typeValue.length);
    });

    it('renders the input without focus and run onBlur function', async () => {
        render(<Input onChange={onChange} onBlur={onBlur} />);
        const input = screen.getByRole('textbox');
        await user.click(input);
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);
        await user.click(outsideElement);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });
});
