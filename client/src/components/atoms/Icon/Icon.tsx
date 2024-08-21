import React, { ComponentPropsWithoutRef } from 'react';
import { IconMap } from './constants';
import { IconVariant } from './Icon.types';

export type IconProps = ComponentPropsWithoutRef<'span'> & {
    variant: IconVariant;
};

const Icon: React.FC<IconProps> = ({ variant = 'default' }) => {
    return <>{IconMap[variant]}</>;
};

export default Icon;
