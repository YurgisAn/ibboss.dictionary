import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

interface IFileContentProps {
  progress?: number;
}

export const FileContent = styled.div<IFileContentProps>`
  ${({ theme, progress }) => css`
    display: flex;
    flex-wrap: nowrap;
    height: 32px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px;
    margin-top: 12px;
    background: ${theme.color.neutral[10]};
    border-radius: 4px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      left: 0;
      border-radius: 4px;
      bottom: 0;
      transition: 0;
      background: ${theme.color.success[20]};
      opacity: 1;
      width: 0%;
    }

    ${progress &&
    css`
      &::after {
        width: ${progress}%;
        opacity: ${progress === 100 ? 0 : 1};
        transition: all 0.3s;
      }
    `}
  `}
`;

FileContent.defaultProps = {
  theme: DEFAULT_THEME,
};
