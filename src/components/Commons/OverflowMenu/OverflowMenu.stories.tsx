import type { Meta, StoryObj } from '@storybook/react';
import { OverflowMenu } from '.';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OverflowMenu> = {
  title: 'Components/Overflow Menu',
  component: OverflowMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'OverflowMenu component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OverflowMenu>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: 'Profile',
        key: '1',
      },
      {
        label: 'Setting',
        key: '2',
      },
      {
        label: 'Logout',
        key: '4',
      },
    ],
  },
  render: (args) => {
    return (
      <OverflowMenu {...args}>
        <Button>Click Me</Button>
      </OverflowMenu>
    );
  },
};
