import { useSurvey } from '@/hooks';
import { QuestionCard } from '../QuestionCard';
import { useQuestionListBaseClassName } from './style';
import { AddQuestionCard } from '../AddQuestionCard';

export const QuestionList = () => {
  const questionListBaseClassName = useQuestionListBaseClassName();

  const { questions } = useSurvey();

  return (
    <div className={questionListBaseClassName}>
      {questions.map((question) => {
        return (
          <QuestionCard
            key={question.id}
            question={question}
          />
        );
      })}
      <AddQuestionCard />
    </div>
  );
};
