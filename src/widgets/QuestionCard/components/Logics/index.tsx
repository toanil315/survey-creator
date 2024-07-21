import {
  Accordion,
  ArrowDownIcon,
  Button,
  DownIcon,
  LogicJumpIcon,
  QuestionForm,
  QuestionMarkIcon,
  SquareArrowIcon,
  TrashIcon,
} from '@/components';
import { LOGICS_BELONG_TO_QUESTION_TYPE, LOGIC_CONDITION_ENUM } from '@/constants';
import { StringUtils } from '@/utils';
import { useQuestionFormContainerBaseClassName } from '@/widgets/QuestionCard/style';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  useCustomAccrodionBaseClassName,
  useQuestionLogicContainerBaseClassName,
  useRemoveButtonBaseClassName,
  useTitleBaseClassName,
} from './style';
import { Tooltip } from '@fluentui/react-components';
import { QuestionOption } from '@/entities/question';
import { useSurvey } from '@/hooks';

export const QuestionLogicJump = () => {
  const titleBaseClassName = useTitleBaseClassName();
  const customAccordionBaseClassName = useCustomAccrodionBaseClassName();
  const questionFormContainerBaseClassName = useQuestionFormContainerBaseClassName();
  const questionLogicContainerBaseClassName = useQuestionLogicContainerBaseClassName();
  const removeButtonBaseClassName = useRemoveButtonBaseClassName();

  const { questions, currentQuestion } = useSurvey();
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'logics',
    control,
  });

  const handleAppendLogic = () => {
    append({
      condition: undefined,
      value: undefined,
      to: undefined,
    });
  };

  return (
    <Accordion
      className={customAccordionBaseClassName}
      items={[
        {
          key: '1',
          title: (
            <p className={titleBaseClassName}>
              <span>Logic Jump</span>
              <Tooltip
                content={
                  'With logic jumps you can skip questions based on the responses users give.'
                }
                relationship='description'
                appearance='inverted'
                withArrow
              >
                <span style={{ lineHeight: 0 }}>
                  <QuestionMarkIcon
                    width={18}
                    height={18}
                  />
                </span>
              </Tooltip>
            </p>
          ),
          container: (
            <div className={questionFormContainerBaseClassName}>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className={questionLogicContainerBaseClassName}>
                    <span className='statement'>
                      <SquareArrowIcon
                        width={18}
                        height={18}
                      />{' '}
                      If this answer
                    </span>
                    <QuestionForm.Select
                      size='small'
                      placeholder='Select conditions'
                      name={`logics.${index}.condition`}
                      options={LOGICS_BELONG_TO_QUESTION_TYPE[
                        watch('type') as keyof typeof LOGICS_BELONG_TO_QUESTION_TYPE
                      ].map((value) => {
                        return {
                          label: StringUtils.convertToLabel(value),
                          value,
                        };
                      })}
                    />
                    <QuestionForm.Select
                      size='small'
                      placeholder='Select value'
                      name={`logics.${index}.value`}
                      options={watch('options').map(({ value }: QuestionOption) => {
                        return {
                          label: StringUtils.convertToLabel(value, true),
                          value,
                        };
                      })}
                      disabled={
                        watch(`logics.${index}.condition`) === LOGIC_CONDITION_ENUM.IS_SUBMITTED
                      }
                    />
                  </div>
                  <div className={questionLogicContainerBaseClassName}>
                    <span className='statement'>then jump to</span>
                    <QuestionForm.Select
                      size='small'
                      placeholder='Select question'
                      name={`logics.${index}.to`}
                      options={questions
                        .filter((q) => q.id !== currentQuestion.id)
                        .slice(1, questions.length - 1)
                        .map((q) => ({
                          label: q.title,
                          value: q.id,
                        }))}
                    />
                    <div
                      className={removeButtonBaseClassName}
                      onClick={() => remove(index)}
                    >
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              ))}
              {fields.length > 0 && (
                <div className={questionLogicContainerBaseClassName}>
                  <ArrowDownIcon /> All other answers will continue to the next question
                </div>
              )}

              <Button
                appearance='primary'
                size='small'
                onClick={handleAppendLogic}
                style={{ width: 120 }}
              >
                <LogicJumpIcon
                  width={14}
                  height={14}
                />
                Add Logic
              </Button>
            </div>
          ),
        },
      ]}
      accordionIcon={{
        collapse: (
          <DownIcon
            width={20}
            height={20}
            style={{ transform: 'rotate(180deg)' }}
          />
        ),
        expand: (
          <DownIcon
            width={20}
            height={20}
          />
        ),
      }}
    />
  );
};
