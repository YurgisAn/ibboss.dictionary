import React, { FC, useState } from 'react';

import {
  UPLOAD_TEXT,
  GET_FILE_COUNT_EXCEED_ERROR,
  GET_FILE_TOTAL_SIZE_ERROR,
  DEFAULT_MAX_TOTAL_SIZE,
  UPLOAD_TEXT_MOBILE,
} from './constants';
import {
  Dropzone,
  DropzoneFile,
  Container,
  HeaderTitle,
  HeaderSubtitle,
  ErrorText,
  IDropzoneFile,
} from './components';
export { formatBytesToMegabytes } from './utils';
export { DEFAULT_MAX_TOTAL_SIZE } from './constants';

export type { IDropzoneFile } from './components';

export interface IFileUploaderProps {
  /** Список загруженных файлов */
  files?: IDropzoneFile[];
  /** Коллбек при попытке загрузки файла */
  onChange?: (files: IDropzoneFile[]) => void;
  /** Коллбек при удалении файла */
  onRemoveClick?: (file: IDropzoneFile, index: number) => void;
  /** Текст, который отображается в области загрузки */
  uploadText?: string;
  /** Максимальный размер файла (в байтах) */
  maxSize?: number;
  /** Максимальный суммарный размер файлов (в байтах) */
  maxTotalSize?: number;
  /** Минимальный размер файла (в байтах) */
  minSize?: number;
  /** Максимальное количество файлов */
  maxFiles?: number;
  /** Разрешенные типы файлов, подробнее: https://github.com/react-dropzone/attr-accept */
  accept?: string | string[];
  /** Находится ли в выключенном состоянии */
  disabled?: boolean;
  /** Коллбек для формирования ошибки при загрузке кол-ва файлов больше разрешенного */
  getFileCountLimitExceedError?: (exceededCount: number) => string;
  /** Коллбек для формирования ошибки при загрузке файлов суммарно по размеру превышающие допустимое значение */
  getFileTotalSizeLimitExceedError?: (exceededCount: number) => string;
  /** Текст ошибки */
  error?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Заголовок дропзоны */
  title?: string;
  /** Подзаголовок дропзоны */
  subtitle?: string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
  /** Мобильная версия */
  mobile?: boolean;
}

export const FileUploader: FC<IFileUploaderProps> = ({
  className,
  dataTestId,
  accept,
  maxSize,
  maxTotalSize = DEFAULT_MAX_TOTAL_SIZE,
  minSize,
  getFileCountLimitExceedError = () => GET_FILE_COUNT_EXCEED_ERROR,
  getFileTotalSizeLimitExceedError = GET_FILE_TOTAL_SIZE_ERROR,
  files = [],
  maxFiles,
  disabled,
  onChange,
  error,
  onRemoveClick,
  title,
  subtitle,
  tooltipContainer,
  mobile,
  uploadText = mobile ? UPLOAD_TEXT_MOBILE : UPLOAD_TEXT,
}) => {
  const [errorText, setErrorText] = useState('');
  const handleRemoveClick = (file: IDropzoneFile, index: number) => () => {
    if (onRemoveClick) {
      onRemoveClick(file, index);
    }
    setErrorText('');
  };
  const handleFileCountLimitExceed = (count: number) => {
    setErrorText(getFileCountLimitExceedError(count));
  };
  const handleFileTotalSizeLimitExceed = (maxTotalSize: number) => {
    setErrorText(getFileTotalSizeLimitExceedError(maxTotalSize));
  };
  const handleChange = (files: IDropzoneFile[]) => {
    if (onChange) {
      onChange(files);
    }
    setErrorText('');
  };

  const properMaxSize = maxSize ? Math.min(maxSize, maxTotalSize) : maxTotalSize;

  const loadingFileIndex = files.findIndex((f: IDropzoneFile) => f.loading);
  return (
    <Container className={className} data-test-id={dataTestId} mobile={mobile}>
      {title && <HeaderTitle disabled={disabled}> {title} </HeaderTitle>}
      {title && subtitle && <HeaderSubtitle disabled={disabled}> {subtitle} </HeaderSubtitle>}
      <Dropzone
        onChange={handleChange}
        maxFiles={maxFiles}
        disabled={disabled}
        accept={accept}
        maxSize={properMaxSize}
        maxTotalSize={maxTotalSize}
        onFileCountLimitExceed={handleFileCountLimitExceed}
        onFileTotalSizeLimitExceed={handleFileTotalSizeLimitExceed}
        minSize={minSize}
        files={files}
        uploadText={uploadText}
        mobile={mobile}
      />
      {files.map((file, index) => (
        <DropzoneFile
          key={`${file.name}${file.data?.size || ''}`}
          onRemoveClick={handleRemoveClick(file, index)}
          data={file}
          waitingLoad={loadingFileIndex > -1 && loadingFileIndex < index}
          tooltipContainer={tooltipContainer}
        />
      ))}
      {(errorText || error) && <ErrorText>{errorText || error}</ErrorText>}
    </Container>
  );
};
