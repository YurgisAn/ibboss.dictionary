import React, { FC, useRef, useState, useEffect, RefObject } from 'react';

import { createTooltipHOC } from '../../../TooltipHOC';
import { ReactComponent as ErrorSolid } from '../../../Icons/service/ErrorSolid.svg';
import { ReactComponent as CloseOutline } from '../../../Icons/service/CloseOutline.svg';
import { ReactComponent as CheckSolid } from '../../../Icons/service/CheckSolid.svg';

import { FileText } from './FileText';
import { FileWrapper } from './FileWrapper';
import { FileContent } from './FileContent';
import { FileTextWrapper } from './FileTextWrapper';
import { FileIconsWrapper } from './FileIconsWrapper';
import { FileErrorIcon } from './FileErrorIcon';
import { FileErrorText } from './FileErrorText';
import { FileCloseIcon } from './FileCloseIcon';
import { FileSuccessIcon } from './FileSuccessIcon';
import { WrapperCloseIcon } from './WrapperCloseIcont';

export interface IDropzoneFile {
  /** Название файла */
  name: string;
  /** Файл */
  data?: File;
  /** Файл в состоянии ошибки */
  error?: string;
  /** Файл в состоянии прогресса */
  progress?: number;
  /** Файл в состоянии загрузки */
  loading?: boolean;
}

interface IFileProps {
  onRemoveClick: () => void;
  data: IDropzoneFile;
  waitingLoad: boolean;
  tooltipContainer?: Element | null;
}

export const DropzoneFile: FC<IFileProps> = ({
  data: { name, error, progress },
  onRemoveClick,
  waitingLoad,
  tooltipContainer,
}) => {
  const [overflow, setOverflow] = useState(false);
  const contentRef: RefObject<HTMLDivElement> = useRef(null);

  const detectOverflow = (e: any) => e.offsetWidth < e.scrollWidth;

  useEffect(() => {
    const contentCurrent = contentRef.current;
    if (contentCurrent && detectOverflow(contentCurrent) !== overflow) {
      setOverflow(detectOverflow(contentCurrent));
    }
  }, []);

  const Text = overflow ? createTooltipHOC(FileText) : FileText;

  const shouldRenderSuccessIcon = !waitingLoad && !error;
  const shouldRenderErrorIcon = error;
  const shouldRenderCloseIcon = !waitingLoad || error;
  return (
    <FileWrapper>
      <FileContent progress={progress}>
        <FileTextWrapper>
          <Text
            ref={contentRef}
            tooltip={name}
            isWaitingLoad={waitingLoad}
            container={tooltipContainer}
          >
            {name}
          </Text>
        </FileTextWrapper>
        <FileIconsWrapper>
          {shouldRenderErrorIcon && (
            <FileErrorIcon>
              <ErrorSolid />
            </FileErrorIcon>
          )}
          {shouldRenderSuccessIcon && (
            <FileSuccessIcon>
              <CheckSolid />
            </FileSuccessIcon>
          )}
          {shouldRenderCloseIcon && (
            <WrapperCloseIcon>
              <FileCloseIcon onClick={onRemoveClick}>
                <CloseOutline />
              </FileCloseIcon>
            </WrapperCloseIcon>
          )}
        </FileIconsWrapper>
      </FileContent>
      {error && <FileErrorText>{error}</FileErrorText>}
    </FileWrapper>
  );
};
