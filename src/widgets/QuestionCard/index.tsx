import { QUESTION_TYPE_ENUM } from '@/constants';
import { QuestionCardProps } from './type';
import { FreeTextForm } from './components/Forms/FreeTextForm';
import { Accordion, QuestionForm } from '@/components';
import {
  useQuestionCardBaseClassName,
  useQuestionFormContainerBaseClassName,
  useQuestionOrderBaseClassName,
  useQuestionOrderClassNames,
} from './style';
import { FormProvider, useForm } from 'react-hook-form';
import { memo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Question, QuestionSchema } from '@/entities/question';
import { SingleSelectForm } from './components/Forms/SingleSelectForm';
import { MutipleSelectForm } from './components/Forms/MultipleSelectForm';
import { WelcomeForm } from './components/Forms/WelcomeForm';
import { useSurvey } from '@/hooks';
import { mergeClasses } from '@fluentui/react-components';
import { FileUploadForm } from './components/Forms/FileUploadForm';
import { PictureSelectionForm } from './components/Forms/PictureSelectionForm';
import { RatingForm } from './components/Forms/RatingForm';

export const QuestionCard = memo(
  ({ question }: QuestionCardProps) => {
    const questionCardBaseClassName = useQuestionCardBaseClassName();
    const questionOrderBaseClassName = useQuestionOrderBaseClassName();
    const questionFormContainerBaseClassName = useQuestionFormContainerBaseClassName();
    const questionOrderClassNames = useQuestionOrderClassNames();

    const { updateQuestion, changeCurrentQuestion } = useSurvey();
    const isSpecialCard =
      question.type === QUESTION_TYPE_ENUM.WELCOME_SCREEN ||
      question.type === QUESTION_TYPE_ENUM.THANK_YOU_SCREEN;

    const form = useForm<Question>({
      defaultValues: question,
      resolver: zodResolver(QuestionSchema),
    });

    useEffect(() => {
      form.reset(question);
    }, [question]);

    const onSubmit = (value: Question) => updateQuestion(value);

    const renderQuestionOrder = () => {
      switch (question.type) {
        case QUESTION_TYPE_ENUM.WELCOME_SCREEN:
          return '✋';

        case QUESTION_TYPE_ENUM.THANK_YOU_SCREEN:
          return '🙏';

        default:
          return question.order;
      }
    };

    return (
      <FormProvider {...form}>
        <div
          className={questionCardBaseClassName}
          onClick={() => changeCurrentQuestion(question.id)}
        >
          <div
            className={mergeClasses(
              questionOrderBaseClassName,
              isSpecialCard && questionOrderClassNames.white,
              !isSpecialCard && questionOrderClassNames.gray,
            )}
          >
            {renderQuestionOrder()}
          </div>
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
  },
  (prev, next) => JSON.stringify(prev.question) === JSON.stringify(next.question),
);

export const QuestionFormFactory = ({ question }: QuestionCardProps) => {
  switch (question.type) {
    case QUESTION_TYPE_ENUM.WELCOME_SCREEN: {
      return <WelcomeForm />;
    }

    case QUESTION_TYPE_ENUM.THANK_YOU_SCREEN: {
      return <WelcomeForm />;
    }

    case QUESTION_TYPE_ENUM.FREE_TEXT: {
      return <FreeTextForm />;
    }

    case QUESTION_TYPE_ENUM.SINGLE_SELECT: {
      return <SingleSelectForm />;
    }

    case QUESTION_TYPE_ENUM.MULTIPLE_SELECT: {
      return <MutipleSelectForm />;
    }

    case QUESTION_TYPE_ENUM.FILE_UPLOAD: {
      return <FileUploadForm />;
    }

    case QUESTION_TYPE_ENUM.PICTURE_SELECTION: {
      return <PictureSelectionForm />;
    }

    case QUESTION_TYPE_ENUM.RATING: {
      return <RatingForm />;
    }
  }
};
