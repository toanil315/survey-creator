export enum QUESTION_TYPE_ENUM {
  FREE_TEXT = 'FREE_TEXT',
  SINGLE_SELECT = 'SINGLE_CHOICE',
  MULTIPLE_SELECT = 'MULTIPLE_CHOICE',
}

export enum LOGIC_CONDITION_ENUM {
  IS_SUBMITTED = 'IS_SUBMITTED',
  EQUALS = 'EQUALS',
  DOES_NOT_EQUAL = 'DOES_NOT_EQUAL',
  INCLUDES_ONE_OF = 'INCLUDES_ONE_OF',
  INCLUDES_ALL_OF = 'INCLUDES_ALL_OF',
}

export const LOGICS_BELONG_TO_QUESTION_TYPE = {
  [QUESTION_TYPE_ENUM.FREE_TEXT]: [LOGIC_CONDITION_ENUM.IS_SUBMITTED],
  [QUESTION_TYPE_ENUM.SINGLE_SELECT]: [
    LOGIC_CONDITION_ENUM.IS_SUBMITTED,
    LOGIC_CONDITION_ENUM.EQUALS,
    LOGIC_CONDITION_ENUM.INCLUDES_ONE_OF,
  ],
  [QUESTION_TYPE_ENUM.MULTIPLE_SELECT]: [
    LOGIC_CONDITION_ENUM.IS_SUBMITTED,
    LOGIC_CONDITION_ENUM.INCLUDES_ONE_OF,
    LOGIC_CONDITION_ENUM.INCLUDES_ALL_OF,
  ],
};

export enum QUESTION_OPTION_ORDER_CONFIG_ENUM {
  KEEP_CURRENT_ORDER = 'KEEP_CURRENT_ORDER',
  RANDOMIZE_ALL = 'RANDOMIZE_ALL',
}