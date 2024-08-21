import { Meta, StoryObj } from '@storybook/react';

import StoryBlock from '../../../utils/storybook/StoryBlock';
import Tag, { TagProps } from './Tag';

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    argTypes: {
        label: {
            control: 'text',
        },
        activeFilter: {
            control: 'text',
            description: 'to make tag active u need activeFilter = label',
        },
        onClick: {
            control: 'boolean',
        },
    },
};

export default meta;

export const TagStory: StoryObj<TagProps> = {
    args: {
        label: 'control',
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
                                    <Tag {...args} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Icon variants">
                    <table>
                        <thead>
                            <tr>
                                <td>default</td>
                                <td>clickable</td>
                                <td>active</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Tag label="default" />
                                </td>
                                <td>
                                    <Tag label="pointer" onClick={() => null} />
                                </td>
                                <td>
                                    <Tag label="active" activeFilter="active" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
