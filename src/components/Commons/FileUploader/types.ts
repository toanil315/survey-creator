import { ACTION_ENUM } from '@/constants';

export type FileUploaderSize = 'small' | 'medium' | 'large';

export enum UPLOADER_ENUM {
  DRAG_AND_DROP = 'DRAG_AND_DROP',
  BROWSE_INPUT = 'BROWSE_INPUT',
  BROWSE_AREA = 'BROWSE_AREA',
}

export interface UploadConfig {
  accept?: string;
  maxSize?: number;
  name: string;
  size?: FileUploaderSize;
}

export interface FileItem {
  url: string;
  name?: string;
  loading?: boolean;
  needUpload?: boolean;
  file?: File;
}

export interface FileUploaderProps extends UploadConfig {
  size?: FileUploaderSize;
  componentType?: UPLOADER_ENUM;
  label?: string;
  required?: boolean;
  error?: string;
  onChange?: (value: string | string[] | undefined, action?: ACTION_ENUM) => void;
  value?: string | string[];
  multiple?: boolean;
}

export interface FileContainerProps {
  files: FileItem[];
  addFile: (fileLink: string, file: FileItem) => void;
  deleteFile: (fileLink: string) => void;
}

export interface DndFileProps extends UploadConfig {
  addToQueue: (file: FileItem) => void;
  error?: string;
}

export interface UploaderFactoryProps extends UploadConfig {
  type: UPLOADER_ENUM;
  addToQueue: (file: FileItem) => void;
  error?: string;
}
