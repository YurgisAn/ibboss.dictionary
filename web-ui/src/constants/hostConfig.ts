import { assertDefined } from '~/helpers/guards';
import { EContours } from '~/types';

export const hostConfig =
    process.env.CICD_CONTOUR === EContours.LOCAL
        ? require('../../host.local.config.json')
        : require('../../host.config.json');

const getStrictCompareFunc = (firstValue: any) => (secondValue: any) => firstValue === secondValue;
const patternCompare = getStrictCompareFunc('true');


export const endpoint = hostConfig.api_path;
