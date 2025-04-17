import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ProviderTree } from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from './styles/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { NavLink } from 'react-router';

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

  return (
    <div id='app'>
      <ProviderTree providers={providersAndConfigs}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Outlet />
        </div>
      </ProviderTree>
    </div>
  );
}

const Sidebar: React.FC = () => {
  const sidebarStyle: React.CSSProperties = {
    width: '240px',
    height: '100vh',

    backgroundColor: 'white',
    borderRight: '1px solid #E5E7EB', // Tailwind gray-200 border
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1D6660',
  };

  const navItemBase: React.CSSProperties = {
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    color: '#374151', // Tailwind gray-700
    backgroundColor: '#F9FAFB', // Tailwind gray-50
    fontWeight: 500,
  };

  const navItemActive: React.CSSProperties = {
    ...navItemBase,
    backgroundColor: '#1D6660',
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <aside style={sidebarStyle}>
      <div style={headingStyle}>Menu</div>
      <NavLink
        to='/'
        style={({ isActive }) => (isActive ? navItemActive : navItemBase)}
      >
        Survey Online
      </NavLink>
      <NavLink
        to='/dynamic-form'
        style={({ isActive }) => (isActive ? navItemActive : navItemBase)}
      >
        Dynamic Form
      </NavLink>
    </aside>
  );
};
