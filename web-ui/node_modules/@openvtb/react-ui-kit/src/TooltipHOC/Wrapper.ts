import styled from 'styled-components';

import type { ITooltipHOCProps } from './index';

interface IWrapperProps {
  display?: ITooltipHOCProps['display'];
}

export const Wrapper = styled.div<IWrapperProps>`
  display: ${({ display = 'inline-block' }) => display};
  position: relative;
`;
