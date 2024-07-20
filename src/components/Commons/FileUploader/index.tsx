import React, { useEffect } from 'react';
import DndFile from './DndFile';
import BrowseFileInput from './BrowseFileInput';
import BrowseFileArea from './BrowseFileArea';
import FileContainer from './FileContainer';
import { ACTION_ENUM } from '@/constants';
import { FileItem, FileUploaderProps, UPLOADER_ENUM, UploaderFactoryProps } from './types';
import { Field } from '@fluentui/react-components';
import { useContainerBaseStyles, useWrapperBaseStyles } from './style';

export const FileUploader = ({
  error,
  size = 'medium',
  multiple = false,
  label,
  required = false,
  onChange,
  componentType = UPLOADER_ENUM.BROWSE_AREA,
  value,
  ...restProps
}: FileUploaderProps) => {
  const wrapperBaseClassName = useWrapperBaseStyles();
  const containerBaseClassName = useContainerBaseStyles();

  const [files, setFiles] = React.useState<FileItem[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      let uploadedLinks: FileItem[] = [];
      uploadedLinks = value.map((url) => ({ url, loading: false }));
      setFiles((prev) => [...uploadedLinks, ...prev.filter((file) => !value.includes(file.url))]);
    }

    if (typeof value === 'string') {
      const uploadedLink = { url: value, loading: false };
      setFiles([uploadedLink]);
    }
  }, [value, multiple]);

  const addToQueue = (file: FileItem) => {
    if (multiple) {
      return setFiles((prev) => [...prev, file]);
    }
    setFiles([file]);
  };

  const addFile = (fileLink: string, tempFile: FileItem) => {
    if (multiple) {
      const newValues = value ? [...value, fileLink] : [fileLink];
      onChange && onChange(newValues, ACTION_ENUM.CREATE);
    } else {
      onChange && onChange(fileLink);
    }
    setFiles((prev) => prev.filter((file) => file.name !== tempFile.name));
    URL.revokeObjectURL(tempFile.url);
  };

  const deleteFile = (fileLink: string) => {
    if (multiple) {
      const newValues = (value as string[]).filter((file) => file !== fileLink);
      onChange && onChange(newValues, ACTION_ENUM.DELETE);
    } else {
      onChange && onChange(undefined);
    }
    setFiles((prev) => prev.filter((file) => file.url !== fileLink));
  };

  return (
    <Field
      label={label}
      required={required}
      size={size}
    >
      <div className={wrapperBaseClassName}>
        <div className={containerBaseClassName}>
          <UploaderFactory
            type={componentType}
            addToQueue={addToQueue}
            error={error}
            size={size}
            {...restProps}
          />
          <FileContainer
            files={files}
            addFile={addFile}
            deleteFile={deleteFile}
          />
        </div>
      </div>
    </Field>
  );
};

const UploaderFactory = ({ type, ...restProps }: UploaderFactoryProps) => {
  switch (type) {
    case UPLOADER_ENUM.DRAG_AND_DROP:
      return <DndFile {...restProps} />;
    case UPLOADER_ENUM.BROWSE_INPUT:
      return <BrowseFileInput {...restProps} />;
    case UPLOADER_ENUM.BROWSE_AREA:
      return <BrowseFileArea {...restProps} />;
    default:
      return <BrowseFileInput {...restProps} />;
  }
};
