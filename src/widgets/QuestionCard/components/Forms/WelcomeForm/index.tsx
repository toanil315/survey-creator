import { QuestionForm } from '@/components';

export const WelcomeForm = () => {
  return (
    <>
      <QuestionForm.Input
        label='Note'
        name='title'
        required
        placeholder='Enter question title...'
      />
      <QuestionForm.Textarea
        label='Welcome Message'
        name='description'
        placeholder='Enter question description...'
        required
      />
    </>
  );
};
