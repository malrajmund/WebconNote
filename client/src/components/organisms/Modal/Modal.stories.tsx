/* cSpell:disable */
import { Meta, StoryObj } from '@storybook/react';
import StoryBlock from '../../../utils/storybook/StoryBlock';
import Modal, { ModalProps } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    argTypes: {
        title: {
            control: 'text',
        },
        children: {
            control: 'select',
            options: [<input type="password" />, <input type="text" />],
        },
    },
};

export default meta;

export const ModalStory: StoryObj<ModalProps> = {
    args: {
        trigger: <button>open controllable modal</button>,
        title: 'Title',
        children: <input type="password" />,
    },

    render: args => {
        return (
            <>
                <StoryBlock title="Controllable note">
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Modal {...args} />
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
                                <td></td>
                                <td></td>
                                <td></td>
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
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
