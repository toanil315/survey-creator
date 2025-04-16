export enum ConditionOperator {
  Equals = 'equals',
  NotEquals = 'not_equals',
  GreaterThan = 'greater_than',
  LessThan = 'less_than',
  GreaterOrEqual = 'greater_or_equal',
  LessOrEqual = 'less_or_equal',
  Includes = 'includes',
  NotIncludes = 'not_includes',
}

export enum LogicalOperator {
  And = 'And',
  Or = 'Or',
}

export enum FIELD_TYPE_ENUM {
  FREE_TEXT = 'FREE_TEXT',
  SINGLE_SELECT = 'SINGLE_CHOICE',
}
