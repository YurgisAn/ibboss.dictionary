import React, { FC, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import { Button2, Body2Long } from '../../../Typography';
import { customFileGetter, formatBytesToMegabytes, getFileErrorReason } from '../../utils';
import { ReactComponent as AttachFileOutline } from '../../../Icons/system/AttachFileOutline.svg';
import { IDropzoneFile } from '../file/DropzoneFile';

import { DropzoneIcon } from './DropzoneIcon';
import { DropzoneText } from './DropzoneText';
import { DropzoneWrapper } from './DropzoneWrapper';

interface IDropzoneProps {
  /** Текст, который отображается в области загрузки */
  uploadText: string;
  /** Максимальный размер файла (в байтах) */
  maxSize?: number;
  /** Минимальный размер файла (в байтах) */
  minSize?: number;
  /** Максимальный суммарный размер файлов (в байтах) */
  maxTotalSize: number;
  /** Список загруженных файлов */
  files: IDropzoneFile[];
  /** Максимальное количество файлов */
  maxFiles?: number;
  /** Разрешенные типы файлов, подробнее: https://github.com/react-dropzone/attr-accept */
  accept?: string | string[];
  /** Коллбек при попытке загрузки файла */
  onChange?: (files: IDropzoneFile[]) => void;
  /** Коллбек при попытке загрузить больше файлов, чем разрешено */
  onFileCountLimitExceed: (exceededCount: number) => void;
  /** Коллбек при попытке загрузить файлы, суммарно по размеру превышающие допустимое значение */
  onFileTotalSizeLimitExceed: (maxTotalSize: number) => void;
  /** Находится ли в выключенном состоянии */
  disabled?: boolean;
  /** Мобильная версия */
  mobile?: boolean;
}

export const Dropzone: FC<IDropzoneProps> = ({
  uploadText,
  accept,
  maxSize,
  maxTotalSize,
  minSize,
  onChange,
  disabled,
  maxFiles,
  files,
  onFileCountLimitExceed,
  onFileTotalSizeLimitExceed,
  mobile,
}) => {
  const Label = mobile ? Button2 : Body2Long;
  const iconSize = mobile ? 18 : 24;

  const handleDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const formattedAcceptedFiles = acceptedFiles.map((file: File) => ({
        name: file.name,
        data: file,
      }));
      const formattedRejectedFiles = rejectedFiles.map(({ file }: FileRejection) => ({
        name: file.name,
        data: file,
        error: getFileErrorReason(file, maxSize, minSize),
      }));

      if (onChange) {
        const totalSize = acceptedFiles.reduce((total, file) => total + file.size || 0, 0);
        if (totalSize > maxTotalSize) {
          onFileTotalSizeLimitExceed(formatBytesToMegabytes(maxTotalSize));
          return;
        }

        if (maxFiles) {
          const prevFiles = maxFiles === 1 ? [] : files.filter((f: IDropzoneFile) => !f.error);
          const newFiles = [...prevFiles, ...formattedAcceptedFiles, ...formattedRejectedFiles];
          const filesCount = newFiles.length;
          onChange(newFiles.splice(0, maxFiles));
          if (maxFiles >= 1 && filesCount > maxFiles) {
            onFileCountLimitExceed(newFiles.length - maxFiles);
          }
        } else {
          onChange([...formattedAcceptedFiles, ...formattedRejectedFiles]);
        }
      }
    },
    [onChange, maxFiles, files, maxSize, minSize, onFileCountLimitExceed, maxTotalSize]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    getFilesFromEvent: customFileGetter,
    maxSize,
    minSize,
    disabled,
    accept,
    noDrag: mobile,
  });
  return (
    <DropzoneWrapper
      disabled={disabled}
      isDragActive={isDragActive}
      {...getRootProps()}
      mobile={mobile}
    >
      <input {...getInputProps()} />
      <DropzoneIcon mobile={mobile} disabled={disabled}>
        <AttachFileOutline width={iconSize} height={iconSize} />
      </DropzoneIcon>
      <DropzoneText mobile={mobile} disabled={disabled}>
        <Label>{uploadText}</Label>
      </DropzoneText>
    </DropzoneWrapper>
  );
};
