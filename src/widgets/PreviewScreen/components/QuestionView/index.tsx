import { Button, Form } from '@/components';
import { QUESTION_TYPE_ENUM } from '@/constants';
import { Question, QuestionSchema } from '@/entities/question';
import { useSurvey } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useQuestionViewContainerBaseClassName } from './style';
import { ProgressBar } from '@fluentui/react-components';

export const QuestionView = () => {
  const questionViewContainerBaseClassName = useQuestionViewContainerBaseClassName();

  const { questions, currentQuestion, onNext, onBack } = useSurvey();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      question: currentQuestion,
      answer: '' as string | string[],
    },
    resolver: zodResolver(
      z
        .object({
          question: QuestionSchema,
          answer: z.union([z.string(), z.array(z.string())]).optional(),
        })
        .superRefine(({ question, answer }, ctx) => {
          if (question.required && !answer) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('errors.required'),
              path: ['answer'],
            });
          }
        }),
    ),
  });

  useEffect(() => {
    form.reset({
      question: currentQuestion,
      answer: currentQuestion.type === QUESTION_TYPE_ENUM.MULTIPLE_SELECT ? ([] as string[]) : '',
    });
  }, [currentQuestion]);

  return (
    <div className={questionViewContainerBaseClassName}>
      <h3 className='title'>
        {currentQuestion.title} {currentQuestion.required && <span className='required'>*</span>}
      </h3>
      <p className='description'>{currentQuestion.description}</p>
      <FormProvider {...form}>
        <FormItemFactory question={currentQuestion} />
      </FormProvider>
      <div className='user-controls'>
        <Button
          onClick={onBack}
          type='button'
          appearance='outline'
        >
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onNext)}
          type='button'
          appearance='primary'
        >
          Next
        </Button>
      </div>
      <div className='progress'>
        <p>
          Powered by <b>Survey Online</b>
        </p>
        <ProgressBar
          value={currentQuestion.order / questions.length}
          thickness='large'
        />
      </div>
    </div>
  );
};

interface FormItemFactoryProps {
  question: Question;
}

export const FormItemFactory = ({ question }: FormItemFactoryProps) => {
  switch (question.type) {
    case QUESTION_TYPE_ENUM.FREE_TEXT:
      const props = {
        name: 'answer',
        placeholder: question.placeholder,
      };
      return question.isLongText ? <Form.Textarea {...props} /> : <Form.Input {...props} />;

    case QUESTION_TYPE_ENUM.SINGLE_SELECT:
      return (
        <Form.RadioGroup
          name='answer'
          items={question.options.map((option) => ({
            label: option.value,
            value: option.value,
          }))}
        />
      );

    case QUESTION_TYPE_ENUM.MULTIPLE_SELECT:
      return (
        <Form.CheckboxGroup
          name='answer'
          items={question.options.map((option) => ({
            label: option.value,
            value: option.value,
          }))}
          direction='column'
        />
      );
  }
};
