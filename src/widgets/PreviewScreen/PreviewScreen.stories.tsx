import type { Meta, StoryObj } from '@storybook/react';
import { PreviewScreen } from '.';
import { SurveyProvider } from '@/contexts';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PreviewScreen> = {
  title: 'Widgets/PreviewScreen',
  component: PreviewScreen,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'PreviewScreen component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PreviewScreen>;

export const Primary: Story = {
  render: () => (
    <SurveyProvider>
      <div style={{ width: 600, height: 800 }}>
        <PreviewScreen />
      </div>
    </SurveyProvider>
  ),
};
