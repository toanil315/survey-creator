import React from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import { DndFileProps, FileItem } from './types';
import { useBrowserFileInputBaseStyles, useBrowserFileInputStyles } from './style';
import { Field, mergeClasses } from '@fluentui/react-components';

const BrowseFileInput = ({ name, accept, addToQueue, error, size = 'medium' }: DndFileProps) => {
  const browserFileInputBaseClassName = useBrowserFileInputBaseStyles();
  const browserFileInputClassNames = useBrowserFileInputStyles();

  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileItem: FileItem = {
        name: file.name,
        loading: true,
        needUpload: true,
        url: URL.createObjectURL(file),
        file,
      };
      // if (maxSize && file.size > maxSize) {
      //   fileItem.error = t('components.uploader.fileTooLarge', { maxSize });
      // }
      addToQueue(fileItem);
    }
    inputRef.current!.value = '';
  };

  const activateInput = () => {
    inputRef.current!.click();
  };

  return (
    <Field
      size={size}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <div
        className={mergeClasses(
          browserFileInputBaseClassName,
          Boolean(error) && browserFileInputClassNames.error,
        )}
      >
        <input
          ref={inputRef}
          type='file'
          id={name}
          accept={accept}
          multiple
          hidden
          onChange={handleFileChange}
        />
        {t('components.uploader.chooseFile')}
        <Button
          type='button'
          onClick={activateInput}
        >
          {t('components.uploader.browserFile')}
        </Button>
      </div>
    </Field>
  );
};

export default BrowseFileInput;
