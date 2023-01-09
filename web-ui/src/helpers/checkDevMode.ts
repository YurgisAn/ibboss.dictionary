import { EContours } from '~/types';

// @ts-ignore
const contour: EContours = CICD_CONTOUR;

export const checkDevMode = () =>
    [EContours.LOCAL, EContours.DEVELOP, EContours['S1-TEST'], EContours['S2-TEST'], EContours['S3-TEST']].includes(
        contour
    );

export const isLocal = contour === EContours.LOCAL;
