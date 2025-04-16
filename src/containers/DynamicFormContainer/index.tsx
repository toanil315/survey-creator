import { QuestionsIcon } from '@/components';
import { useDynamicFormLayoutBaseClassName, useNavBaseClassName } from './style';
import { tokens } from '@fluentui/react-components';
import { FieldList } from '@/widgets/FieldList';

export const DyanmicFormContainer = () => {
  const dynamicLayoutBaseClassName = useDynamicFormLayoutBaseClassName();
  const navBaseClassName = useNavBaseClassName();

  return (
    <>
      <div className={dynamicLayoutBaseClassName}>
        <div>
          <nav className={navBaseClassName}>
            <QuestionsIcon
              width={24}
              height={24}
              stroke={tokens.colorBrandBackground}
            />
            Dynamic Form Fields
          </nav>
          <FieldList />
        </div>
        <div className='preview'>{/* <PreviewScreen /> */}</div>
      </div>
    </>
  );
};
