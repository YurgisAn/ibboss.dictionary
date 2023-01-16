/**
 * Валидация дат
 */
import { isShortDatesRangeValid } from '~/helpers/datesHelpers';

import { emptyShortDatesRange } from '../constants';

export const dataRangeValidator = (dates = ''): boolean =>
    dates === emptyShortDatesRange || dates === '' || isShortDatesRangeValid(dates);
