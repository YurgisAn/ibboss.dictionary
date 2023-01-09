import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { EContours } from '~/types';

import * as S from './styled';

// @ts-ignore
const contour: EContours = CICD_CONTOUR;

export const Logo: FC = () => {
    const theme = useContext(ThemeContext);

    const color = (() => {
        switch (contour) {
            case EContours.DEVELOP:
                return theme.color.status.success;
            case EContours['S1-TEST']:
            case EContours['S2-TEST']:
            case EContours['S3-TEST']:
            case EContours.IFT:
                return theme.color.status.warn;
            case EContours.HOTFIX:
                return theme.color.status.danger;
            case EContours.PREPROD:
            case EContours.PROD:
                return undefined;
            default:
                return theme.color.basic.tertiary;
        }
    })();

    let prefix: string = EContours.LOCAL;

    if (contour) {
        if (contour !== EContours.PROD) {
            prefix = contour;
        } else {
            prefix = '';
        }
    }

    prefix = prefix.toUpperCase();

    return (
        <S.LogoContainer data-at='logo'>
            <S.LogoImgStyled color={color} />
            {prefix && <S.PrefixWrapper>{prefix}</S.PrefixWrapper>}
        </S.LogoContainer>
    );
};
