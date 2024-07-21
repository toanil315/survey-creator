import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from 'react';
import { QuestionFormProvider } from './QuestionFormContext';

import Input from './Input';
import Switch from './Switch';
import Select from './Select';
import Textarea from './Textarea';

interface QuestionFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  formId: string;
}

export const QuestionForm = ({ children, formId, ...restProps }: QuestionFormProps) => {
  useEffect(() => {
    if (formId) {
      const listener = () => {
        restProps.onSubmit && restProps.onSubmit({} as any);
      };

      window.addEventListener(`submitFormWithId-${formId}`, listener);

      return () => {
        window.removeEventListener(`submitFormWithId-${formId}`, listener);
      };
    }
  }, [restProps.onSubmit, formId]);

  return (
    <QuestionFormProvider
      formId={formId}
      onSubmit={restProps.onSubmit}
    >
      <form
        {...restProps}
        noValidate
      >
        {children}
      </form>
    </QuestionFormProvider>
  );
};
QuestionForm.Input = Input;
QuestionForm.Switch = Switch;
QuestionForm.Select = Select;
QuestionForm.Textarea = Textarea;
