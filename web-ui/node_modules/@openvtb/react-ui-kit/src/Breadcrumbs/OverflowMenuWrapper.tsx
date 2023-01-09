import styled, { css } from 'styled-components';

import { HEIGHT as SIZE, HEIGHT_SMALL as SIZE_SMALL } from './BreadcrumbsComponent';

export const OverflowMenuWrapper = styled.div<{ small?: boolean }>`
  ${({ small }) => css`
    align-items: center;
    display: flex;
    height: ${small ? SIZE_SMALL : SIZE}px;
    justify-content: center;
    width: ${small ? SIZE_SMALL : SIZE}px;
  `};
`;
