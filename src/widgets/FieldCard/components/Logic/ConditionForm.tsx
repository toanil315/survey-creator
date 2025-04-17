import {
  useConditionFormContainerBaseClassName,
  useFieldFormContainerClassNames,
} from '../../style';
import { mergeClasses } from '@fluentui/react-components';
import { QuestionForm } from '@/components';
import { useDynamicForm } from '@/hooks';
import { EnumUtils } from '@/utils';
import { ConditionOperator, FIELD_TYPE_ENUM } from '@/constants';
import { ConditionNode } from '@/entities/field';
import { useFormContext } from 'react-hook-form';

interface Props {
  conditionId: string;
  path: string;
}

export const ConditionForm: React.FC<Props> = ({ path, conditionId }) => {
  const fieldFormContainerClassNames = useFieldFormContainerClassNames();
  const conditionFormContainerBaseClassName = useConditionFormContainerBaseClassName();

  const { watch } = useFormContext();
  const { fields, currentField, updateField } = useDynamicForm();
  const selectedFieldId: string | null = watch(`${path}.field`);
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleChangeCondition = ({
    conditionField,
    value,
  }: {
    conditionField: keyof ConditionNode;
    value: string;
  }) => {
    if (!currentField) return;
    if (!currentField.conditions[conditionId]) {
      currentField.conditions[conditionId] = { id: conditionId } as ConditionNode;
    }
    currentField.conditions[conditionId][conditionField] = value as any;
    updateField(currentField);
  };

  const handleFieldSelect = (fieldId: string) => {
    handleChangeCondition({ conditionField: 'field', value: fieldId });
  };

  const handleOperatorSelect = (operator: ConditionOperator) => {
    handleChangeCondition({ conditionField: 'operator', value: operator });
  };

  const handleValueChange = (value: string) => {
    handleChangeCondition({ conditionField: 'value', value });
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
        disabled={!selectedField}
        width={120}
        name={`${path}.operator`}
        placeholder='Select operator'
        options={EnumUtils.stringEnumToArray(ConditionOperator).map((v) => ({
          label: v.key,
          value: v.value,
        }))}
        onChange={handleOperatorSelect}
      />
      {selectedField?.type === FIELD_TYPE_ENUM.SINGLE_SELECT ? (
        <QuestionForm.Select
          disabled={!selectedField}
          name={`${path}.value`}
          placeholder='Select value'
          options={selectedField?.options.map((o) => ({
            label: o.value,
            value: o.value,
          }))}
          onChange={handleValueChange}
        />
      ) : (
        <QuestionForm.Input
          disabled={!selectedField}
          name={`${path}.value`}
          placeholder='Enter value'
          onChange={handleValueChange}
        />
      )}
    </div>
  );
};
