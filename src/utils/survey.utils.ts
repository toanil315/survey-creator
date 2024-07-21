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
        return responseValue !== logic.value;

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
