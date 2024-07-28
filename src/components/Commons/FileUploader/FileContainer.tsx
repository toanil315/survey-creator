import { useEffect } from 'react';
import { CloseIcon } from '@/components/Icons';
import axios from 'axios';
import { Spinner, mergeClasses } from '@fluentui/react-components';
import { FileContainerProps, FileItem } from './types';
import { useFileContainerBaseStyles, useFileItemBaseStyles } from './style';

const FileContainer = ({ files, ...restProps }: FileContainerProps) => {
  const fileContainerBaseClassName = useFileContainerBaseStyles();

  const renderFileItem = () => {
    return files.map((file) => (
      <FileItemEl
        key={file.name || file.url}
        file={file}
        {...restProps}
      />
    ));
  };

  return (
    <div className={mergeClasses('files-container', fileContainerBaseClassName)}>
      {renderFileItem()}
    </div>
  );
};

const FileItemEl = ({
  file,
  addFile,
  deleteFile,
  renderItems,
}: { file: FileItem } & Omit<FileContainerProps, 'files'>) => {
  const fileItemBaseClassName = useFileItemBaseStyles();

  useEffect(() => {
    if (file.needUpload) {
      axios
        .post(
          'https://api.escuelajs.co/api/v1/files/upload',
          {
            file: file.file,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => addFile(res.data.location, file));
    }
  }, [file]);

  return renderItems ? (
    renderItems(file, deleteFile)
  ) : (
    <div className={fileItemBaseClassName}>
      <div className='file-preview'>
        <a
          href={file.url}
          className='name'
        >
          {file.name || file.url}
        </a>
      </div>
      <div>
        {file.loading ? (
          <Spinner size='extra-tiny' />
        ) : (
          <div
            className='close-action'
            onClick={() => deleteFile(file.url)}
          >
            <CloseIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileContainer;
