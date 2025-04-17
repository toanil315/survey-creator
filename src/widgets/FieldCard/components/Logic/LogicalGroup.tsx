import { LogicalOperator } from '@/constants';
import { ConditionTree } from '@/entities/field';
import { useFormContext } from 'react-hook-form';
import { ConditionForm } from './ConditionForm';
import { mergeClasses } from '@fluentui/react-components';
import { useFieldFormContainerBaseClassName, useFieldFormContainerClassNames } from '../../style';
import { Button, CategoryIcon, LogicJumpIcon, OverflowMenu } from '@/components';
import { useLogicalGroupBorderBaseClassName } from './style';
import { useQuestionFormContext } from '@/components/QuestionForm/QuestionFormContext';

export const LogicalGroup: React.FC<{ path: string }> = ({ path }) => {
  const fieldFormContainerClassNames = useFieldFormContainerClassNames();
  const fieldFormContainerBaseClassName = useFieldFormContainerBaseClassName();
  const logicalBorderBaseClassName = useLogicalGroupBorderBaseClassName();

  const { getValues, setValue, watch } = useFormContext();
  const { onSubmit } = useQuestionFormContext();
  const value = watch(path);
  const op = LogicalOperator.And in value ? LogicalOperator.And : LogicalOperator.Or;
  const children: ConditionTree[] = value[op];

  const handleAddCondition = () => {
    const newPath = `${path}.${op}`;
    const current = getValues(newPath) || [];
    setValue(newPath, [...current, { id: String(Date.now()), field: '', operator: '', value: '' }]);
  };

  const handleAddGroup = () => {
    const newPath = `${path}.${op}`;
    const current = getValues(newPath) || [];
    setValue(newPath, [...current, { [LogicalOperator.And]: [] }]);
  };

  const handleChangeCondition = (logicalOperator: LogicalOperator) => () => {
    const currentPath = `${path}.${op}`;
    const currentContent = JSON.parse(JSON.stringify(getValues(currentPath) || []));
    setValue(path, { [logicalOperator]: currentContent });
    onSubmit && onSubmit({} as any);
  };

  return (
    <div
      className={mergeClasses(fieldFormContainerBaseClassName, fieldFormContainerClassNames.row)}
    >
      <div className={logicalBorderBaseClassName}>
        <OverflowMenu
          items={[
            {
              label: (
                <div onClick={handleChangeCondition(LogicalOperator.And)}>
                  {LogicalOperator.And}
                </div>
              ),
              key: LogicalOperator.And,
            },
            {
              label: (
                <div onClick={handleChangeCondition(LogicalOperator.Or)}>{LogicalOperator.Or}</div>
              ),
              key: LogicalOperator.Or,
            },
          ]}
        >
          <span>{op}</span>
        </OverflowMenu>
      </div>
      <div
        className={mergeClasses(
          fieldFormContainerBaseClassName,
          fieldFormContainerClassNames.padding,
        )}
      >
        {children.map((child, index) => {
          const childPath = `${path}.${op}.${index}`;
          if ('id' in child) {
            return (
              <ConditionForm
                conditionId={child.id}
                key={childPath}
                path={childPath}
              />
            );
          }
          return (
            <LogicalGroup
              key={childPath}
              path={childPath}
            />
          );
        })}
        <div
          className={mergeClasses(
            fieldFormContainerBaseClassName,
            fieldFormContainerClassNames.row,
          )}
        >
          <Button
            appearance='primary'
            size='small'
            onClick={handleAddCondition}
            style={{ width: 120 }}
          >
            <LogicJumpIcon
              width={14}
              height={14}
            />
            Add Rule
          </Button>

          <Button
            appearance='secondary'
            size='small'
            onClick={handleAddGroup}
            style={{ width: 120 }}
          >
            <CategoryIcon
              width={14}
              height={14}
            />
            Add Group
          </Button>
        </div>
      </div>
    </div>
  );
};
