const FONT_FAMILY = `'VTB Group UI', sans-serif`;

interface IFontSize {
  11: string;
  14: string;
  16: string;
  18: string;
  20: string;
  24: string;
  28: string;
  34: string;
  40: string;
  48: string;
  56: string;
}

const FONT_SIZE: IFontSize = {
  11: '11px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
  34: '34px',
  40: '40px',
  48: '48px',
  56: '56px',
};

interface IFontWeight {
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

const FONT_WEIGHT: IFontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

interface ILineHeight {
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  44: string;
  52: string;
  60: string;
}

const LINE_HEIGHT: ILineHeight = {
  16: '16px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  36: '36px',
  44: '44px',
  52: '52px',
  60: '60px',
};

export interface ITypography {
  fontFamily: string;
  fontSize: IFontSize;
  fontWeight: IFontWeight;
  lineHeight: ILineHeight;
}

export const TYPOGRAPHY: ITypography = {
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  lineHeight: LINE_HEIGHT,
};
