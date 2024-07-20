import type { Preview } from '@storybook/react';

import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import React, { Suspense } from 'react';

import '../src/index.css';
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from '../src/styles/theme';

const withContext = (Story: any) => {
  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <FluentProvider theme={lightTheme}>{Story()}</FluentProvider>
      </I18nextProvider>
    </Suspense>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [withContext],
};

export default preview;
