import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import { DEFAULT_THEME } from '../common';
import { TYPOGRAPHY } from '../Typography';

import { getBorderBottom, getTextareaPadding } from './utils-style';
import { BORDER_TYPE } from './constants';
import type { ITextareaComponentProps } from './interfaces';

const getBorder = (theme, focused, status, disabled, readOnly) => {
  if (theme.input.borderWidthActive) {
    return `${getBorderBottom(theme, status, focused, disabled, readOnly)}`;
  } else {
    return `${theme.input.borderWidth}px
    ${BORDER_TYPE} ${disabled ? 'transparent' : theme.color.neutral[20]};`;
  }
};

export const TextareaComponent = styled(TextareaAutosize)<ITextareaComponentProps>`
  ${({ theme, disabled, $focused, $resize, $status = 'default', readOnly }) => css`
    width: 100%;
    margin: 0;
    outline: none;
    padding: ${getTextareaPadding($status, $focused, readOnly, theme)};
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${TYPOGRAPHY.fontSize[14]};
    line-height: ${TYPOGRAPHY.lineHeight[20]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    border: ${getBorder(theme, $focused, $status, disabled, readOnly)};
    border-radius: ${theme.borderRadius};
    background-color: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    border-bottom: ${theme.input.borderWidthActive
      ? ''
      : getBorderBottom(theme, $status, $focused, disabled, readOnly)};
    &:hover {
      background-color: ${$focused || disabled ? 'none' : theme.color.neutral[5]};
    }
    &:focus {
      outline: none;
      background-color: ${theme.color.neutral.white};
    }

    resize: ${$resize};

    ::-ms-clear {
      display: none;
    }
    ::-ms-reveal {
      display: none;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${disabled || $focused ? theme.color.neutral[30] : theme.color.neutral[50]};
    }
  `}
`;

TextareaComponent.defaultProps = {
  theme: DEFAULT_THEME,
};
