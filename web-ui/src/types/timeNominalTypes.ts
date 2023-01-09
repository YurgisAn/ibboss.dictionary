import { format as dateFnsFormat, isMatch, parse } from 'date-fns';

import { Nominal } from '~/types/opaqueTypes';

export type Milliseconds = Nominal<number, 'Milliseconds'>;
export type Seconds = Nominal<number, 'Seconds'>;
export type Minutes = Nominal<number, 'Minutes'>;
export type Hours = Nominal<number, 'Hours'>;

export type ShortTime = Nominal<string, 'time-HH:mm'>;
export type ShortDate = Nominal<string, 'time-dd.MM.yyyy'>;
export type ReportDate = Nominal<string, 'time-yyyy-MM-dd'>;
export type FullLongDate = Nominal<string, 'time-dd.MM.yyyy hh:mm'>;

type TimeTypeUtils<NominalType extends Nominal<string, unknown>> = {
    isValid: (value: string | undefined) => value is NominalType;
    assertValid: (value: string) => asserts value is NominalType;
    tryParse: (value: string | undefined) => Date | undefined;
    parse: (value: string) => Date;
    format: (value: Date) => string;
};

function makeDateTimeUtils<NominalType extends Nominal<string, unknown>>(format: string): TimeTypeUtils<NominalType> {
    const isValid = (value: string | undefined): value is NominalType => !!value && isMatch(value, format);

    const assertValid: (value: string) => asserts value is NominalType = (value) => {
        if (isMatch(value, format)) return;
        throw new Error(`Expected format "${format}", but receive "${value}"`);
    };

    return {
        isValid,
        assertValid,
        parse: (value) => {
            assertValid(value);
            return parse(value, format, new Date());
        },
        tryParse: (value) => (isValid(value) ? parse(value, format, new Date()) : undefined),
        format: (value: Date) => dateFnsFormat(value, format),
    };
}

export const ShortTimeUtils = makeDateTimeUtils<ShortTime>('HH:mm');
export const ShortDateUtils = makeDateTimeUtils<ShortTime>('dd.MM.yyyy');
export const ReportDateUtils = makeDateTimeUtils<ReportDate>('yyyy-MM-dd');
export const SpecialISODateUtils = makeDateTimeUtils<ReportDate>("yyyy-MM-dd'T'HH:mm:ss");
export const LongDateUtils = makeDateTimeUtils<FullLongDate>('dd.MM.yyyy HH:mm');
