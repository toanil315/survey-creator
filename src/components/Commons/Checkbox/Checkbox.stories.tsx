import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    size: 'medium',
    label: 'Checkbox',
    required: true,
  },
};

export const CheckboxGroup: Story = {
  args: {},
  render: () => {
    return (
      <Checkbox.Group
        items={[
          { label: 'Checkbox 1', value: '1' },
          { label: 'Checkbox 2', value: '2' },
          { label: 'Checkbox 3', value: '3' },
        ]}
        direction='column'
        onChange={(value) => console.log('onChange', value)}
        label='Checkbox Group'
      />
    );
  },
};

export const Single: Story = {
  render: () => {
    return (
      <Checkbox
        onChange={(value) => console.log('onChange', value)}
        label='Checkbox'
        required
      />
    );
  },
};

export const Error: Story = {
  args: {},
  render: () => {
    return (
      <Checkbox.Group
        items={[
          { label: 'Checkbox 1', value: '1' },
          { label: 'Checkbox 2', value: '2' },
          { label: 'Checkbox 3', value: '3' },
        ]}
        direction='column'
        onChange={(value) => console.log('onChange', value)}
        label='Checkbox Group'
        error='This is an error message'
      />
    );
  },
};
