import type { Meta, StoryObj } from '@storybook/react';
import { AddQuestionCard } from '.';
import { SurveyProvider } from '@/contexts';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddQuestionCard> = {
  title: 'Widgets/AddQuestionCard',
  component: AddQuestionCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'AddQuestionCard component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddQuestionCard>;
export const Primary: Story = {
  render: () => {
    return (
      <SurveyProvider>
        <div style={{ width: 500 }}>
          <AddQuestionCard />
        </div>
      </SurveyProvider>
    );
  },
};
