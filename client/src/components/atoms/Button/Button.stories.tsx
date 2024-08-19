import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { ButtonVariant } from './constants';
import { IconMap } from '../Icon/constants';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        buttonVariant: {
            control: 'select',
            options: Object.values(ButtonVariant),
            description: 'The variant of the button.',
            defaultValue: ButtonVariant.dark,
        },
        iconVariant: {
            control: 'select',
            options: Object.keys(IconMap),
        },
    },
};

export default meta;

export const ButtonStory: StoryObj<ButtonProps> = {
    args: {
        children: 'Controllable button',
        buttonVariant: ButtonVariant.dark,
        iconVariant: 'default',
    },

    render: args => {
        return (
            <>
                <Button {...args} />
                <Button buttonVariant={ButtonVariant.light}>Light</Button>
                <Button buttonVariant={ButtonVariant.note} iconVariant="edit" />
                <Button buttonVariant={ButtonVariant['note-fav']} iconVariant="star" />
                <Button buttonVariant={ButtonVariant.icon} iconVariant="filter" />
            </>
        );
    },
};
