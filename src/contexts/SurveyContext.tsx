import { QUESTION_TYPE_ENUM } from '@/constants';
import { Question, QuestionAnswer } from '@/entities/question';
import { SurveyUtils } from '@/utils';
import { createContext, useMemo, useState } from 'react';

interface SurveyContextArgs {
  questions: Question[];
  currentQuestion: Question;
  currentQuestionId: string | null;
  changeCurrentQuestion: (questionId: string) => void;
  onNext: (questionAnswer: QuestionAnswer) => void;
  onBack: () => void;
  updateQuestion: (question: Question) => void;
  addQuestion: (questionType: QUESTION_TYPE_ENUM) => void;
}

export const SurveyContext = createContext<SurveyContextArgs | null>(null);

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    type: QUESTION_TYPE_ENUM.WELCOME_SCREEN,
    order: 1,
    title: 'Welcome!',
    description: "Thanks for providing your feedback - let's go!",
    placeholder: '',
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
    type: QUESTION_TYPE_ENUM.THANK_YOU_SCREEN,
    order: 2,
    title: 'Thank you!',
    description: 'We appreciate your feedback.',
    required: true,
    optionsOrder: undefined,
    multiple: false,
    isLongText: false,
    backButtonLabel: 'Back',
    nextButtonLabel: 'Next',
    logics: [],
    options: [],
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

  const handleNext = (questionAnswer: QuestionAnswer) => {
    console.log('questionAnswer', questionAnswer);

    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId,
    );
    let nextQuestionId = questions[currentQuestionIndex + 1].id;
    if (questionAnswer.question.logics.length) {
      for (const logic of questionAnswer.question.logics) {
        if (SurveyUtils.evaluateCondition(logic, questionAnswer.answer)) {
          nextQuestionId = logic.to;
          break;
        }
      }
    }
    setCurrentQuestionId(nextQuestionId);
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

  const addQuestion = (questionType: QUESTION_TYPE_ENUM) => {
    const newQuestion = {
      ...SurveyUtils.getDefaultQuestionData(questionType),
      id: String(Date.now()),
      type: questionType,
      order: questions.length + 1,
    } as Question;
    setQuestions(
      [
        ...questions.slice(0, questions.length - 1),
        newQuestion,
        questions[questions.length - 1],
      ].map((q, index) => ({ ...q, order: index + 1 })),
    );
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
      addQuestion,
    };
  }, [questions, currentQuestionId]);

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};
