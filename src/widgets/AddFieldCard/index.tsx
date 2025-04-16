import { useDynamicForm } from '@/hooks';
import {
  useFieldCardBaseClassName,
  useFieldListBaseClassName,
  useFieldOrderBaseClassName,
  useFieldTypeBaseClassName,
} from './style';
import { Accordion, FreeTextIcon, PlusIcon, SingleSelectIcon } from '@/components';
import { EnumUtils, StringUtils } from '@/utils';
import { tokens } from '@fluentui/react-components';
import { FIELD_TYPE_ENUM } from '@/constants/field';

export const AddFieldCard = () => {
  const fieldCardBaseClassName = useFieldCardBaseClassName();
  const fieldOrderBaseClassName = useFieldOrderBaseClassName();
  const fieldListBaseClassName = useFieldListBaseClassName();
  const fieldTypeBaseClassName = useFieldTypeBaseClassName();

  const { addField } = useDynamicForm();

  const renderFieldIcon = (type: FIELD_TYPE_ENUM) => {
    const props = {
      width: 20,
      height: 20,
      stroke: tokens.colorBrandBackground,
    };

    switch (type) {
      case FIELD_TYPE_ENUM.FREE_TEXT:
        return <FreeTextIcon {...props} />;

      case FIELD_TYPE_ENUM.SINGLE_SELECT:
        return <SingleSelectIcon {...props} />;
    }
  };

  const renderFieldTypes = () => {
    return EnumUtils.stringEnumToArray(FIELD_TYPE_ENUM).map((fieldType) => {
      return (
        <div
          key={fieldType.value}
          className={fieldTypeBaseClassName}
          onClick={() => addField(fieldType.value as FIELD_TYPE_ENUM)}
        >
          <div className='icon'>{renderFieldIcon(fieldType.value as FIELD_TYPE_ENUM)}</div>
          <div>{StringUtils.convertToLabel(fieldType.key)}</div>
        </div>
      );
    });
  };

  return (
    <div className={fieldCardBaseClassName}>
      <div className={fieldOrderBaseClassName}>
        <PlusIcon fill='white' />
      </div>
      <Accordion
        style={{ flex: 1 }}
        items={[
          {
            key: 'add-field',
            title: 'Add Field',
            container: <div className={fieldListBaseClassName}>{renderFieldTypes()}</div>,
            helperText: <p>Add a new field to your form</p>,
          },
        ]}
        accordionIcon={{
          expand: null,
          collapse: null,
        }}
      />
    </div>
  );
};
