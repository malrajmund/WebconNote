import React from 'react';
import clsx from 'clsx';

import './StoryBlock.scss';

export type StoryBlockProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

const StoryBlock = ({ title, children, className }: StoryBlockProps) => {
    return (
        <div className="story-block">
            <h1>{title}</h1>
            <div className={clsx('story-block__content', className)}>{children}</div>
        </div>
    );
};

export default StoryBlock;
