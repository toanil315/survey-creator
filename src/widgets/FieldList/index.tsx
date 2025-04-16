import { useDynamicForm } from '@/hooks';
import { useQuestionListBaseClassName } from './style';
import { AddFieldCard } from '../AddFieldCard';
import { FieldCard } from '../FieldCard';

export const FieldList = () => {
  const questionListBaseClassName = useQuestionListBaseClassName();

  const { fields } = useDynamicForm();

  return (
    <div className={questionListBaseClassName}>
      {fields.map((field) => {
        return (
          <FieldCard
            key={field.id}
            field={field}
          />
        );
      })}
      <AddFieldCard />
    </div>
  );
};
