import type { Meta, StoryObj } from '@storybook/react';
import { Toast, Toaster } from '.';
import { Button } from '../Button';
import { openToast } from './openToast';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Toast component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <Button
          onClick={() =>
            openToast({
              props: {
                title: 'Toast title',
                body: 'Toast body',
                actions: (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button>Click me</Button>
                  </div>
                ),
                dismissable: true,
              },
              timeout: 1000,
              position: 'top-end',
              intent: 'success',
            })
          }
        >
          Make toast
        </Button>
      </>
    );
  },
};
