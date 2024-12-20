export enum QUESTION_TYPE_ENUM {
  WELCOME_SCREEN = 'WELCOME_SCREEN',
  THANK_YOU_SCREEN = 'THANK_YOU_SCREEN',
  FREE_TEXT = 'FREE_TEXT',
  SINGLE_SELECT = 'SINGLE_CHOICE',
  MULTIPLE_SELECT = 'MULTIPLE_CHOICE',
  FILE_UPLOAD = 'FILE_UPLOAD',
  PICTURE_SELECTION = 'PICTURE_SELECTION',
  RATING = 'RATING',
  MATRIX = 'MATRIX',
}

export enum LOGIC_CONDITION_ENUM {
  IS_SUBMITTED = 'IS_SUBMITTED',
  EQUALS = 'EQUALS',
  DOES_NOT_EQUAL = 'DOES_NOT_EQUAL',
  INCLUDES_ONE_OF = 'INCLUDES_ONE_OF',
  INCLUDES_ALL_OF = 'INCLUDES_ALL_OF',
  IS_LESS_THAN = 'IS_LESS_THAN',
  IS_LESS_THAN_OR_EQUAL = 'IS_LESS_THAN_OR_EQUAL',
  IS_GREATER_THAN = 'IS_GREATER_THAN',
  IS_GREATER_THAN_OR_EQUAL = 'IS_GREATER_THAN_OR_EQUAL',
  IS_COMPLETELY_SUBMITTED = 'IS_COMPLETELY_SUBMITTED',
  IS_PARTIALLY_SUBMITTED = 'IS_PARTIALLY_SUBMITTED',
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
  [QUESTION_TYPE_ENUM.FILE_UPLOAD]: [LOGIC_CONDITION_ENUM.IS_SUBMITTED],
  [QUESTION_TYPE_ENUM.PICTURE_SELECTION]: [LOGIC_CONDITION_ENUM.IS_SUBMITTED],
  [QUESTION_TYPE_ENUM.RATING]: [
    LOGIC_CONDITION_ENUM.IS_SUBMITTED,
    LOGIC_CONDITION_ENUM.EQUALS,
    LOGIC_CONDITION_ENUM.DOES_NOT_EQUAL,
    LOGIC_CONDITION_ENUM.IS_LESS_THAN,
    LOGIC_CONDITION_ENUM.IS_LESS_THAN_OR_EQUAL,
    LOGIC_CONDITION_ENUM.IS_GREATER_THAN,
    LOGIC_CONDITION_ENUM.IS_GREATER_THAN_OR_EQUAL,
  ],
  [QUESTION_TYPE_ENUM.MATRIX]: [
    LOGIC_CONDITION_ENUM.IS_COMPLETELY_SUBMITTED,
    LOGIC_CONDITION_ENUM.IS_PARTIALLY_SUBMITTED,
  ],
};

export enum QUESTION_OPTION_ORDER_CONFIG_ENUM {
  KEEP_CURRENT_ORDER = 'KEEP_CURRENT_ORDER',
  RANDOMIZE_ALL = 'RANDOMIZE_ALL',
}

export enum RATING_RANGE_ENUM {
  '5 points (recommended)' = 5,
  '3 points' = 3,
  '4 points' = 4,
  '7 points' = 7,
  '10 points' = 10,
}
