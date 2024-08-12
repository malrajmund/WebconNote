import { FaPlus, FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { IconVariant } from './Icon.types';

export const IconMap: Record<IconVariant, React.ReactNode> = {
    add: <FaPlus />,
    edit: <FaEdit />,
    delete: <FaTrash />,
    back: <FaArrowLeft />,
};
