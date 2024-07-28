import { LOGIC_CONDITION_ENUM, QUESTION_TYPE_ENUM } from '@/constants';
import { Question, QuestionLogic } from '@/entities/question';

export class SurveyUtils {
  static evaluateCondition(logic: QuestionLogic, responseValue?: string | string[]): boolean {
    switch (logic.condition) {
      case LOGIC_CONDITION_ENUM.IS_SUBMITTED:
        return Array.isArray(responseValue) ? responseValue.length > 0 : responseValue !== '';

      case LOGIC_CONDITION_ENUM.EQUALS:
        return responseValue?.toString() === logic.value;

      case LOGIC_CONDITION_ENUM.DOES_NOT_EQUAL:
        return responseValue?.toString() !== logic.value;

      case LOGIC_CONDITION_ENUM.INCLUDES_ALL_OF:
        return (
          Array.isArray(responseValue) &&
          Array.isArray(logic.value) &&
          logic.value.every((v) => responseValue.includes(v))
        );

      case LOGIC_CONDITION_ENUM.INCLUDES_ONE_OF:
        if (!Array.isArray(logic.value)) return false;
        return Array.isArray(responseValue)
          ? logic.value.some((v) => responseValue.includes(v))
          : typeof responseValue === 'string' && logic.value.includes(responseValue);

      case LOGIC_CONDITION_ENUM.IS_LESS_THAN:
        return Number(responseValue) < Number(logic.value);

      case LOGIC_CONDITION_ENUM.IS_LESS_THAN_OR_EQUAL:
        return Number(responseValue) <= Number(logic.value);

      case LOGIC_CONDITION_ENUM.IS_GREATER_THAN:
        return Number(responseValue) > Number(logic.value);

      case LOGIC_CONDITION_ENUM.IS_GREATER_THAN_OR_EQUAL:
        return Number(responseValue) >= Number(logic.value);

      default:
        return false;
    }
  }

  static getDefaultQuestionData(questionType: QUESTION_TYPE_ENUM): Partial<Question> {
    switch (questionType) {
      case QUESTION_TYPE_ENUM.FREE_TEXT:
        return {
          type: QUESTION_TYPE_ENUM.FREE_TEXT,
          title: 'Who let the dogs out?',
          description: 'Who? Who? Who?',
          placeholder: 'Type your answer here',
          required: false,
          optionsOrder: undefined,
          multiple: false,
          isLongText: true,
          backButtonLabel: 'Back',
          nextButtonLabel: 'Next',
          logics: [],
          options: [],
        };

      case QUESTION_TYPE_ENUM.MULTIPLE_SELECT:
        return {
          id: String(Date.now()),
          order: 1,
          type: QUESTION_TYPE_ENUM.MULTIPLE_SELECT,
          title: "What's important on vacay?",
          description: 'Question Description',
          required: false,
          optionsOrder: undefined,
          multiple: true,
          isLongText: false,
          backButtonLabel: 'Back',
          nextButtonLabel: 'Next',
          logics: [],
          options: [
            { value: 'Sun ☀️', isOther: false },
            { value: 'Ocean 🌊', isOther: false },
            { value: 'Palms 🌴', isOther: false },
          ],
        };

      case QUESTION_TYPE_ENUM.SINGLE_SELECT:
        return {
          type: QUESTION_TYPE_ENUM.SINGLE_SELECT,
          title: 'What do you do?',
          description: "Can't do both.",
          required: false,
          optionsOrder: undefined,
          multiple: false,
          isLongText: false,
          backButtonLabel: 'Back',
          nextButtonLabel: 'Next',
          logics: [],
          options: [
            { value: 'Eat the cake 🍰', isOther: false },
            { value: 'Have the cake 🎂', isOther: false },
          ],
        };

      case QUESTION_TYPE_ENUM.FILE_UPLOAD:
        return {
          type: QUESTION_TYPE_ENUM.FILE_UPLOAD,
          title: 'File Upload',
          description: 'Upload your file here.',
          required: false,
          allowMultipleFiles: false,
          limitFileTypes: [],
          logics: [],
          options: [],
        };

      case QUESTION_TYPE_ENUM.PICTURE_SELECTION:
        return {
          type: QUESTION_TYPE_ENUM.PICTURE_SELECTION,
          title: 'Which is the cutest puppy?',
          description: 'You can also pick both.',
          required: false,
          allowMultipleSelect: true,
          pictureSelectOptions: [
            'https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-1-small.jpg',
            'https://formbricks-cdn.s3.eu-central-1.amazonaws.com/puppy-2-small.jpg',
          ],
          logics: [],
          options: [],
        };

      case QUESTION_TYPE_ENUM.RATING:
        return {
          type: QUESTION_TYPE_ENUM.RATING,
          title: 'How would you rate My Product?',
          description: "Don't worry, be honest.",
          required: false,
          logics: [],
          options: [
            {
              value: '1',
              isOther: false,
            },
            {
              value: '2',
              isOther: false,
            },
            {
              value: '3',
              isOther: false,
            },
            {
              value: '4',
              isOther: false,
            },
            {
              value: '5',
              isOther: false,
            },
          ],
          range: '5',
          lowerLabel: 'Not Good',
          upperLabel: 'Very Good',
        };

      default:
        return {
          type: QUESTION_TYPE_ENUM.FREE_TEXT,
          title: 'Who let the dogs out?',
          description: 'Who? Who? Who?',
          required: false,
          optionsOrder: undefined,
          multiple: false,
          isLongText: true,
          backButtonLabel: 'Back',
          nextButtonLabel: 'Next',
          logics: [],
          options: [],
        };
    }
  }
}
