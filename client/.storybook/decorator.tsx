import React from 'react';
import { Decorator } from '@storybook/react';
import '../src/styles/App.scss';
import '../src/styles/Decorator.scss';

const GlobalStyleDecorator: Decorator = Story => (
    <div className="decorator__wrapper">
        <Story />
    </div>
);

export default GlobalStyleDecorator;
