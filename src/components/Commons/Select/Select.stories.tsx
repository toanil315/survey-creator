import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '.';
import { useState } from 'react';
import { Persona } from '@fluentui/react-components';
import { SelectOption } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    label: 'Label',
    required: true,
    name: 'select',
    placeholder: 'Select somethings...',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'yiminghe', label: 'Yiminghe' },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <Select
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
    name: 'select',
    placeholder: 'Select somethings...',
    options: [
      {
        group: {
          label: 'Group 1',
          options: [
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ],
        },
      },
      {
        group: {
          label: 'Group 2',
          options: [
            { value: 'tom', label: 'Tom' },
            { value: 'jerry', label: 'Jerry' },
          ],
        },
      },
      {
        label: 'John',
        value: 'john',
      },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <Select
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

export const MultiSelect: Story = {
  args: {
    label: 'Label',
    required: true,
    name: 'select',
    placeholder: 'Select somethings...',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <Select
          {...props}
          multiselect
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </div>
    );
  },
};

const renderFunction: SelectOption['renderFunction'] = (option) => {
  return (
    <Persona
      avatar={{ color: 'colorful', 'aria-hidden': true }}
      name={option.label}
      presence={{
        status: 'available',
      }}
      secondaryText='Available'
    />
  );
};

export const ComplexOptions: Story = {
  args: {
    label: 'Label',
    required: true,
    name: 'select',
    placeholder: 'Select somethings...',
    options: [
      {
        value: 'katri athokas',
        label: 'Katri Athokas',
        renderFunction,
      },
      {
        value: 'elvia atkins',
        label: 'Elvia Atkins',
        renderFunction,
      },
      {
        value: 'cameron evans',
        label: 'Cameron Evans',
        renderFunction,
      },
    ],
  },
  render: (props) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ width: '300px' }}>
        <Select
          {...props}
          multiselect
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
    name: 'select',
    placeholder: 'Select somethings...',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
    ],
    error: 'This is an error message',
  },
  render: (props) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <Select
          {...props}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    );
  },
};
