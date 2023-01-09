import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { Subtitle3, Body2Short } from '../../../Typography';

export interface IHeaderTitleProps {
  disabled?: boolean;
}

export const HeaderTitle = styled(Subtitle3)<IHeaderTitleProps>`
  ${({ theme, disabled }) => css`
    ${disabled ? `color: ${theme.color.neutral[30]};` : ''}
    margin-bottom: 2px;
  `}
`;

HeaderTitle.defaultProps = {
  theme: DEFAULT_THEME,
};

export interface IHeaderSubtitleProps {
  disabled?: boolean;
}

export const HeaderSubtitle = styled(Body2Short)<IHeaderSubtitleProps>`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    margin-bottom: 16px;
  `}
`;

HeaderSubtitle.defaultProps = {
  theme: DEFAULT_THEME,
};
