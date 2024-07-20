import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Input component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'password', 'number', 'url', 'email'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  render: (args) => {
    const [input, setInput] = useState('');
    const handleChange = (value: string) => {
      setInput(value);
    };

    return (
      <Input
        value={input as any}
        onChange={handleChange}
        label='Input'
        required
        placeholder='Enter somethings...'
        {...args}
      />
    );
  },
};

export const Number: Story = {
  render: () => {
    const [input, setInput] = useState(0);
    const handleChange = (value: number) => {
      setInput(value);
    };

    return (
      <Input
        value={input}
        onChange={handleChange}
        label='Input'
        required
        placeholder='Enter somethings...'
        type='number'
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [input, setInput] = useState('');
    const handleChange = (value: string) => {
      setInput(value);
    };

    return (
      <Input
        value={input}
        onChange={handleChange}
        label='Input'
        required
        placeholder='Enter somethings...'
        error='This is an error message'
      />
    );
  },
};
