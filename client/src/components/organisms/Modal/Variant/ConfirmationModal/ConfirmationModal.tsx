import Button from '../../../../atoms/Button/Button';
import { ButtonVariant } from '../../../../atoms/Button/constants';

type ConfirmationModalProps = {
    onConfirm: () => void;
    header: string;
    onConfirmText: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, header, onConfirmText }) => {
    return (
        <div className="confirmation-modal__wrapper">
            <h2 className="confirmation-modal__header">{header}</h2>
            <div className="confirmation-modal__buttons">
                <Button buttonVariant={ButtonVariant.dark} onClick={onConfirm}>
                    {onConfirmText}
                </Button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
