/* cSpell:disable */
import { Meta, StoryObj } from '@storybook/react';
import StoryBlock from '../../../utils/storybook/StoryBlock';
import NoteListItem, { NoteProps } from './NoteListItem';
import { Note } from '../../../redux/reducers/notes/types';
import { NoteVariant } from './constants';

const meta: Meta<typeof NoteListItem> = {
    title: 'Components/NoteListItem',
    component: NoteListItem,
    argTypes: {
        id: { table: { disabled: true } },
        fav: {
            control: 'select',
            options: ['true', 'false'],
        },
        created_at: {
            control: 'text',
        },
        variant: {
            control: 'select',
            options: Object.keys(NoteVariant),
        },
        title: {
            control: 'text',
        },
        description: {
            control: 'text',
        },
        tags: {
            control: 'text',
        },
    },
};

export default meta;

export const NoteListItemStory: StoryObj<Note & NoteProps> = {
    args: {
        fav: 'true',
        created_at: '21.08.2024',
        variant: NoteVariant.secondary,
        title: 'Note',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        tags: 'tag,another',
    },

    render: args => {
        return (
            <>
                <StoryBlock title="Controllable note">
                    <table>
                        <thead>
                            <tr>
                                <td>control</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <NoteListItem {...args} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Note variants">
                    <table>
                        <thead>
                            <tr>
                                <td>primary</td>
                                <td>secondary</td>
                                <td>tertiary</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <NoteListItem
                                        id="1"
                                        fav="false"
                                        variant={NoteVariant.primary}
                                        tags=""
                                        title="Primary note title"
                                        description="Primary note description."
                                        created_at="10.08.2024"
                                    />
                                </td>
                                <td>
                                    <NoteListItem
                                        id="2"
                                        fav="false"
                                        variant={NoteVariant.secondary}
                                        tags=""
                                        title="Secondary note title"
                                        description="Secondary note description."
                                        created_at="10.08.2024"
                                    />
                                </td>
                                <td>
                                    <NoteListItem
                                        id="3"
                                        fav="false"
                                        variant={NoteVariant.tertiary}
                                        tags=""
                                        title="Tertiary note title"
                                        description="Tertiary note description."
                                        created_at="10.08.2024"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Overflow">
                    <table>
                        <thead>
                            <tr>
                                <td>overflow check</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <NoteListItem
                                        id="4"
                                        fav="false"
                                        variant={NoteVariant.tertiary}
                                        tags="so, many, tags, here, checking, display, of, tags, testiiiiiiing"
                                        title="Very long title Very long title Very long title"
                                        description="Fusce maximus, dolor et pellentesque venenatis, ante lacus dapibus velit, et mattis lorem quam quis purus. Nam interdum, tortor suscipit lobortis tincidunt, felis lorem consectetur nibh, eu tempor neque orci quis sem. Praesent ac convallis mi, quis malesuada odio. Donec consequat fermentum metus, id dictum lacus porta et. Duis dictum finibus ante nec laoreet. Sed porttitor tempus lacus. Nam vitae tincidunt erat. Sed sodales metus id massa consequat feugiat. Sed pulvinar laoreet scelerisque. Nullam et vehicula nisl, eget commodo tellus. Vivamus tincidunt dignissim lectus vulputate lacinia. Sed et rutrum neque. Donec sed dolor dictum, dignissim arcu sit amet, aliquam ex. Sed lectus nibh, commodo non sodales id, egestas non magna. Cras id efficitur nibh, id molestie nulla. Aenean iaculis, magna in rutrum"
                                        created_at="10.08.2024"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
