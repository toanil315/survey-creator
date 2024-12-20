import { QuestionsIcon } from '@/components';
import { PreviewScreen } from '@/widgets/PreviewScreen';
import { QuestionList } from '@/widgets/QuestionList';
import {
  useSurveyLayoutBaseClassName,
  useNavBaseClassName,
  useProductTourButtonBaseClassName,
} from './style';
import { Tooltip, tokens } from '@fluentui/react-components';

export const SurveyContainer = () => {
  const surveyLayoutBaseClassName = useSurveyLayoutBaseClassName();
  const navBaseClassName = useNavBaseClassName();
  const productTourButtonBaseClassName = useProductTourButtonBaseClassName();

  const handleOpenProductGuidingTour = () => {
    window.dispatchEvent(new CustomEvent('show-tour'));
  };

  return (
    <>
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
      <Tooltip
        relationship='description'
        content={'Open Product Guiding Tour'}
        appearance='inverted'
        withArrow
      >
        <div
          className={productTourButtonBaseClassName}
          onClick={handleOpenProductGuidingTour}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M12 2C12.6576 2 13.3062 2.15311 13.8944 2.44721L23.1426 7.07128C23.6681 7.33403 24 7.87113 24 8.45865C24 9.0885 23.6191 9.65581 23.0362 9.89429L13.9255 13.6214C13.3144 13.8714 12.6603 14 12 14C11.3397 14 10.6856 13.8714 10.0745 13.6214L2.5 10.5227V15.25C2.5 15.9404 1.94036 16.5 1.25 16.5C0.559644 16.5 0 15.9404 0 15.25V8.5H0.000547788C0.000183225 8.48625 0 8.47246 0 8.45865C0 7.87113 0.331945 7.33403 0.857442 7.07128L10.1056 2.44721C10.6938 2.15311 11.3424 2 12 2ZM20 18.5C20 20.2573 16.4183 22 12 22C7.58172 22 4 20.2573 4 18.5V13L9.59509 15.4479C11.1282 16.1186 12.8718 16.1186 14.4049 15.4479L20 13V18.5ZM1.25 17.5C0.559644 17.5 0 18.0596 0 18.75C0 19.4404 0.559644 20 1.25 20C1.94036 20 2.5 19.4404 2.5 18.75C2.5 18.0596 1.94036 17.5 1.25 17.5Z'
              fill='currentColor'
            />
          </svg>
        </div>
      </Tooltip>
    </>
  );
};
