import { useController, useFormContext } from 'react-hook-form';
import { ACTION_ENUM } from '@/constants';
import { FileUploader, FileUploaderProps } from '../Commons';
import { useQuestionFormContext } from './QuestionFormContext';
import { useRef } from 'react';

const RHFFileUploader = (props: Omit<FileUploaderProps, 'onChange'> & { name: string }) => {
  const { formId } = useQuestionFormContext();
  const { control, getValues } = useFormContext();
  const {
    field: { onChange, ...restField },
    fieldState,
  } = useController({ control, name: props.name });
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

  const handleChange = (value: string | string[] | undefined, action?: ACTION_ENUM) => {
    if (props.multiple) {
      // we need process this to prevent concurrent add file cause only 1 file can be added at a time
      const existingFiles: string[] = getValues()[props.name] || [];
      const setFiles = Array.from(new Set([...existingFiles, ...(value as string[])]));
      onChange(action === ACTION_ENUM.CREATE ? setFiles : value);
    } else {
      onChange(value);
    }
    debounceSubmitForm();
  };

  return (
    <FileUploader
      error={fieldState.error?.message}
      {...props}
      {...restField}
      onChange={handleChange}
    />
  );
};

export default RHFFileUploader;
