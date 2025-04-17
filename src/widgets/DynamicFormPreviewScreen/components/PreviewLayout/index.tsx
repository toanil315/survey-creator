import { mergeClasses } from '@fluentui/react-components';
import {
  useDotBaseClassName,
  useDotClassNames,
  usePreviewHeaderBaseClassName,
  usePreviewLayoutBaseClassName,
  useRestartButtonBaseClassName,
} from './style';
import { RestartIcon } from '@/components';
import { useState } from 'react';

export const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  const previewLayoutBaseClassName = usePreviewLayoutBaseClassName();
  const previewHeaderBaseClassName = usePreviewHeaderBaseClassName();
  const dotBaseClassName = useDotBaseClassName();
  const dotClassNames = useDotClassNames();
  const restartButtonBaseClassName = useRestartButtonBaseClassName();

  const [staticKey, setStaticKey] = useState(Date.now());

  const handleRestart = () => {
    setStaticKey(Date.now());
  };

  return (
    <div
      key={staticKey}
      className={previewLayoutBaseClassName}
    >
      <head className={previewHeaderBaseClassName}>
        <div className='container'>
          <div className={mergeClasses(dotBaseClassName, dotClassNames.red)} />
          <div className={mergeClasses(dotBaseClassName, dotClassNames.yellow)} />
          <div className={mergeClasses(dotBaseClassName, dotClassNames.green)} />
          Preview
        </div>
        <div
          className={restartButtonBaseClassName}
          onClick={handleRestart}
        >
          Restart{' '}
          <RestartIcon
            width={18}
            height={18}
          />
        </div>
      </head>
      <div className='container'>{children}</div>
    </div>
  );
};
