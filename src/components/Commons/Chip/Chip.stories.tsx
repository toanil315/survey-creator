import type { Meta, StoryObj } from '@storybook/react';
import Chip from '.';
import { ChipColor } from './types';
import { CloseIcon } from '@/components/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Small: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        {['default', 'intro', 'success', 'warning', 'error'].map((color) => (
          <Chip
            key={color}
            color={color as ChipColor}
            size={'small'}
          >
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Medium: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        {['default', 'intro', 'success', 'warning', 'error'].map((color) => (
          <Chip
            key={color}
            color={color as ChipColor}
            size='medium'
          >
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        {['default', 'intro', 'success', 'warning', 'error'].map((color) => (
          <Chip
            key={color}
            color={color as ChipColor}
            size='large'
          >
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Icon: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        {['default', 'intro', 'success', 'warning', 'error'].map((color) => (
          <Chip
            key={color}
            color={color as ChipColor}
            size='medium'
            icon={<CloseIcon fill='white' />}
          >
            {color}
          </Chip>
        ))}
      </div>
    );
  },
};
