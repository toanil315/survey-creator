import { useDynamicForm } from '@/hooks';
import { FieldUtils } from '@/utils';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  fieldId: string;
  children: ReactNode;
}

export const EvaluateVisibilityLogic = ({ fieldId, children }: Props) => {
  const { watch } = useFormContext();
  const formAnswers = watch();
  const { fields } = useDynamicForm();
  const currentField = fields.find((f) => f.id === fieldId);

  return FieldUtils.evaluateFieldVisibility(formAnswers, currentField!) && children;
};
