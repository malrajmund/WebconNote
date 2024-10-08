import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { ButtonVariant } from './constants';
import { IconMap } from '../Icon/constants';
import StoryBlock from '../../../utils/storybook/StoryBlock';

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
        type: {
            control: 'text',
        },
    },
};

export default meta;

export const ButtonStory: StoryObj<ButtonProps> = {
    args: {
        children: 'Controllable button',
        buttonVariant: ButtonVariant.dark,
        iconVariant: 'default',
        type: 'button',
    },

    render: args => {
        return (
            <>
                <StoryBlock title="Controllable button">
                    <table>
                        <thead>
                            <tr>
                                <td>control</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Button {...args} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Button variants">
                    <table>
                        <thead>
                            <tr>
                                <td>light</td>
                                <td>edit</td>
                                <td>star</td>
                                <td>filter</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Button buttonVariant={ButtonVariant.light}>Light</Button>
                                </td>
                                <td>
                                    <Button buttonVariant={ButtonVariant.note} iconVariant="edit" />
                                </td>
                                <td>
                                    <Button buttonVariant={ButtonVariant['note-fav']} iconVariant="star" />
                                </td>
                                <td>
                                    <Button buttonVariant={ButtonVariant.icon} iconVariant="filter" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
