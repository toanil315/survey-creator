import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Switch component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    label: 'Label',
    required: true,
    checkedText: 'On',
    unCheckedText: 'Off',
  },
  render: (props) => {
    const [value, setValue] = useState<boolean>(false);

    return (
      <div style={{ width: '300px' }}>
        <Switch
          {...props}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    );
  },
};
