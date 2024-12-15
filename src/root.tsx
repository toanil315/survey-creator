import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ProviderTree } from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from './styles/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useEffect } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  // Please define your providers and their configurations here
  // note that the order of the providers is important
  // the first provider will be the outermost provider
  const providersAndConfigs = [
    createProviderConfig(FluentProvider, { theme: lightTheme }),
    createProviderConfig(I18nextProvider, { i18n: i18n }),
  ];

  useEffect(() => {
    const tourScript = document.createElement('script');
    tourScript.src = './tour-script/index.js';
    document.body.appendChild(tourScript);
    tourScript.onload = () => {
      (window as any).initTourConnection('app');
    };

    const tourStyles = document.createElement('link');
    tourStyles.href = './tour-script/index.css';
    tourStyles.rel = 'stylesheet';
    tourStyles.type = 'text/css';
    document.body.appendChild(tourStyles);
  }, []);

  return (
    <div id='app'>
      <ProviderTree providers={providersAndConfigs}>
        <Outlet />
      </ProviderTree>
    </div>
  );
  return;
}
