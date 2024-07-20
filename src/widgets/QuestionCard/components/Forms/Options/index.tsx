import { Button, Col, PlusIcon, QuestionForm, Row, TrashIcon } from '@/components';
import { Field, tokens } from '@fluentui/react-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useAdditionalActionButtonBaseClassName, useOptionContainerBaseClassName } from '../style';
import { QUESTION_OPTION_ORDER_CONFIG_ENUM } from '@/constants';
import { EnumUtils, StringUtils } from '@/utils';

export const OptionsSection = () => {
  const additionalActionButtonBaseClassName = useAdditionalActionButtonBaseClassName();
  const optionContainerBaseClassName = useOptionContainerBaseClassName();

  const { control } = useFormContext();
  const { fields, insert, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const handleInsertOption = (index: number) => {
    insert(index, {
      value: '',
      isOther: false,
    });
  };

  console.log(fields);

  return (
    <Field
      label={'Options'}
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
              name={`options.${index}.value`}
              placeholder='Enter option value'
            />
          </div>
          <div
            onClick={() => handleInsertOption(index + 1)}
            className={additionalActionButtonBaseClassName}
          >
            <PlusIcon
              width={14}
              height={14}
              fill={tokens.colorBrandBackgroundHover}
            />
          </div>
          {index !== 0 && (
            <div
              onClick={() => remove(index)}
              className={additionalActionButtonBaseClassName}
            >
              <TrashIcon
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      ))}
      <Row gutter={16}>
        <Col span={8}>
          <Button appearance='transparent'>Add Other Option</Button>
        </Col>
        <Col span={12}>
          <QuestionForm.Select
            size='small'
            name='optionsOrder'
            placeholder='Select option order'
            options={EnumUtils.stringEnumToArray(QUESTION_OPTION_ORDER_CONFIG_ENUM).map(
              ({ value }) => {
                return {
                  label: StringUtils.convertToLabel(value),
                  value,
                };
              },
            )}
          />
        </Col>
      </Row>
    </Field>
  );
};
