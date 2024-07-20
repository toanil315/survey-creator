import type { Meta, StoryObj } from '@storybook/react';
import { QuestionCard } from '.';
import { QUESTION_TYPE_ENUM } from '@/constants';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuestionCard> = {
  title: 'Widgets/QuestionCard',
  component: QuestionCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'QuestionCard component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

export const Primary: Story = {
  args: {
    question: {
      id: '1',
      type: QUESTION_TYPE_ENUM.FREE_TEXT,
      order: 1,
      title: 'Mock Question Title',
      description: 'Mock Question Description',
      placeholder: 'Mock Question Placeholder',
      required: true,
      optionsOrder: undefined,
      multiple: false,
      isLongText: false,
      backButtonLabel: 'Back',
      nextButtonLabel: 'Next',
      logics: [],
      options: [],
    },
  },
  render: ({ question }) => (
    <div style={{ width: 560 }}>
      <QuestionCard question={question} />
    </div>
  ),
};

export const SingleSelectQuestion: Story = {
  args: {
    question: {
      id: '1',
      type: QUESTION_TYPE_ENUM.SINGLE_SELECT,
      order: 1,
      title: 'Mock Question Title',
      description: 'Mock Question Description',
      required: true,
      optionsOrder: undefined,
      multiple: false,
      isLongText: false,
      backButtonLabel: 'Back',
      nextButtonLabel: 'Next',
      logics: [],
      options: [
        {
          value: 'Option 1',
          isOther: false,
        },
        {
          value: 'Option 2',
          isOther: false,
        },
        {
          value: 'Option 3',
          isOther: false,
        },
      ],
    },
  },
  render: ({ question }) => (
    <div style={{ width: 560 }}>
      <QuestionCard question={question} />
    </div>
  ),
};
