import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from '.';
import { Button } from '../Button';
import LockClosedImage from './LockState.png';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Primary: Story = {
  args: {
    header: "You don't have access to this issue",
    description:
      "Make sure the issue exists in this project. If it does, ask a project admin for permission to see the project's issues.",
    primaryAction: <Button>Create issue</Button>,
    icon: (
      <img
        style={{ height: '150px' }}
        src={LockClosedImage}
        alt='empty image'
      />
    ),
  },
};
