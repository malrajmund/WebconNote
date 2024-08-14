import type { Preview } from '@storybook/react';

import GlobalStyleDecorator from './decorator';

const preview: Preview = {
    decorators: [GlobalStyleDecorator],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;

