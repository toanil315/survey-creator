import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '.';
import { UPLOADER_ENUM } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `
          FileUploader component, you need to pass value and onChange function to this component.
          Otherwise, after uploaded, the result will be disappeared.
          `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Primary: Story = {
  args: {
    label: 'Label',
    name: 'file',
    componentType: UPLOADER_ENUM.BROWSE_AREA,
  },
  render: (props) => (
    <div style={{ width: '300px' }}>
      <FileUploader {...props} />
    </div>
  ),
};

export const Input: Story = {
  args: {
    label: 'Label',
    name: 'file',
    componentType: UPLOADER_ENUM.BROWSE_INPUT,
  },
  render: (props) => (
    <div style={{ width: '300px' }}>
      <FileUploader {...props} />
    </div>
  ),
};

export const Dnd: Story = {
  args: {
    label: 'Label',
    name: 'file',
    componentType: UPLOADER_ENUM.DRAG_AND_DROP,
  },
  render: (props) => (
    <div style={{ width: '300px' }}>
      <FileUploader {...props} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    label: 'Label',
    name: 'file',
    componentType: UPLOADER_ENUM.BROWSE_AREA,
    error: 'This is an error message',
  },
  render: (props) => (
    <div style={{ width: '300px' }}>
      <FileUploader {...props} />
    </div>
  ),
};
