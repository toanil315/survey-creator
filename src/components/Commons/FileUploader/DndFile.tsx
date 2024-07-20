import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadIcon } from '@/components/Icons';
import { DndFileProps, FileItem } from './types';
import { Field, mergeClasses } from '@fluentui/react-components';
import { useBrowserFileAreaBaseStyles, useDndFileBaseStyles, useDndFileStyles } from './style';

const BrowseFileArea = ({ name, accept, addToQueue, error, size = 'medium' }: DndFileProps) => {
  const browserFileAreaBaseClassName = useBrowserFileAreaBaseStyles();
  const dndFileBaseClassName = useDndFileBaseStyles();
  const dndFileClassNames = useDndFileStyles();

  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragEnter, setIsDragEnter] = React.useState(false);

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
          dndFileBaseClassName,
          Boolean(error) && dndFileClassNames.error,
          isDragEnter && dndFileClassNames.dragEnter,
        )}
      >
        <input
          ref={inputRef}
          type='file'
          id={name}
          accept={accept}
          multiple
          onChange={handleFileChange}
          onDragOver={() => setIsDragEnter(true)}
          onDragLeave={() => setIsDragEnter(false)}
          onDrop={() => setIsDragEnter(false)}
        />
        <div className='area'>
          <UploadIcon />
          <p className='instruction'>
            {t('components.uploader.dropFile')} <label className='link'>Browser</label>
          </p>
        </div>
      </div>
    </Field>
  );
};

export default BrowseFileArea;
