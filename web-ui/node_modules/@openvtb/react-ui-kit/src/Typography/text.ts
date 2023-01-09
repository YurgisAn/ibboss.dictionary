import styled, { css } from 'styled-components';

import { TYPOGRAPHY } from './typography';
import type { ITypography } from './typography';

export interface ITextProps {
  color?: string;
}

export const getTextStyle = ({
  color,
  fontSize,
  fontWeight,
  lineHeight,
}: {
  color?: string;
  fontSize: keyof ITypography['fontSize'];
  fontWeight: keyof ITypography['fontWeight'];
  lineHeight: keyof ITypography['lineHeight'];
}) => css`
  color: ${color || 'inherit'};
  font-family: ${TYPOGRAPHY.fontFamily};
  font-size: ${TYPOGRAPHY.fontSize[fontSize]};
  font-weight: ${TYPOGRAPHY.fontWeight[fontWeight]};
  line-height: ${TYPOGRAPHY.lineHeight[lineHeight]};
`;

export const HL1 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 56, fontWeight: 'bold', lineHeight: 60 })};
`;

export const HL2 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 48, fontWeight: 'bold', lineHeight: 52 })};
`;

export const H1 = styled.h1<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 40, fontWeight: 'bold', lineHeight: 44 })};
`;

export const H2 = styled.h2<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 34, fontWeight: 'bold', lineHeight: 36 })};
`;

export const H3 = styled.h3<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 28, fontWeight: 'semibold', lineHeight: 32 })};
`;

export const H4 = styled.h4<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 24, fontWeight: 'semibold', lineHeight: 28 })};
`;

export const H5 = styled.h5<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 20, fontWeight: 'semibold', lineHeight: 24 })};
`;

export const H6 = styled.h6<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 18, fontWeight: 'semibold', lineHeight: 24 })};
`;

export const Subtitle1 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 18, fontWeight: 'regular', lineHeight: 28 })};
`;

export const Subtitle2 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 16, fontWeight: 'semibold', lineHeight: 20 })};
`;

export const Subtitle3 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 14, fontWeight: 'semibold', lineHeight: 20 })};
`;

export const Body1Long = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 16, fontWeight: 'regular', lineHeight: 24 })};
`;

export const Body1Short = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 16, fontWeight: 'regular', lineHeight: 20 })};
`;

export const Body2Long = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 14, fontWeight: 'regular', lineHeight: 20 })};
`;

export const Body2Short = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 14, fontWeight: 'regular', lineHeight: 16 })};
`;

export const Caption1 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 11, fontWeight: 'regular', lineHeight: 16 })};
`;

export const Button1 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 16, fontWeight: 'medium', lineHeight: 24 })};
`;

export const Button2 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 14, fontWeight: 'medium', lineHeight: 20 })};
`;

export const Button3 = styled.div<ITextProps>`
  ${({ color }) => getTextStyle({ color, fontSize: 11, fontWeight: 'medium', lineHeight: 16 })};
`;
