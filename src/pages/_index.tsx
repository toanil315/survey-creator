import { SurveyContainer } from '@/containers/SurveyContainer';
import { SurveyProvider } from '@/contexts';

export function HomePage() {
  return (
    <SurveyProvider>
      <SurveyContainer />
    </SurveyProvider>
  );
}
