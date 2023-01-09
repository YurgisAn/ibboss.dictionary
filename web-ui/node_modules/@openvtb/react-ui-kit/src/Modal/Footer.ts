import styled from 'styled-components';

import { MEDIA_MOBILE } from '../common/media';

import {
  BUTTONS_MARGIN_BETWEEN,
  BUTTONS_PADDING_BOTTOM,
  MOBILE_PADDING_RIGHT,
  PADDING_RIGHT,
} from './constants';

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding-bottom: ${BUTTONS_PADDING_BOTTOM};
  padding-right: ${PADDING_RIGHT};

  button:not(:first-child) {
    margin-left: ${BUTTONS_MARGIN_BETWEEN};
  }

  @media ${MEDIA_MOBILE} {
    flex-direction: column;
    padding-right: ${MOBILE_PADDING_RIGHT};

    button {
      width: 100%;

      &:first-child {
        order: 1;
      }
      &:not(:first-child) {
        margin-left: 0;
        margin-bottom: ${BUTTONS_MARGIN_BETWEEN};
        order: 0;
      }
    }
  }
`;
