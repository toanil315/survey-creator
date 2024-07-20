import type { Meta, StoryObj } from '@storybook/react';
import { TagPicker } from '.';
import { useState } from 'react';
import { Avatar } from '@fluentui/react-components';
import { TagPickerOptionItem } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TagPicker> = {
  title: 'Components/TagPicker',
  component: TagPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'TagPicker component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TagPicker>;

const renderFunc: TagPickerOptionItem['renderFunction'] = (option) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Avatar
        aria-hidden
        name={option.value}
        color='colorful'
        style={{
          height: '20px',
        }}
      />
      {option.label}
    </div>
  );
};

export const Primary: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Pick somethings...',
    options: [
      {
        value: 'jack',
        label: 'Jack',
        renderFunction: renderFunc,
      },
      { value: 'lucy', label: 'Lucy', renderFunction: renderFunc },
      { value: 'yiminghe', label: 'Yiminghe', renderFunction: renderFunc },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <TagPicker
          {...props}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    );
  },
};

export const OptionGroup: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Pick somethings...',
    options: [
      {
        group: {
          label: 'Group 1',
          options: [
            { value: 'jack', label: 'Jack', renderFunction: renderFunc },
            { value: 'lucy', label: 'Lucy', renderFunction: renderFunc },
            { value: 'Yiminghe', label: 'yiminghe', renderFunction: renderFunc },
          ],
        },
      },
      {
        group: {
          label: 'Group 2',
          options: [
            { value: 'tom', label: 'Tom', renderFunction: renderFunc },
            { value: 'jerry', label: 'Jerry', renderFunction: renderFunc },
          ],
        },
      },
      {
        label: 'John',
        value: 'john',
        renderFunction: renderFunc,
      },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <TagPicker
          {...props}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </div>
    );
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Pick somethings...',
    options: [
      {
        value: 'jack',
        label: 'Jack',
        renderFunction: renderFunc,
      },
      { value: 'lucy', label: 'Lucy', renderFunction: renderFunc },
      { value: 'yiminghe', label: 'Yiminghe', renderFunction: renderFunc },
    ],
    error: 'This is an error',
  },
  render: (props) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <TagPicker
          {...props}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    );
  },
};
