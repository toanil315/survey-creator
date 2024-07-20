import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';
import { AccordionProps } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'Accordion component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const items: AccordionProps['items'] = [
  {
    key: '1',
    title: 'Accordion 1',
    container: <div>Accordion 1 content</div>,
    helperText: <p>helper text for accordion 1</p>,
  },
  { key: '2', title: 'Accordion 2', container: <div>Accordion 2 content</div> },
  { key: '3', title: 'Accordion 3', container: <div>Accordion 3 content</div> },
];

export const Primary: Story = {
  args: {
    items,
  },
};
