import { ConditionOperator, FIELD_TYPE_ENUM, LogicalOperator } from '@/constants/field';
import i18next from 'i18next';
import { z } from 'zod';

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: any;
}

export interface Validation {
  id: string;

  // 3 fields below can be omitted only in case combine validation.
  field?: string;
  operator?: ConditionOperator;
  value?: any;

  // Error message to show if validation fails
  message: string;

  // Conditional Statement for combine validation
  logic?: string[];
}

export interface FieldConfig {
  name: string;
  label: string;
  type: string;

  // For condition/validation statement structure, I'm using RPN (Reverse Polish Notation).
  conditions: Condition[];
  visibilityLogic: string[];
  validations?: Validation[];
}

export type ConditionTree = ConditionNode | LogicalNode;

export type LogicalNode = {
  [LogicalOperator.And]?: ConditionTree[];
  [LogicalOperator.Or]?: ConditionTree[];
};

export const ConditionNodeSchema = z.object({
  id: z.string().min(1, i18next.t('errors.required')),
  field: z.string().min(1, i18next.t('errors.required')),
  operator: z.nativeEnum(ConditionOperator, {
    required_error: i18next.t('errors.required'),
  }),
  value: z.string().min(1, i18next.t('errors.required')),
});

const ConditionTreeSchema: z.ZodType<ConditionTree> = z.lazy(() =>
  z.union([
    ConditionNodeSchema,
    z
      .object({
        [LogicalOperator.And]: z.array(ConditionTreeSchema).optional(),
        [LogicalOperator.Or]: z.array(ConditionTreeSchema).optional(),
      })
      .refine((data) => data[LogicalOperator.And] || data[LogicalOperator.Or], {
        message: "Either 'and' or 'or' must be defined",
      }),
  ]),
);

export const FieldOptionSchema = z.object({
  value: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  isOther: z.boolean().optional(),
});

export const FieldSchema = z.object({
  id: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  type: z.nativeEnum(FIELD_TYPE_ENUM),
  order: z.number().int(),
  title: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(FieldOptionSchema).default([]),
  conditionTree: ConditionTreeSchema,
});

export type FieldOption = z.infer<typeof FieldOptionSchema>;
export type Field = z.infer<typeof FieldSchema>;
export type ConditionNode = z.infer<typeof ConditionNodeSchema>;
