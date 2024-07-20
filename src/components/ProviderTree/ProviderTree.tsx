import React from 'react';

interface ProviderConfig {
  Provider: React.ComponentType<any>;
  configs?: Record<string, any>;
}

interface Props {
  children: React.ReactNode;
  providers: ProviderConfig[];
}

const ProviderTree = ({ children, providers }: Props) => {
  const buildProviderTree = (providersWithProps: ProviderConfig[]) => {
    const initialComponent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
    return providersWithProps.reduce((AccumulatedComponent, { Provider, configs = {} }) => {
      return ({ children }: { children: React.ReactNode }) => (
        <AccumulatedComponent>
          <Provider {...configs}>{children}</Provider>
        </AccumulatedComponent>
      );
    }, initialComponent);
  };

  return buildProviderTree(providers)({ children });
};

// This function only for typescript type suggestion
export const createProviderConfig = <T extends React.ComponentType<any>>(
  Provider: T,
  configs?: Omit<React.ComponentProps<T>, 'children'>,
) => {
  return { Provider, configs };
};

export default ProviderTree;
