import React, { createContext } from 'react';

interface QuestionFormProviderProps {
  formId: string;
  children: React.ReactNode;
}

interface QuestionFormContextProps {
  formId: string;
}

export const QuestionFormContext = createContext<QuestionFormContextProps | null>(null);

export const QuestionFormProvider = ({ children, formId }: QuestionFormProviderProps) => {
  return <QuestionFormContext.Provider value={{ formId }}>{children}</QuestionFormContext.Provider>;
};

export const useQuestionFormContext = () => {
  const context = React.useContext(QuestionFormContext);
  if (!context) {
    throw new Error('useQuestionFormContext must be used within a QuestionFormProvider');
  }
  return context;
};
