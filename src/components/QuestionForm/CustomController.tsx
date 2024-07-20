import { useRef } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { useQuestionFormContext } from './QuestionFormContext';

export const CustomController = (props: ControllerProps) => {
  const { formId } = useQuestionFormContext();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debounceSubmitForm = () => {
    if (!formId) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent(`submitFormWithId-${formId}`));
    }, 300);
  };

  return (
    <Controller
      {...props}
      render={({ field, ...restRenderProps }) => {
        return props.render({
          field: {
            ...field,
            onChange: (...event: any[]) => {
              debounceSubmitForm();
              return field.onChange(...event);
            },
          },
          ...restRenderProps,
        });
      }}
    />
  );
};
