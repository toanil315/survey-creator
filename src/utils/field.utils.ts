import { ConditionOperator, FIELD_TYPE_ENUM, LogicalOperator } from '@/constants/field';
import {
  Condition,
  Field,
  FieldConfig,
  ConditionTree,
  ConditionNode,
  LogicalNode,
} from '@/entities/field';
import get from 'lodash/get';

export class FieldUtils {
  static evaluateCondition(context: Record<string, string | number | unknown[]>, cond: Condition) {
    const actual = get(context, cond.field);
    const expected = cond.value;

    switch (cond.operator) {
      case ConditionOperator.Equals:
        return actual === expected;
      case ConditionOperator.NotEquals:
        return actual !== expected;
      case ConditionOperator.GreaterThan:
        return actual > expected;
      case ConditionOperator.LessThan:
        return actual < expected;
      case ConditionOperator.GreaterOrEqual:
        return actual >= expected;
      case ConditionOperator.LessOrEqual:
        return actual <= expected;
      case ConditionOperator.Includes:
        return (Array.isArray(actual) || typeof actual === 'string') && actual.includes(expected);
      case ConditionOperator.NotIncludes:
        console.log(
          cond,
          (Array.isArray(actual) || typeof actual === 'string') && !actual.includes(expected),
        );
        return (Array.isArray(actual) || typeof actual === 'string') && !actual.includes(expected);
    }
  }

  static evaluateFieldVisibility(
    context: Record<string, string | number | unknown[]>,
    field: FieldConfig,
  ): boolean {
    const { conditions, visibilityLogic } = field;

    const conditionValuesMap = new Map<string, boolean>();
    for (const condition of conditions) {
      conditionValuesMap.set(condition.id, this.evaluateCondition(context, condition));
    }

    return this.proceedRpnConditionalStatement(conditionValuesMap, visibilityLogic);
  }

  static evaluateFieldValidation(
    context: Record<string, string | number | unknown[]>,
    field: FieldConfig,
  ) {
    const { validations } = field;

    if (!validations || !validations.length) return null;

    const validationValuesMap = new Map<string, boolean>();
    for (const validation of validations) {
      if (validation.logic) continue;

      const validationEval = this.evaluateCondition(context, validation as Condition);
      // short circuit evaluation
      if (!validationEval && validation.message) return validation.message;

      validationValuesMap.set(validation.id, validationEval);
    }

    for (const validation of validations) {
      if (!validation.logic) continue;

      const complexValidationEval = this.proceedRpnConditionalStatement(
        validationValuesMap,
        validation.logic,
      );

      // short circuit evaluation
      if (!complexValidationEval && validation.message) return validation.message;
    }

    return null;
  }

  private static proceedRpnConditionalStatement(
    conditionalValues: Map<string, boolean>,
    logic: string[],
  ) {
    const stack: boolean[] = [];

    for (const token of logic) {
      // If token is condition operator, pull 2 item from stack and compute, then push back to stack.
      if (token === 'AND' || token === 'OR') {
        const firstCondition = stack.pop();
        const secondCondition = stack.pop();

        if (secondCondition === undefined || firstCondition === undefined) {
          console.warn('Invalid logic stack', stack);
          return false;
        }

        stack.push(
          token === 'AND' ? firstCondition && secondCondition : firstCondition || secondCondition,
        );
      } else if (token === 'NOT') {
        const firstCondition = stack.pop();

        if (firstCondition === undefined) {
          console.warn('Invalid logic stack', stack);
          return false;
        }

        stack.push(!firstCondition);
      } else {
        // If token is id of condition, push away to stack
        if (!conditionalValues.has(token)) stack.push(false);
        stack.push(conditionalValues.get(token)!);
      }
    }

    return stack.pop() ?? true;
  }

  static getDefaultFieldData(fieldType: FIELD_TYPE_ENUM): Partial<Field> {
    switch (fieldType) {
      case FIELD_TYPE_ENUM.FREE_TEXT:
        return {
          type: FIELD_TYPE_ENUM.FREE_TEXT,
          title: 'Who let the dogs out?',
          description: 'Who? Who? Who?',
          placeholder: 'Type your answer here',
          required: false,
          conditionTree: {
            [LogicalOperator.And]: [],
          },
        };

      case FIELD_TYPE_ENUM.SINGLE_SELECT:
        return {
          type: FIELD_TYPE_ENUM.SINGLE_SELECT,
          title: 'What do you do?',
          description: "Can't do both.",
          required: false,
          options: [
            { value: 'Eat the cake 🍰', isOther: false },
            { value: 'Have the cake 🎂', isOther: false },
          ],
          conditionTree: {
            [LogicalOperator.And]: [],
          },
        };
    }
  }

  static toRPN(node: ConditionTree): string[] {
    if (!(node as LogicalNode)[LogicalOperator.And] && !(node as LogicalNode)[LogicalOperator.Or]) {
      return [(node as ConditionNode).id];
    }

    const operator = (node as LogicalNode)[LogicalOperator.And]
      ? LogicalOperator.And
      : LogicalOperator.Or;
    const children =
      (node as LogicalNode)[LogicalOperator.And] ?? (node as LogicalNode)[LogicalOperator.Or] ?? [];

    const rpn: string[] = [];

    for (const child of children) {
      rpn.push(...this.toRPN(child));
    }

    // add operator n - 1 times
    for (let i = 1; i < children.length; i++) {
      rpn.push(operator);
    }

    return rpn;
  }

  // // Helper to merge same operator groups
  // static mergeGroup(operator: LogicalOperator, a: ConditionTree, b: ConditionTree): ConditionTree {
  //   const aGroup = typeof a === 'object' && a[operator];
  //   const bGroup = typeof b === 'object' && b[operator];

  //   if (aGroup && bGroup) {
  //     return { [operator]: [...aGroup, ...bGroup] };
  //   } else if (aGroup) {
  //     return { [operator]: [...aGroup, b] };
  //   } else if (bGroup) {
  //     return { [operator]: [a, ...bGroup] };
  //   } else {
  //     return { [operator]: [a, b] };
  //   }
  // }

  // static rpnToConditionTree(rpn: string[]): ConditionTree[] {
  //   const stack: ConditionTree[] = [];

  //   for (const token of rpn) {
  //     if (token === LogicalOperator.And || token === LogicalOperator.Or) {
  //       const right = stack.pop();
  //       const left = stack.pop();
  //       if (!left || !right) throw new Error('Invalid RPN: not enough operands');

  //       const merged = this.mergeGroup(token, left, right);
  //       stack.push(merged);
  //     } else {
  //       stack.push(token);
  //     }
  //   }

  //   return stack;
  // }
}
