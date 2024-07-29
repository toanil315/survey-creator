import { Form } from '@/components';
import { MatrixQuestionViewsProps } from './types';
import { useFormContext } from 'react-hook-form';
import {
  useMatrixGridBaseClassName,
  useMatrixRowBaseClassName,
  useMatrixRowHeaderBaseClassName,
} from './style';
import { Field } from '@fluentui/react-components';

export const MatrixQuestionView = ({
  matrixColumns,
  matrixRows,
  name,
}: MatrixQuestionViewsProps) => {
  const matrixGridBaseClassName = useMatrixGridBaseClassName();
  const matrixRowHeaderBaseClassName = useMatrixRowHeaderBaseClassName();
  const matrixGridRowBaseClassName = useMatrixRowBaseClassName();

  const form = useFormContext();
  const error = form.formState.errors[name]?.root?.message;

  return (
    <>
      <div className={matrixRowHeaderBaseClassName}>
        {matrixColumns.map((column) => (
          <span key={column.value}>{column.value}</span>
        ))}
      </div>
      <Field
        {...((Boolean((error as string | undefined)?.trim())
          ? {
              validationState: 'error',
              validationMessage: error,
            }
          : {}) as any)}
      >
        <div className={matrixGridBaseClassName}>
          {matrixRows.map((row) => (
            <div
              key={row.value}
              className={matrixGridRowBaseClassName}
            >
              <div className='row-title'>{row.value}</div>
              <Form.RadioGroup
                name={`answer.${row.value}`}
                items={matrixColumns.map((option) => ({
                  label: '',
                  value: option.value,
                }))}
                layout='horizontal-stacked'
              />
            </div>
          ))}
        </div>
      </Field>
    </>
  );
};
