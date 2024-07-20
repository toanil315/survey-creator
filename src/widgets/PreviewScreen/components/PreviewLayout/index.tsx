import { mergeClasses } from '@fluentui/react-components';
import {
  useDotBaseClassName,
  useDotClassNames,
  usePreviewHeaderBaseClassName,
  usePreviewLayoutBaseClassName,
} from './style';

export const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  const previewLayoutBaseClassName = usePreviewLayoutBaseClassName();
  const previewHeaderBaseClassName = usePreviewHeaderBaseClassName();
  const dotBaseClassName = useDotBaseClassName();
  const dotClassNames = useDotClassNames();

  return (
    <div className={previewLayoutBaseClassName}>
      <head className={previewHeaderBaseClassName}>
        <div className='container'>
          <div className={mergeClasses(dotBaseClassName, dotClassNames.red)} />
          <div className={mergeClasses(dotBaseClassName, dotClassNames.yellow)} />
          <div className={mergeClasses(dotBaseClassName, dotClassNames.green)} />
          Preview
        </div>
      </head>
      <div className='container'>{children}</div>
    </div>
  );
};
