import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'DatePicker component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  args: {
    label: 'Label',
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    required: true,
    error: 'This field is required.',
  },
};
