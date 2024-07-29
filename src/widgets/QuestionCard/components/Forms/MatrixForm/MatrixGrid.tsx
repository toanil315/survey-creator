import { Button, PlusIcon, QuestionForm, TrashIcon } from '@/components';
import { Field, tokens } from '@fluentui/react-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useAdditionalActionButtonBaseClassName, useOptionContainerBaseClassName } from '../style';
import { useQuestionFormContext } from '@/components/QuestionForm/QuestionFormContext';
import { MatrixGridProps } from './types';

export const MatrixGridSection = ({ name, label }: MatrixGridProps) => {
  const additionalActionButtonBaseClassName = useAdditionalActionButtonBaseClassName();
  const optionContainerBaseClassName = useOptionContainerBaseClassName();

  const { control } = useFormContext();
  const { onSubmit } = useQuestionFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const handleAppendGrid = () => {
    append({
      value: '',
    });
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
    onSubmit && onSubmit({} as any);
  };

  return (
    <Field
      label={label}
      required
      size='medium'
    >
      {fields.map((field, index) => (
        <div
          className={optionContainerBaseClassName}
          key={field.id}
        >
          <div style={{ width: '75%' }}>
            <QuestionForm.Input
              size='small'
              name={`${name}.${index}.value`}
              placeholder='Enter value'
            />
          </div>

          {index !== 0 && (
            <div
              onClick={() => handleRemoveOption(index)}
              className={additionalActionButtonBaseClassName}
            >
              <TrashIcon
                width={18}
                height={18}
              />
            </div>
          )}
        </div>
      ))}
      <Button
        onClick={() => handleAppendGrid()}
        appearance='primary'
        size='small'
        style={{ width: 130 }}
      >
        <PlusIcon
          width={14}
          height={14}
          fill={tokens.colorNeutralBackground1}
        />
        Add {label.toLowerCase()}
      </Button>
    </Field>
  );
};
