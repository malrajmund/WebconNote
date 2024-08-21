import React from 'react';
import { Decorator } from '@storybook/react';
import '../src/styles/App.scss';
import '../src/styles/Decorator.scss';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

const GlobalStyleDecorator: Decorator = Story => (
    <Provider store={store}>
        <MemoryRouter>
            <div className="decorator__wrapper">
                <Story />
            </div>
        </MemoryRouter>
    </Provider>
);

export default GlobalStyleDecorator;
