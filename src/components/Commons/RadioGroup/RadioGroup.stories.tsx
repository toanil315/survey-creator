import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'RadioGroup component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <RadioGroup
          {...args}
          value={value}
          onChange={(value) => setValue(value)}
          label='Radio Group'
          required
          items={[
            {
              label: 'Option 1',
              value: '1',
            },
            {
              label: 'Option 2',
              value: '2',
            },
            {
              label: 'Option 3',
              value: '3',
            },
          ]}
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <RadioGroup
          value={value}
          onChange={(value) => setValue(value)}
          label='Radio Group'
          required
          items={[
            {
              label: 'Option 1',
              value: '1',
            },
            {
              label: 'Option 2',
              value: '2',
            },
            {
              label: 'Option 3',
              value: '3',
            },
          ]}
          error='This is an error message'
        />
      </div>
    );
  },
};
