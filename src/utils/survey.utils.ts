import { LOGIC_CONDITION_ENUM } from '@/constants';
import { QuestionLogic } from '@/entities/question';

export class SurveyUtils {
  static evaluateCondition(logic: QuestionLogic, responseValue: string | string[]): boolean {
    switch (logic.condition) {
      case LOGIC_CONDITION_ENUM.IS_SUBMITTED:
        return Array.isArray(responseValue) ? responseValue.length > 0 : responseValue !== '';

      case LOGIC_CONDITION_ENUM.EQUALS:
        return responseValue.toString() === logic.value;

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
}
