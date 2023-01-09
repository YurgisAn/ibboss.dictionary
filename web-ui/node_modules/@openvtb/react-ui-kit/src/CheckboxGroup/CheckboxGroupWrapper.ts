import styled from 'styled-components';

import { CheckboxGroupItem } from './CheckboxGroupItem';

export interface ICheckboxGroupWrapperProps {
  disabled?: boolean;
}

export const CheckboxGroupWrapper = styled.div<ICheckboxGroupWrapperProps>`
  & ${CheckboxGroupItem}:last-child {
    margin-bottom: 0px;
  }
  cursor: ${({ disabled }) => (disabled ? `default` : 'pointer')};
`;
