import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '@/hooks';
import { Button } from '../Button';
import { Modal } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `Modal component, use modal instance returned from useModal hook to control modal' state.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  render: (args) => {
    const modal = useModal();

    return (
      <div>
        <Modal
          {...args}
          modal={modal}
          title='Modal Header'
          actions={
            <>
              <Button
                onClick={modal.hide}
                appearance='secondary'
              >
                Close
              </Button>
              <Button
                onClick={() => console.log('do something')}
                appearance='primary'
              >
                Do Something
              </Button>
            </>
          }
        >
          This dialog cannot be dismissed by clicking on the backdrop nor by pressing Escape. Close
          button should be pressed to dismiss this Alert
        </Modal>
        <Button onClick={modal.show}>Open Modal</Button>
      </div>
    );
  },
};
