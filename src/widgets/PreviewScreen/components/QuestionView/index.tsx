import { Button, CompleteSurveyIcon, Form, UPLOADER_ENUM } from '@/components';
import { QUESTION_TYPE_ENUM } from '@/constants';
import { Question, QuestionAnswer, QuestionAnswerSchema } from '@/entities/question';
import { useSurvey } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  useQuestionViewContainerBaseClassName,
  useQuestionViewContainerClassNames,
  useRatingContainerBaseClassName,
} from './style';
import { ProgressBar, mergeClasses, tokens } from '@fluentui/react-components';
import { PictureSelections } from '../PictureSelectionItems';
import { MatrixQuestionView } from '../MatrixQuestionView';

export const QuestionView = () => {
  const questionViewContainerBaseClassName = useQuestionViewContainerBaseClassName();
  const questionViewContainerClassNames = useQuestionViewContainerClassNames();

  const { questions, currentQuestion, onNext, onBack } = useSurvey();
  const shouldShowBackButton =
    currentQuestion.type !== QUESTION_TYPE_ENUM.WELCOME_SCREEN &&
    currentQuestion.type !== QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;
  const shouldNextBackButton = currentQuestion.type !== QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;
  const isCompleted = currentQuestion.type === QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;

  const form = useForm<QuestionAnswer>({
    defaultValues: {
      question: currentQuestion,
      answer: undefined,
    },
    resolver: zodResolver(QuestionAnswerSchema),
  });

  useEffect(() => {
    let defaultAnswer = undefined;

    switch (currentQuestion.type) {
      case QUESTION_TYPE_ENUM.MULTIPLE_SELECT:
      case QUESTION_TYPE_ENUM.FILE_UPLOAD:
      case QUESTION_TYPE_ENUM.PICTURE_SELECTION:
        defaultAnswer = [];
        break;

      case QUESTION_TYPE_ENUM.MATRIX:
        defaultAnswer = currentQuestion.matrixRows?.reduce<Record<string, string | null>>(
          (acc, row) => {
            acc[row.value] = null;
            return acc;
          },
          {},
        );
        break;

      default:
        defaultAnswer = '';
        break;
    }

    form.reset({
      question: currentQuestion,
      answer: defaultAnswer,
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
  const ratingContainerBaseClassName = useRatingContainerBaseClassName();

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
          appearance='border'
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
          appearance='border'
        />
      );

    case QUESTION_TYPE_ENUM.FILE_UPLOAD:
      return (
        <Form.FileUploader
          name='answer'
          componentType={UPLOADER_ENUM.DRAG_AND_DROP}
          accept={question.limitFileTypes?.join(',')}
          multiple={question.allowMultipleFiles}
        />
      );

    case QUESTION_TYPE_ENUM.PICTURE_SELECTION:
      return (
        <PictureSelections
          pictures={question.pictureSelectOptions || []}
          allowMultipleSelect={Boolean(question.allowMultipleSelect)}
          name='answer'
        />
      );

    case QUESTION_TYPE_ENUM.RATING:
      return (
        <div className={ratingContainerBaseClassName}>
          <Form.Rating
            name='answer'
            step={1}
            max={question.range ? Number(question.range) : 5}
            color='marigold'
          />
          <div className='rating-labels'>
            <span>{question.lowerLabel}</span>
            <span>{question.upperLabel}</span>
          </div>
        </div>
      );

    case QUESTION_TYPE_ENUM.MATRIX:
      return (
        <MatrixQuestionView
          name='answer'
          matrixRows={question.matrixRows || []}
          matrixColumns={question.matrixColumns || []}
        />
      );

    default:
      return null;
  }
};
