import { render, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ButtonVariantType } from '../../../../components/atoms/Button/Button.types';
import { ButtonVariant } from '../../../../components/atoms/Button/constants';
import { IconVariant } from '../../../../components/atoms/Icon/Icon.types';
import Button from '../../../../components/atoms/Button/Button';

describe('Button unit tests', () => {
    const user = userEvent.setup();
    let buttonVariant: ButtonVariantType;
    let text: string;
    let iconVariant: IconVariant;
    let isAbsolute: boolean;
    let onClick: Mock;

    beforeEach(() => {
        text = 'test';
        buttonVariant = ButtonVariant.dark;
        iconVariant = 'star';
        isAbsolute = true;
        onClick = vi.fn();
    });

    afterEach(() => {
        onClick.mockClear();
    });

    it('renders the button with the correct text', () => {
        render(<Button buttonVariant={buttonVariant}>{text}</Button>);
        const button = screen.getByText(text);
        expect(button).toBeInTheDocument();
    });

    it('renders the button with the correct variant', () => {
        render(<Button buttonVariant={buttonVariant}>{text}</Button>);
        const button = screen.getByText(text);
        expect(button).toHaveClass('button', `button--${buttonVariant}`);
    });

    it('renders the button with the correct icon variant', () => {
        render(
            <Button buttonVariant={buttonVariant} iconVariant={iconVariant}>
                {text}
            </Button>
        );
        const button = screen.getByText(text);
        const svgElement = button.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    it('render the button as absolute', () => {
        render(
            <Button buttonVariant={buttonVariant} iconVariant={iconVariant} isAbsolute={isAbsolute}>
                {text}
            </Button>
        );
        const button = screen.getByText(text);
        expect(button).toHaveClass('button', `button--absolute`);
    });

    it('render the button with icon only', () => {
        render(
            <Button buttonVariant={ButtonVariant.icon} iconVariant={iconVariant} isAbsolute={isAbsolute}>
                {text}
            </Button>
        );
        const button = screen.getByRole('button');
        expect(button).not.toHaveTextContent(text);
    });

    it('should fire event on click', async () => {
        render(<Button onClick={onClick}>{text}</Button>);
        const button = screen.getByText(text);
        await user.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
