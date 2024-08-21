/* cSpell:disable */
import { Meta, StoryObj } from '@storybook/react';
import StoryBlock from '../../../utils/storybook/StoryBlock';
import Modal, { ModalProps } from './Modal';
import ConfirmationModal from './Variant/ConfirmationModal/ConfirmationModal';
import EditNoteModal from './Variant/EditNoteModal/EditNoteModal';
import ManageTagModal from './Variant/ManageTagModal/ManageTagModal';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    argTypes: {
        title: {
            control: 'text',
        },
        noHeight: {
            control: 'boolean',
        },
        children: {
            control: 'text',
        },
        onOpen: { table: { disable: true } },
        onClose: { table: { disable: true } },
        trigger: { table: { disable: true } },
        id: { table: { disable: true } },
    },
};

export default meta;

export const ModalStory: StoryObj<ModalProps> = {
    args: {
        trigger: <button>Trigger controllable modal</button>,
        title: 'Title',
        children: <>{'Some text in modal'}</>,
        onOpen: () => alert('You opened a modal.'),
        onClose: () => alert('You closed a modal.'),
        noHeight: true,
    },

    render: args => {
        return (
            <>
                <StoryBlock title="Controllable modal">
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Modal {...args}>
                                        <h2>{args.children}</h2>
                                    </Modal>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
                <StoryBlock title="Modal variants">
                    <table>
                        <thead>
                            <tr>
                                <td>confirmation</td>
                                <td>edit note</td>
                                <td>manage tag</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Modal
                                        title="Confirmation modal header"
                                        id="confirm"
                                        trigger={<button>Trigger confirmation modal</button>}
                                        noHeight
                                    >
                                        <ConfirmationModal
                                            header="Confirmation modal subheader"
                                            onConfirmText="Text on confirm button"
                                            onConfirm={() => alert('You confirm.')}
                                        />
                                    </Modal>
                                </td>
                                <td>
                                    <Modal
                                        title="Edit note modal header"
                                        id="editNote"
                                        trigger={<button>Trigger edit note modal</button>}
                                    >
                                        <EditNoteModal />
                                    </Modal>
                                </td>
                                <td>
                                    <Modal
                                        title="Manage tag modal header"
                                        id="confirm"
                                        trigger={<button>Trigger manage tag modal</button>}
                                        noHeight
                                    >
                                        <ManageTagModal />
                                    </Modal>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </StoryBlock>
            </>
        );
    },
};
