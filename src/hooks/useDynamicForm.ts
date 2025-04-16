import { DynamicFormContext } from '@/contexts';
import { useContext } from 'react';

export const useDynamicForm = () => {
  const dynamicForm = useContext(DynamicFormContext);
  if (!dynamicForm) {
    throw new Error('useDynamicForm must be used within a SurveyProvider');
  }

  return dynamicForm;
};
