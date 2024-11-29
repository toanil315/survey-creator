import { SurveyContainer } from '@/containers/SurveyContainer';
import { SurveyProvider } from '@/contexts';

export default function HomePage() {
  return (
    <SurveyProvider>
      <SurveyContainer />
    </SurveyProvider>
  );
}
