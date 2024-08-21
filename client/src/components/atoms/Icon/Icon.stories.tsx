import { Meta, StoryObj } from '@storybook/react';
import { IconMap } from '../Icon/constants';
import Icon, { IconProps } from './Icon';
import StoryBlock from '../../../utils/storybook/StoryBlock';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    argTypes: {
        variant: {
            control: 'select',
            options: Object.keys(IconMap),
        },
    },
};

export default meta;

export const IconStory: StoryObj<IconProps> = {
    args: {
        variant: 'search',
    },

    render: args => {
        return (
            <>
                <StoryBlock title="Controllable icon">
                    <table>
                        <thead>
                            <tr>
                                <td>control</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Icon {...args} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Icon variants">
                    <table>
                        <thead>
                            <tr>
                                <td>add</td>
                                <td>delete</td>
                                <td>edit</td>
                                <td>back</td>
                                <td>star</td>
                                <td>filter</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Icon variant="add" />
                                </td>
                                <td>
                                    <Icon variant="delete" />
                                </td>
                                <td>
                                    <Icon variant="edit" />
                                </td>
                                <td>
                                    <Icon variant="back" />
                                </td>
                                <td>
                                    <Icon variant="star" />
                                </td>
                                <td>
                                    <Icon variant="filter" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
