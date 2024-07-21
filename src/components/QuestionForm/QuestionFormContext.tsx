import React, { FormEventHandler, createContext } from 'react';

interface QuestionFormProviderProps {
  formId: string;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  children: React.ReactNode;
}

interface QuestionFormContextProps {
  formId: string;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const QuestionFormContext = createContext<QuestionFormContextProps | null>(null);

export const QuestionFormProvider = ({ children, formId, onSubmit }: QuestionFormProviderProps) => {
  return (
    <QuestionFormContext.Provider
      value={{ formId, onSubmit: () => onSubmit && onSubmit({} as any) }}
    >
      {children}
    </QuestionFormContext.Provider>
  );
};

export const useQuestionFormContext = () => {
  const context = React.useContext(QuestionFormContext);
  if (!context) {
    throw new Error('useQuestionFormContext must be used within a QuestionFormProvider');
  }
  return context;
};
