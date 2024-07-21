import { BrowserRouter } from 'react-router-dom';
import { ProviderTree } from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from './styles/theme';
import { SurveyProvider } from './contexts';
import { AppContainer } from './containers/AppContainer';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const App = () => {
  // Please define your providers and their configurations here
  // note that the order of the providers is important
  // the first provider will be the outermost provider
  const providersAndConfigs = [
    createProviderConfig(FluentProvider, { theme: lightTheme }),
    createProviderConfig(I18nextProvider, { i18n: i18n }),
    createProviderConfig(BrowserRouter),
    createProviderConfig(SurveyProvider),
  ];

  return (
    <ProviderTree providers={providersAndConfigs}>
      <AppContainer />
    </ProviderTree>
  );
};

export default App;
