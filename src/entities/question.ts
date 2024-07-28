import {
  LOGIC_CONDITION_ENUM,
  QUESTION_OPTION_ORDER_CONFIG_ENUM,
  QUESTION_TYPE_ENUM,
} from '@/constants';
import { ZodUtils } from '@/utils';
import i18next from 'i18next';
import { z } from 'zod';

export const QuestionLogicSchema = ZodUtils.zodAlwaysRefine(
  z.object({
    condition: z.nativeEnum(LOGIC_CONDITION_ENUM, {
      required_error: i18next.t('errors.required'),
    }),
    value: z.union([z.string(), z.array(z.string())]).optional(),
    to: z
      .string({
        required_error: i18next.t('errors.required'),
      })
      .min(1, i18next.t('errors.required')),
  }),
).superRefine(({ condition, value }, ctx) => {
  switch (condition) {
    case LOGIC_CONDITION_ENUM.IS_SUBMITTED:
      break;

    case LOGIC_CONDITION_ENUM.EQUALS:
    case LOGIC_CONDITION_ENUM.DOES_NOT_EQUAL: {
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: i18next.t('errors.required'),
          path: ['value'],
        });
      }
      break;
    }

    case LOGIC_CONDITION_ENUM.INCLUDES_ONE_OF:
    case LOGIC_CONDITION_ENUM.INCLUDES_ALL_OF: {
      if (!Array.isArray(value) || value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: i18next.t('errors.required'),
          path: ['value'],
        });
      }
      break;
    }
  }
});

export const QuestionOptionSchema = z.object({
  value: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  isOther: z.boolean().optional(),
});

export const QuestionSchema = z.object({
  id: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  type: z.nativeEnum(QUESTION_TYPE_ENUM),
  order: z.number().int(),
  title: z
    .string({ required_error: i18next.t('errors.required') })
    .min(1, i18next.t('errors.required')),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(QuestionOptionSchema).default([]),
  optionsOrder: z.nativeEnum(QUESTION_OPTION_ORDER_CONFIG_ENUM).optional(),
  multiple: z.boolean().optional(),
  isLongText: z.boolean().optional(),
  backButtonLabel: z.string().optional(),
  nextButtonLabel: z.string().optional(),
  logics: z.array(QuestionLogicSchema).default([]),
  allowMultipleFiles: z.boolean().optional(),
  limitFileTypes: z.array(z.string()).optional(),
  allowMultipleSelect: z.boolean().optional(),
  pictureSelectOptions: z.array(z.string()).optional(),
  range: z.string().optional(),
  lowerLabel: z.string().optional(),
  upperLabel: z.string().optional(),
});

export const QuestionAnswerSchema = z
  .object({
    question: QuestionSchema,
    answer: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .superRefine(({ question, answer }, ctx) => {
    if (
      question.type === QUESTION_TYPE_ENUM.WELCOME_SCREEN ||
      question.type === QUESTION_TYPE_ENUM.THANK_YOU_SCREEN
    ) {
      return;
    }

    if (question.required && (!answer || !answer.length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: i18next.t('errors.required'),
        path: ['answer'],
      });
    }
  });

export type QuestionLogic = z.infer<typeof QuestionLogicSchema>;
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>;
