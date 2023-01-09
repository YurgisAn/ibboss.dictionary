import styled, { css } from 'styled-components';
import { DropzoneRootProps } from 'react-dropzone';

import { DEFAULT_THEME } from '../../../common';

import { DropzoneText } from './DropzoneText';
import { DropzoneIcon } from './DropzoneIcon';
import { getDashboardStyles } from './DropzoneBorder';

interface IDropzoneWrapperProps extends DropzoneRootProps {
  isDragActive: boolean;
  disabled?: boolean;
  mobile?: boolean;
}

export const DropzoneWrapper = styled.div<IDropzoneWrapperProps>`
  display: flex;
  outline: none !important;
  width: 100%;
  ${({ theme, isDragActive, disabled, mobile }) => {
    if (mobile) {
      return css`
        cursor: ${disabled ? 'default' : 'pointer'};
        border-radius: 4px;
        height: 40px;
        justify-content: center;
        align-items: center;
        background: ${disabled ? theme.color.neutral[10] : theme.color.primary[60]};
      `;
    } else {
      return css`
        position: relative;
        flex-wrap: nowrap;
        padding: 12px 22px 12px 16px;
        min-height: 98px;
        cursor: pointer;
        transition: all 0.2s;
        ${isDragActive &&
        css`
          background-color: ${theme.color.primary[10]};

          ${DropzoneText} {
            text-decoration: underline;
          }
        `}
        ${DropzoneIcon} {
          margin-right: 8px;
        }

        &:hover {
          ${DropzoneText} {
            text-decoration: underline;
          }
        }
        ${disabled &&
        css`
          cursor: initial;

          ${DropzoneText} {
            color: ${theme.color.neutral[30]};
            text-decoration: none !important;
          }
        `}
        ${getDashboardStyles(theme, isDragActive, disabled)}
      `;
    }
  }}
`;

DropzoneWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
