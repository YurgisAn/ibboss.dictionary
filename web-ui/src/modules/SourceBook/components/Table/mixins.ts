import { css } from 'styled-components';
import { typography } from '@vtb/ui-kit3'; 

// padding-bottom меньше padding-top на 1px, т.к. 1px остается для border-bottom ячейки
// padding-right больше padding-left на 1px, т.к. 1px остается для линии resizerа
export const cellStyle = css`
  [data-dimension='s'] & {
    padding: 6px 13px 5px 12px;
  }

  [data-dimension='m'] & {
    padding: 10px 13px 9px 12px;
  }

  [data-dimension='l'] & {
    padding: 12px 17px 11px 16px;
  }

  [data-dimension='xl'] & {
    padding: 16px 17px 15px 16px;
  }
`;

export const rowStyle = css`
  ${typography['Body/Body 2 Short']}

  [data-dimension='l'] & {
    ${typography['Body/Body 1 Short']}
  }
  [data-dimension='xl'] & {
    ${typography['Body/Body 1 Short']}
  }
`;

export const headerStyle = css`
  ${typography['Subtitle/Subtitle 3']}

  [data-dimension='l'] & {
    ${typography['Subtitle/Subtitle 2']}
  }
  [data-dimension='xl'] & {
    ${typography['Subtitle/Subtitle 2']}
  }
`;

export const extraTextStyle = css`
  ${typography['Caption/Caption 1']}
  [data-dimension='l'] & {
    ${typography['Body/Body 2 Long']}
  }
  [data-dimension='xl'] & {
    ${typography['Body/Body 2 Long']}
  }
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const singleLineTitle = css`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const multiLineTitle = css<{ lineClamp: number }>`
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
  overflow: hidden;
`;

export const disabledRow = css`
  color: ${({ theme }) => theme.color.text.tertiary};
  pointer-events: none;
`;

export const underlineRow = css`
  border-bottom: 1px solid ${({ theme }) => theme.color.basic.disable};
`;

export const rowBackground = css`
  [data-greyheader='true'] & {
    background: ${({ theme }) => theme.color.background.tertiary};
  }
  [data-selected='true'] & {
    background: ${({ theme }) => theme.color.special.softBlue};
  }
  [data-error='true'] & {
    background: ${({ theme }) => theme.color.background.surfaceDanger};
  }
  [data-success='true'] & {
    background: ${({ theme }) => theme.color.background.surfaceSuccess};
  }
  [data-disabled='true'] & {
    background: ${({ theme }) => theme.color.background.primary};
  }
`;

export const overflowMenuStyle = css<{ $offset: number }>`
  [data-dimension='s'] && {
    width: 31px;
    height: 31px;
    padding: 0;
    left: ${({ $offset }) => `${$offset - 32}px`};
  }
  [data-dimension='m'] && {
    width: 39px;
    height: 39px;
    padding: 4px 4px 3px 3px;
    left: ${({ $offset }) => `${$offset - 39}px`};
  }
  [data-dimension='l'] && {
    width: 47px;
    height: 47px;
    padding: 6px 6px 5px 5px;
    left: ${({ $offset }) => `${$offset - 47}px`};
  }
  [data-dimension='xl'] && {
    width: 55px;
    height: 55px;
    padding: 10px 10px 9px 9px;
    left: ${({ $offset }) => `${$offset - 55}px`};
  }
`;
