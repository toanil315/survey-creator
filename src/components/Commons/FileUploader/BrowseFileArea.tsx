import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadIcon } from '@/components/Icons';
import { DndFileProps, FileItem } from './types';
import { Field, mergeClasses } from '@fluentui/react-components';
import { useBrowserFileAreaBaseStyles, useBrowserFileAreaStyles } from './style';

const BrowseFileArea = ({ name, accept, addToQueue, error, size = 'medium' }: DndFileProps) => {
  const browserFileAreaBaseClassName = useBrowserFileAreaBaseStyles();
  const browserFileAreaClassNames = useBrowserFileAreaStyles();

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
          browserFileAreaBaseClassName,
          Boolean(error) && browserFileAreaClassNames.error,
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
        <label
          htmlFor={name}
          className='area'
        >
          <UploadIcon />
          <p className='instruction'>{t('components.uploader.browserFile')}</p>
        </label>
      </div>
    </Field>
  );
};

export default BrowseFileArea;
