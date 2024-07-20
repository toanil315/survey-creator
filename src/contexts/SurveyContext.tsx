import { QUESTION_TYPE_ENUM } from '@/constants';
import { Question } from '@/entities/question';
import { createContext, useMemo, useState } from 'react';

interface SurveyContextArgs {
  questions: Question[];
  currentQuestion: Question;
  currentQuestionId: string | null;
  changeCurrentQuestion: (questionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  updateQuestion: (question: Question) => void;
}

export const SurveyContext = createContext<SurveyContextArgs | null>(null);

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    type: QUESTION_TYPE_ENUM.FREE_TEXT,
    order: 1,
    title: 'Mock Question Title',
    description: 'Mock Question Description',
    placeholder: 'Mock Question Placeholder',
    required: true,
    optionsOrder: undefined,
    multiple: false,
    isLongText: true,
    backButtonLabel: 'Back',
    nextButtonLabel: 'Next',
    logics: [],
    options: [],
  },
  {
    id: '2',
    type: QUESTION_TYPE_ENUM.SINGLE_SELECT,
    order: 2,
    title: 'Mock Question Title',
    description: 'Mock Question Description',
    required: true,
    optionsOrder: undefined,
    multiple: false,
    isLongText: false,
    backButtonLabel: 'Back',
    nextButtonLabel: 'Next',
    logics: [],
    options: [
      {
        value: 'Option 1',
        isOther: false,
      },
      {
        value: 'Option 2',
        isOther: false,
      },
      {
        value: 'Option 3',
        isOther: false,
      },
    ],
  },
  {
    id: '3',
    type: QUESTION_TYPE_ENUM.MULTIPLE_SELECT,
    order: 3,
    title: 'Mock Question Title',
    description: 'Mock Question Description',
    required: true,
    optionsOrder: undefined,
    multiple: true,
    isLongText: false,
    backButtonLabel: 'Back',
    nextButtonLabel: 'Next',
    logics: [],
    options: [
      {
        value: 'Option 1',
        isOther: false,
      },
      {
        value: 'Option 2',
        isOther: false,
      },
      {
        value: 'Option 3',
        isOther: false,
      },
    ],
  },
];

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(questions[0].id);

  const handleBack = () => {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId,
    );
    setCurrentQuestionId(questions[currentQuestionIndex - 1].id);
  };

  const handleNext = () => {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId,
    );
    setCurrentQuestionId(questions[currentQuestionIndex + 1].id);
  };

  const changeCurrentQuestion = (questionId: string) => {
    setCurrentQuestionId(questionId);
  };

  const updateQuestion = (question: Question) => {
    const updatedQuestions = questions.map((q) =>
      q.id === question.id ? { ...q, ...question } : q,
    );
    setQuestions(updatedQuestions);
  };

  const value = useMemo(() => {
    return {
      questions,
      currentQuestion:
        questions.find((question) => question.id === currentQuestionId) || questions[0],
      currentQuestionId,
      changeCurrentQuestion,
      onNext: handleNext,
      onBack: handleBack,
      updateQuestion,
    };
  }, [questions, currentQuestionId]);

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
