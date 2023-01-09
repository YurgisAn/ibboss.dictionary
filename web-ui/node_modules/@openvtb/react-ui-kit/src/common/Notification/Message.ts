import styled from 'styled-components';

import { Body2Long } from '../../Typography';

export const Message = styled(Body2Long)<{ paddingBottom?: number }>`
  white-space: pre-wrap;
  ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}px;`}
`;
