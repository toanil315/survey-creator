import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  render: () => {
    const [textarea, setTextarea] = useState('');
    const handleChange = (value: string) => {
      setTextarea(value);
    };

    return (
      <Textarea
        value={textarea}
        onChange={handleChange}
        label='Textarea'
        required
        placeholder='Enter somethings...'
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [textarea, setTextarea] = useState('');
    const handleChange = (value: string) => {
      setTextarea(value);
    };

    return (
      <Textarea
        value={textarea}
        onChange={handleChange}
        label='Textarea'
        required
        placeholder='Enter somethings...'
        error='This is an error message'
      />
    );
  },
};
