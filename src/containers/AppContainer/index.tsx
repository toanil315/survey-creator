import { QuestionsIcon } from '@/components';
import { PreviewScreen } from '@/widgets/PreviewScreen';
import { QuestionList } from '@/widgets/QuestionList';
import { useAppLayoutBaseClassName, useNavBaseClassName } from './style';
import { tokens } from '@fluentui/react-components';

export const AppContainer = () => {
  const appLayoutBaseClassName = useAppLayoutBaseClassName();
  const navBaseClassName = useNavBaseClassName();

  return (
    <div className={appLayoutBaseClassName}>
      <div>
        <nav className={navBaseClassName}>
          <QuestionsIcon
            width={24}
            height={24}
            stroke={tokens.colorBrandBackground}
          />{' '}
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
