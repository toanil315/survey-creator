import type { Meta, StoryObj } from '@storybook/react';
import { QuestionForm } from './index';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuestionForm> = {
  title: 'Components/Question Form',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Form component, combine between react-hook-form and yup for validation.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionForm>;

export const Primary: Story = {
  args: {},
  render: () => {
    const form = useForm<any>({
      defaultValues: {
        text: '',
      },
      resolver: zodResolver(
        z.object({
          text: z.string().min(1, 'this field is required'),
        }),
      ),
    });

    const onSubmit = (value: any) => console.log(value);

    return (
      <FormProvider {...form}>
        <h1>Form Example</h1>
        <QuestionForm
          style={{
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          formId='1'
        >
          <QuestionForm.Input
            label='Label'
            required
            placeholder='Enter somethings...'
            name='text'
          />
        </QuestionForm>
      </FormProvider>
    );
  },
};
