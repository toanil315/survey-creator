import { ConditionOperator, FIELD_TYPE_ENUM } from '@/constants/field';
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

const MOCK_FIELDS: Field[] = [
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'How do you travel?',
    description: 'Choose the option that best suits your preference.',
    required: true,
    options: [
      {
        value: 'By Airplane ✈️',
        isOther: false,
      },
      {
        value: 'By Train 🚂',
        isOther: false,
      },
      {
        value: 'By Car 🚗',
        isOther: false,
      },
      {
        value: 'By Bus 🚌',
        isOther: false,
      },
    ],
    conditionTree: {
      And: [],
    },
    conditions: {},
    visibilityLogic: [],
    id: '2876549012345',
    order: 1,
  },
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'Do you enjoy outdoor activities?',
    description: 'Let us know if you like spending time outdoors.',
    required: true,
    options: [
      {
        value: 'Yes 👍',
        isOther: false,
      },
      {
        value: 'No 👎',
        isOther: false,
      },
    ],
    conditionTree: {
      And: [],
    },
    conditions: {},
    id: '9876543210123',
    order: 2,
    visibilityLogic: [],
  },
  {
    type: FIELD_TYPE_ENUM.FREE_TEXT,
    title: "If 'Yes', what is your favorite one?",
    description: 'Please specify your favorite outdoor activity.',
    placeholder: 'e.g., Hiking, Camping, Swimming',
    required: false,
    conditionTree: {
      And: [
        {
          id: '3456789012345',
          field: '9876543210123',
          operator: ConditionOperator.Equals,
          value: 'Yes 👍',
        },
      ],
    },
    conditions: {
      '3456789012345': {
        id: '3456789012345',
        field: '9876543210123',
        operator: ConditionOperator.Equals,
        value: 'Yes 👍',
      },
    },
    id: '1234567890123',
    order: 3,
    visibilityLogic: ['3456789012345'],
    options: [],
  },
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'What is your favorite type of cuisine?',
    description: 'Select your preferred food style.',
    required: true,
    options: [
      {
        value: 'Italian 🇮🇹',
        isOther: false,
      },
      {
        value: 'Japanese 🇯🇵',
        isOther: false,
      },
      {
        value: 'Mexican 🇲🇽',
        isOther: false,
      },
      {
        value: 'Indian 🇮🇳',
        isOther: false,
      },
      {
        value: 'Other',
        isOther: true,
      },
    ],
    conditionTree: {
      And: [],
    },
    conditions: {},
    id: '4567890123456',
    order: 4,
    visibilityLogic: [],
  },
  {
    type: FIELD_TYPE_ENUM.FREE_TEXT,
    title: "If you chose 'Other' for your favorite cuisine, please specify:",
    description: 'Tell us what other type of food you enjoy.',
    placeholder: 'Type your answer here',
    required: false,
    conditionTree: {
      And: [
        {
          id: '5678901234567',
          field: '4567890123456',
          operator: ConditionOperator.Equals,
          value: 'Other',
        },
      ],
    },
    conditions: {
      '5678901234567': {
        id: '5678901234567',
        field: '4567890123456',
        operator: ConditionOperator.Equals,
        value: 'Other',
      },
    },
    id: '6789012345678',
    order: 5,
    visibilityLogic: ['5678901234567'],
    options: [],
  },
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'Do you own a pet?',
    description: 'Let us know if you have any furry, scaly, or feathered friends.',
    required: true,
    options: [
      {
        value: 'Yes 🐶',
        isOther: false,
      },
      {
        value: 'No 🚫',
        isOther: false,
      },
    ],
    conditionTree: {
      And: [],
    },
    conditions: {},
    id: '7890123456789',
    order: 6,
    visibilityLogic: [],
  },
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'If you own a pet, is it a dog or a cat?',
    description: 'Please specify the type of pet.',
    required: false,
    options: [
      {
        value: 'Dog 🐕',
        isOther: false,
      },
      {
        value: 'Cat 🐈',
        isOther: false,
      },
      {
        value: 'Other',
        isOther: true,
      },
    ],
    conditionTree: {
      And: [
        {
          id: '8901234567890',
          field: '7890123456789',
          operator: ConditionOperator.Equals,
          value: 'Yes 🐶',
        },
      ],
    },
    conditions: {
      '8901234567890': {
        id: '8901234567890',
        field: '7890123456789',
        operator: ConditionOperator.Equals,
        value: 'Yes 🐶',
      },
    },
    id: '9012345678901',
    order: 7,
    visibilityLogic: ['8901234567890'],
  },
  {
    type: FIELD_TYPE_ENUM.FREE_TEXT,
    title: 'What is your favorite book or movie genre?',
    description: 'Tell us what kind of stories you enjoy.',
    placeholder: 'e.g., Science Fiction, Mystery, Comedy',
    required: false,
    conditionTree: {
      Or: [
        {
          id: '1023456789012',
          field: '9876543210123',
          operator: ConditionOperator.Equals,
          value: 'No 👎',
        },
        {
          And: [
            {
              id: '2034567890123',
              field: '2876549012345',
              operator: ConditionOperator.Equals,
              value: 'By Train 🚂',
            },
            {
              id: '3045678901234',
              field: '4567890123456',
              operator: ConditionOperator.NotEquals,
              value: 'Italian 🇮🇹',
            },
          ],
        },
      ],
    },
    conditions: {
      '1023456789012': {
        id: '1023456789012',
        field: '9876543210123',
        operator: ConditionOperator.Equals,
        value: 'No 👎',
      },
      '2034567890123': {
        id: '2034567890123',
        field: '2876549012345',
        operator: ConditionOperator.Equals,
        value: 'By Train 🚂',
      },
      '3045678901234': {
        id: '3045678901234',
        field: '4567890123456',
        operator: ConditionOperator.NotEquals,
        value: 'Italian 🇮🇹',
      },
    },
    id: '0123456789012',
    order: 8,
    visibilityLogic: ['1023456789012', '2034567890123', '3045678901234', 'And', 'Or'],
    options: [],
  },
  {
    type: FIELD_TYPE_ENUM.SINGLE_SELECT,
    title: 'What is your favorite season of the year?',
    description: 'Pick the season you enjoy the most.',
    required: true,
    options: [
      {
        value: 'Spring 🌸',
        isOther: false,
      },
      {
        value: 'Summer ☀️',
        isOther: false,
      },
      {
        value: 'Autumn 🍂',
        isOther: false,
      },
      {
        value: 'Winter ❄️',
        isOther: false,
      },
    ],
    conditionTree: {
      And: [],
    },
    conditions: {},
    id: '5432109876543',
    order: 9,
    visibilityLogic: [],
  },
  {
    type: FIELD_TYPE_ENUM.FREE_TEXT,
    title: 'Something interesting about your favorite season.',
    description: 'Share a fun fact or a personal experience related to your chosen season.',
    placeholder: 'Type your answer here',
    required: false,
    conditionTree: {
      And: [
        {
          id: '6543210987654',
          field: '5432109876543',
          operator: ConditionOperator.NotEquals,
          value: 'Summer ☀️',
        },
        {
          Or: [
            {
              id: '7654321098765',
              field: '9876543210123',
              operator: ConditionOperator.Equals,
              value: 'Yes 👍',
            },
            {
              id: '8765432109876',
              field: '7890123456789',
              operator: ConditionOperator.Equals,
              value: 'No 🚫',
            },
          ],
        },
      ],
    },
    conditions: {
      '6543210987654': {
        id: '6543210987654',
        field: '5432109876543',
        operator: ConditionOperator.NotEquals,
        value: 'Summer ☀️',
      },
      '7654321098765': {
        id: '7654321098765',
        field: '9876543210123',
        operator: ConditionOperator.Equals,
        value: 'Yes 👍',
      },
      '8765432109876': {
        id: '8765432109876',
        field: '7890123456789',
        operator: ConditionOperator.Equals,
        value: 'No 🚫',
      },
    },
    id: '4321098765432',
    order: 10,
    visibilityLogic: ['6543210987654', '7654321098765', '8765432109876', 'Or', 'And'],
    options: [],
  },
];

export const DynamicFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<Field[]>(MOCK_FIELDS);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(fields[0]?.id);

  console.log('===fields: ', fields);

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
