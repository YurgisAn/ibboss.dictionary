import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { VALUE_CONTAINER_MARGIN_RIGHT } from '../constants';

interface IPlaceholderProps {
  disabled?: boolean;
  menuIsOpen?: boolean;
}

export const CurrentValue = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const ValueContainerWrapper = styled(
  // eslint-disable-next-line react/display-name
  forwardRef((props: any, ref: any) => {
    return (
      <div ref={ref} {...props}>
        {props.children}
      </div>
    );
  })
)`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  height: 32px;
  padding-left: 2px;
  padding-right: 35px;
  margin-right: ${VALUE_CONTAINER_MARGIN_RIGHT} !important;
`;

export const ChipItemChecbox = styled.div`
  ${({ theme: { color } }) => css`
    box-sizing: border-box;
    color: ${color.neutral[90]};
    background-color: ${color.neutral[10]};
    border-radius: 14px;
    height: 24px;
    font-size: 13px;
    padding: 4px 9px 4px 9px;
    margin-right: 8px;
    & svg {
      cursor: 'pointer';
      fill: ${color.neutral[50]};
    }
  `};
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: -38px;
`;

ChipItemChecbox.defaultProps = {
  theme: DEFAULT_THEME,
};

export const PlaceholderWrapper = styled.div<IPlaceholderProps>`
  display: inline-flex;
  pointer-events: none;
  align-items: center;
  position: absolute;
  max-width: 100%;
  transform: translateY(-50%);
  overflow: hidden;
  white-space: nowrap;
  top: 50%;
  color: ${({ theme, menuIsOpen, disabled }) =>
    menuIsOpen || disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  transition: all 0.2s;
  z-index: 4;
`;

PlaceholderWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};
