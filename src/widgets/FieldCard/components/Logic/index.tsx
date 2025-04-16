import { Accordion, DownIcon } from '@/components';
import { useFieldFormContainerBaseClassName } from '@/widgets/FieldCard/style';
import { useCustomAccrodionBaseClassName, useTitleBaseClassName } from './style';
import { LogicalGroup } from './LogicalGroup';

export const FieldConditionalLogic = () => {
  const titleBaseClassName = useTitleBaseClassName();
  const customAccordionBaseClassName = useCustomAccrodionBaseClassName();
  const fieldFormContainerBaseClassName = useFieldFormContainerBaseClassName();

  // const handleAppendLogic = () => {
  //   // append({
  //   //   condition: undefined,
  //   //   value: [],
  //   //   to: undefined,
  //   // });
  // };

  // const handleRemoveLogic = (index: number) => {
  //   // remove(index);
  //   // onSubmit && onSubmit({} as any);
  // };

  return (
    <Accordion
      className={customAccordionBaseClassName}
      items={[
        {
          key: '1',
          title: (
            <p className={titleBaseClassName}>
              <span>Visibility Logic</span>
            </p>
          ),
          container: (
            <div className={fieldFormContainerBaseClassName}>
              <LogicalGroup path='conditionTree' />
            </div>
          ),
        },
      ]}
      accordionIcon={{
        collapse: (
          <DownIcon
            width={20}
            height={20}
            style={{ transform: 'rotate(180deg)' }}
          />
        ),
        expand: (
          <DownIcon
            width={20}
            height={20}
          />
        ),
      }}
    />
  );
};
