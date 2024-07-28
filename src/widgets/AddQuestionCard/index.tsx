import { useSurvey } from '@/hooks';
import {
  useQuestionCardBaseClassName,
  useQuestionListBaseClassName,
  useQuestionOrderBaseClassName,
  useQuestionTypeBaseClassName,
} from './style';
import {
  Accordion,
  FreeTextIcon,
  MultipleSelectIcon,
  PictureSelectionIcon,
  PlusIcon,
  RatingIcon,
  SingleSelectIcon,
  UploadIcon,
} from '@/components';
import { QUESTION_TYPE_ENUM } from '@/constants';
import { EnumUtils, StringUtils } from '@/utils';
import { tokens } from '@fluentui/react-components';

export const AddQuestionCard = () => {
  const questionCardBaseClassName = useQuestionCardBaseClassName();
  const questionOrderBaseClassName = useQuestionOrderBaseClassName();
  const questionListBaseClassName = useQuestionListBaseClassName();
  const questionTypeBaseClassName = useQuestionTypeBaseClassName();

  const { addQuestion } = useSurvey();

  const renderQuestionIcon = (type: QUESTION_TYPE_ENUM) => {
    const props = {
      width: 20,
      height: 20,
      stroke: tokens.colorBrandBackground,
    };

    switch (type) {
      case QUESTION_TYPE_ENUM.FREE_TEXT:
        return <FreeTextIcon {...props} />;

      case QUESTION_TYPE_ENUM.SINGLE_SELECT:
        return <SingleSelectIcon {...props} />;

      case QUESTION_TYPE_ENUM.MULTIPLE_SELECT:
        return <MultipleSelectIcon {...props} />;

      case QUESTION_TYPE_ENUM.FILE_UPLOAD:
        return <UploadIcon {...props} />;

      case QUESTION_TYPE_ENUM.PICTURE_SELECTION:
        return <PictureSelectionIcon {...props} />;

      case QUESTION_TYPE_ENUM.RATING:
        return <RatingIcon {...props} />;
    }
  };

  const renderQuestionTypes = () => {
    return EnumUtils.stringEnumToArray(QUESTION_TYPE_ENUM).map((questionType) => {
      if (
        questionType.value === QUESTION_TYPE_ENUM.WELCOME_SCREEN ||
        questionType.value === QUESTION_TYPE_ENUM.THANK_YOU_SCREEN
      ) {
        return null;
      }

      return (
        <div
          key={questionType.value}
          className={questionTypeBaseClassName}
          onClick={() => addQuestion(questionType.value as QUESTION_TYPE_ENUM)}
        >
          <div className='icon'>{renderQuestionIcon(questionType.value as QUESTION_TYPE_ENUM)}</div>
          <div>{StringUtils.convertToLabel(questionType.key)}</div>
        </div>
      );
    });
  };

  return (
    <div className={questionCardBaseClassName}>
      <div className={questionOrderBaseClassName}>
        <PlusIcon fill='white' />
      </div>
      <Accordion
        style={{ flex: 1 }}
        items={[
          {
            key: 'add-question',
            title: 'Add Question',
            container: <div className={questionListBaseClassName}>{renderQuestionTypes()}</div>,
            helperText: <p>Add a new question to your survey</p>,
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
