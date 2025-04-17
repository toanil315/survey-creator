import { FIELD_TYPE_ENUM } from '@/constants/field';
import { Field } from '@/entities/field';
import { FieldUtils } from '@/utils';
import { createContext, useMemo, useState } from 'react';

interface DynamicFormContextArgs {
  fields: Field[];
  currentField: Field | null;
  currentFieldId: string | null;
  changeCurrentField: (fieldId: string) => void;
  updateField: (field: Field) => void;
  addField: (fieldType: FIELD_TYPE_ENUM) => void;
}

export const DynamicFormContext = createContext<DynamicFormContextArgs | null>(null);

const MOCK_FIELDS: Field[] = [];

export const DynamicFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<Field[]>(MOCK_FIELDS);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(fields[0]?.id);

  const changeCurrentField = (fieldId: string) => {
    setCurrentFieldId(fieldId);
  };

  const updateField = (field: Field) => {
    field.visibilityLogic = FieldUtils.convertConditionTreeToRPN(field.conditionTree);
    const updatedFields = fields.map((f) => (f.id === field.id ? { ...f, ...field } : f));
    setFields(updatedFields);
  };

  const addField = (fieldType: FIELD_TYPE_ENUM) => {
    const newField = {
      ...FieldUtils.getDefaultFieldData(fieldType),
      id: String(Date.now()),
      type: fieldType,
      order: fields.length + 1,
    } as Field;
    fields.push(newField);
    setFields([...fields]);
  };

  const value = useMemo(() => {
    return {
      fields,
      currentField: fields.find((field) => field?.id === currentFieldId) ?? null,
      currentFieldId,
      changeCurrentField,
      updateField,
      addField,
    };
  }, [fields, currentFieldId]);

  return <DynamicFormContext.Provider value={value}>{children}</DynamicFormContext.Provider>;
};
