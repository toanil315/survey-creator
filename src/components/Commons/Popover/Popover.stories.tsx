import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Popover } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Popover component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
  render: () => {
    const popoverContent = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );

    return (
      <Popover
        content={popoverContent}
        title='Title'
      >
        <Button>Popover (click me)</Button>
      </Popover>
    );
  },
};
