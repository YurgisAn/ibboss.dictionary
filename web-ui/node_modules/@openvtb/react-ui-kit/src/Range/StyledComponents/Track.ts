import styled from 'styled-components';

import { DEFAULT_THEME } from '../../common';

export interface ITrackProps {
  disabled?: boolean;
}

export const Track = styled.div<ITrackProps>`
  height: 2px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.color.neutral[20] : theme.color.primary[30]};
  width: 100%;
`;

Track.defaultProps = {
  theme: DEFAULT_THEME,
};
