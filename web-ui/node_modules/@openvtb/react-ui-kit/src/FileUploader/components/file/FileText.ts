import styled, { css } from 'styled-components';

import { Body2Short } from '../../../Typography';
import { DEFAULT_THEME } from '../../../common';

interface IFileTextProps {
  isWaitingLoad: boolean;
}

export const FileText = styled(Body2Short)<IFileTextProps>`
  ${({ theme, isWaitingLoad }) => css`
    color: ${isWaitingLoad ? theme.color.neutral[30] : theme.color.neutral[90]};
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

FileText.defaultProps = {
  theme: DEFAULT_THEME,
};
