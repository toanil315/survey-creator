import {
  useConditionFormContainerBaseClassName,
  useFieldFormContainerClassNames,
} from '../../style';
import { mergeClasses } from '@fluentui/react-components';
import { QuestionForm } from '@/components';
import { useDynamicForm } from '@/hooks';
import { EnumUtils } from '@/utils';
import { ConditionOperator, FIELD_TYPE_ENUM } from '@/constants';
import { useState } from 'react';
import { Field } from '@/entities/field';

export const ConditionForm: React.FC<{ path: string }> = ({ path }) => {
  const fieldFormContainerClassNames = useFieldFormContainerClassNames();
  const conditionFormContainerBaseClassName = useConditionFormContainerBaseClassName();

  const { fields, currentField } = useDynamicForm();
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleFieldSelect = (fieldId: string) => {
    const selectedField = fields.find((f) => f.id === fieldId);
    setSelectedField(selectedField ?? null);
  };

  const getFieldOptions = () => {
    return fields
      .filter((f) => f.id !== currentField?.id)
      .map((f) => ({
        label: f.title,
        value: f.id,
      }));
  };

  return (
    <div
      className={mergeClasses(
        conditionFormContainerBaseClassName,
        fieldFormContainerClassNames.row,
        fieldFormContainerClassNames.wrap,
      )}
    >
      <QuestionForm.Select
        name={`${path}.field`}
        placeholder='Select field'
        options={getFieldOptions()}
        onChange={handleFieldSelect}
      />
      <QuestionForm.Select
        width={120}
        name={`${path}.operator`}
        placeholder='Select operator'
        options={EnumUtils.stringEnumToArray(ConditionOperator).map((v) => ({
          label: v.key,
          value: v.value,
        }))}
      />
      {selectedField?.type === FIELD_TYPE_ENUM.SINGLE_SELECT ? (
        <QuestionForm.Select
          name={`${path}.value`}
          placeholder='Select value'
          options={selectedField?.options.map((o) => ({
            label: o.value,
            value: o.value,
          }))}
        />
      ) : (
        <QuestionForm.Input
          name={`${path}.value`}
          placeholder='Enter value'
        />
      )}
    </div>
  );
};
