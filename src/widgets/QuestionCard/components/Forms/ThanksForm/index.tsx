import { QuestionForm } from '@/components';

export const ThanksForm = () => {
  return (
    <>
      <QuestionForm.Input
        label='Note'
        name='title'
        required
        placeholder='Enter question title...'
      />
      <QuestionForm.Textarea
        label='Description'
        name='description'
        placeholder='Enter question description...'
        required
      />
    </>
  );
};
