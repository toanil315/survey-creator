import { Button, CompleteSurveyIcon, Form } from '@/components';
import { QUESTION_TYPE_ENUM } from '@/constants';
import { Question, QuestionAnswerSchema } from '@/entities/question';
import { useSurvey } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuestionViewContainerBaseClassName, useQuestionViewContainerClassNames } from './style';
import { ProgressBar, mergeClasses, tokens } from '@fluentui/react-components';

export const QuestionView = () => {
  const questionViewContainerBaseClassName = useQuestionViewContainerBaseClassName();
  const questionViewContainerClassNames = useQuestionViewContainerClassNames();

  const { questions, currentQuestion, onNext, onBack } = useSurvey();
  const shouldShowBackButton =
    currentQuestion.type !== QUESTION_TYPE_ENUM.WELCOME_SCREEN &&
    currentQuestion.type !== QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;
  const shouldNextBackButton = currentQuestion.type !== QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;
  const isCompleted = currentQuestion.type === QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;

  const form = useForm({
    defaultValues: {
      question: currentQuestion,
      answer: '' as string | string[],
    },
    resolver: zodResolver(QuestionAnswerSchema),
  });

  useEffect(() => {
    form.reset({
      question: currentQuestion,
      answer: currentQuestion.type === QUESTION_TYPE_ENUM.MULTIPLE_SELECT ? ([] as string[]) : '',
    });
  }, [currentQuestion]);

  return (
    <div
      className={mergeClasses(
        questionViewContainerBaseClassName,
        isCompleted && questionViewContainerClassNames.center,
      )}
    >
      {isCompleted && (
        <div className='completed-icon'>
          <CompleteSurveyIcon
            width={100}
            height={100}
            stroke={tokens.colorBrandBackground}
          />
          <div />
        </div>
      )}
      <h3 className='title'>
        {currentQuestion.title}{' '}
        {currentQuestion.required && shouldNextBackButton && <span className='required'>*</span>}
      </h3>
      <p className='description'>{currentQuestion.description}</p>
      <FormProvider {...form}>
        <FormItemFactory question={currentQuestion} />
      </FormProvider>
      <div className='user-controls'>
        {shouldShowBackButton && (
          <Button
            onClick={onBack}
            type='button'
            appearance='secondary'
          >
            Back
          </Button>
        )}
        {shouldNextBackButton && (
          <Button
            onClick={form.handleSubmit(onNext)}
            type='button'
            appearance='primary'
          >
            Next
          </Button>
        )}
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

    default:
      return null;
  }
};
