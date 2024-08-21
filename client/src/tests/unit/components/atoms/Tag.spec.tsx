import { render, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Tag from '../../../../components/atoms/Tag/Tag';

describe('Tag unit tests', () => {
    const user = userEvent.setup();

    let onClick: Mock;
    let label: string;

    beforeEach(() => {
        onClick = vi.fn();
        label = 'test';
    });

    afterEach(() => {
        onClick.mockClear();
    });

    it('renders the tag', () => {
        render(<Tag label={label} />);
        const tag = screen.getByText('#' + label);
        expect(tag).toBeInTheDocument();
    });

    it('renders the active tag', () => {
        render(<Tag label={label} activeFilter={label} />);
        const tag = screen.getByText('#' + label);
        expect(tag).toHaveClass('tag__wrapper--active');
    });

    it('should fire event on click', async () => {
        render(<Tag label={label} onClick={onClick} />);
        const tag = screen.getByText('#' + label);
        await user.click(tag);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
