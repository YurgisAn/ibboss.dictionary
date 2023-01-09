import styled from 'styled-components';

import { ICheckboxProps } from '../Checkbox';

import { ITEM_MARGIN_BOTTOM_BIG, ITEM_MARGIN_BOTTOM_SMALL } from './constants';

export interface ICheckboxGroupItemProps {
  size?: ICheckboxProps['size'];
}

export const CheckboxGroupItem = styled.div<ICheckboxGroupItemProps>`
  margin-bottom: ${({ size }: ICheckboxGroupItemProps) =>
    size === 'small' ? ITEM_MARGIN_BOTTOM_SMALL : ITEM_MARGIN_BOTTOM_BIG};
`;
