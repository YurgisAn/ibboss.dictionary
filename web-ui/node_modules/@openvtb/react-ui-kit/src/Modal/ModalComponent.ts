import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { MEDIA_MOBILE } from '../common/media';

import { Content } from './Content';
import {
  MOBILE_PADDING_LEFT,
  MOBILE_PADDING_TOP,
  PADDING_LEFT,
  PADDING_TOP,
  SCROLL_PADDING_RIGHT,
} from './constants';
import { calcContentHeight } from './utils';

interface IModalComponentProps {
  width: number;
  height: number;
  buttonCount: number;
}

export const ModalComponent = styled.div<IModalComponentProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: 0;
  padding: ${PADDING_TOP} ${SCROLL_PADDING_RIGHT} 0px ${PADDING_LEFT};

  @media ${MEDIA_MOBILE} {
    padding: ${MOBILE_PADDING_TOP} ${SCROLL_PADDING_RIGHT} 0px ${MOBILE_PADDING_LEFT};
  }

  ${({ theme, width, height, buttonCount }) => `
    width: ${width}px;
    max-height: ${height}vh;
    background-color: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[16]};
    border-radius: 8px;

    @media ${MEDIA_MOBILE} {
      width: 288px;
      max-height: 84vh;
    }

    ${Content} {
      max-height: ${calcContentHeight(height, buttonCount)};

      @media ${MEDIA_MOBILE} {
        max-height: ${calcContentHeight(height, buttonCount, true)};
      }
    }
  `}
`;

ModalComponent.defaultProps = {
  theme: DEFAULT_THEME,
};
