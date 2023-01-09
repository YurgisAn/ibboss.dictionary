import styled, { css } from 'styled-components';

import { ReactComponent as CloseCircleSolid } from '../../Icons/service/CloseCircleSolid.svg';
import { DEFAULT_THEME } from '../../common';

interface IChipItemWrapperProps {
  disabled?: boolean;
}

interface IChipItemLabelProps {
  maxWidthChip?: string;
}

export const ChipItemWrapper = styled.div<IChipItemWrapperProps>`
  ${({ theme: { color }, disabled }) => css`
    position: relative;
    box-sizing: border-box;
    max-width: 400px;
    color: ${color.neutral[90]};
    background-color: ${color.neutral[10]};
    border-radius: 14px;
    height: 24px;
    font-size: 13px;
    padding: 4px 0 4px 9px;
    margin-right: 8px;
    pointer-events: ${disabled ? 'none' : 'auto'};
    & svg {
      cursor: 'pointer';
      fill: ${color.neutral[50]};
    }
  `};
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin: 4px 8px 4px 0;
`;

ChipItemWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const ChipItemLabel = styled.div<IChipItemLabelProps>`
  overflow: hidden;
  align-items: center;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${({ maxWidthChip }) => maxWidthChip};
`;

export const CloseIconContainer = styled.div`
  ${({ theme: { color } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    margin-left: 2px;
    &:hover {
      background-color: ${color.opacity.blackHover};
      outline: none;
      cursor: 'default';
    }
    &:focus {
      outline: none;
      border: none;
      background-color: ${color.opacity.blackFocus};
    }
    &:active {
      outline: none;
      border: none;
      background-color: ${color.opacity.blackPressed};
    }
  `};
`;

CloseIconContainer.defaultProps = {
  theme: DEFAULT_THEME,
};

export const CloseSolidIconChip = styled(CloseCircleSolid)`
  width: 16px;
  height: 16px;
  &:active {
    outline: none;
    border: none;
  }
`;
