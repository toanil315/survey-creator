import { QUESTION_TYPE_ENUM } from '@/constants';
import { QuestionCardProps } from './type';
import { FreeTextForm } from './components/Forms/FreeTextForm';
import { Accordion, QuestionForm } from '@/components';
import {
  useQuestionCardBaseClassName,
  useQuestionFormContainerBaseClassName,
  useQuestionOrderBaseClassName,
} from './style';
import { FormProvider, useForm } from 'react-hook-form';
import { memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Question, QuestionSchema } from '@/entities/question';
import { SingleSelectForm } from './components/Forms/SingleSelectForm';

export const QuestionCard = ({ question }: QuestionCardProps) => {
  const questionCardBaseClassName = useQuestionCardBaseClassName();
  const questionOrderBaseClassName = useQuestionOrderBaseClassName();
  const questionFormContainerBaseClassName = useQuestionFormContainerBaseClassName();

  const form = useForm<Question>({
    defaultValues: question,
    resolver: zodResolver(QuestionSchema),
  });

  useEffect(() => {
    form.reset(question);
  }, [question]);

  const onSubmit = (value: Question) => console.log(value);

  return (
    <FormProvider
      {...form}
      formId={question.id}
    >
      <div className={questionCardBaseClassName}>
        <div className={questionOrderBaseClassName}>{question.order}</div>
        <Accordion
          style={{ flex: 1 }}
          items={[
            {
              key: question.id,
              title: question.title,
              container: (
                <QuestionForm
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className={questionFormContainerBaseClassName}
                  formId={question.id}
                >
                  <QuestionFormFactory question={question} />
                </QuestionForm>
              ),
              helperText: <p>{form.watch('required') ? 'Required' : 'Optional'}</p>,
            },
          ]}
          accordionIcon={{
            expand: null,
            collapse: null,
          }}
        />
      </div>
    </FormProvider>
  );
};

export const QuestionFormFactory = memo(
  ({ question }: QuestionCardProps) => {
    switch (question.type) {
      case QUESTION_TYPE_ENUM.FREE_TEXT: {
        return <FreeTextForm />;
      }
      case QUESTION_TYPE_ENUM.SINGLE_SELECT: {
        return <SingleSelectForm />;
      }
    }
  },
  (prev, next) => JSON.stringify(prev.question) === JSON.stringify(next.question),
);
