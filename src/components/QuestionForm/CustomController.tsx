import { useRef } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

interface Props extends ControllerProps {
  formId?: string;
}

export const CustomController = ({ formId, ...restProps }: Props) => {
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
      {...restProps}
      render={({ field, ...restRenderProps }) => {
        return restProps.render({
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
