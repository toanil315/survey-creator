import { QuestionsIcon } from '@/components';
import { PreviewScreen } from '@/widgets/PreviewScreen';
import { QuestionList } from '@/widgets/QuestionList';
import { useSurveyLayoutBaseClassName, useNavBaseClassName } from './style';
import { tokens } from '@fluentui/react-components';

export const SurveyContainer = () => {
  const surveyLayoutBaseClassName = useSurveyLayoutBaseClassName();
  const navBaseClassName = useNavBaseClassName();

  return (
    <div className={surveyLayoutBaseClassName}>
      <div>
        <nav className={navBaseClassName}>
          <QuestionsIcon
            width={24}
            height={24}
            stroke={tokens.colorBrandBackground}
          />
          Questions
        </nav>
        <QuestionList />
      </div>
      <div className='preview'>
        <PreviewScreen />
      </div>
    </div>
  );
};
