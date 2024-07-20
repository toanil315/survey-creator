import { SurveyContext } from '@/contexts';
import { useContext } from 'react';

export const useSurvey = () => {
  const survey = useContext(SurveyContext);
  if (!survey) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }

  return survey;
};
