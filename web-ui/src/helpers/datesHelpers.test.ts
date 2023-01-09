import { isShortDatesRangeValid } from './datesHelpers';

describe('isShortDatesRangeValid', () => {
    it('Should be valid if start before finish', () => {
        expect(isShortDatesRangeValid('29.06.2022 - 08.07.2022')).toEqual(true);
    });

    it('Should be not valid if start is incorrect', () => {
        expect(isShortDatesRangeValid('32.06.2022 - 08.07.2022')).toEqual(false);
    });

    it('Should be not valid if finish is incorrect', () => {
        expect(isShortDatesRangeValid('19.06.2022 - _1.07.2022')).toEqual(false);
    });

    it('Should be not valid if start after finish', () => {
        expect(isShortDatesRangeValid('29.06.2022 - 28.06.2022')).toEqual(false);
    });

    it('Should be valid if start equal to finish on not strict mode', () => {
        expect(isShortDatesRangeValid('29.06.2022 - 29.06.2022')).toEqual(true);
    });

    it('Should be not valid if start equal to finish on strict mode', () => {
        expect(isShortDatesRangeValid('29.06.2022 - 29.06.2022', true)).toEqual(false);
    });
});
