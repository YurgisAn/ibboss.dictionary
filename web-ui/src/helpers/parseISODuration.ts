const nr = '\\-*\\d+(?:[\\.,]\\d+)?';
const dateRegex = `(${nr}Y)?(${nr}M)?(${nr}D)?`;
const timeRegex = `T(${nr}H)?(${nr}M)?(${nr}S)?`;
const durationRegex = new RegExp(`P${dateRegex}(?:${timeRegex})?`);

/**
 * @name parseISODuration
 * @category Common Helpers
 * @summary Parse ISO duration string
 *
 * @description
 * Parse the given string in ISO 8601 duration format and return an instance of Duration.
 *
 * Function accepts complete ISO 8601 formats.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the value isn't a string, the function cannot parse the string or
 * the values are invalid, it returns null.
 *
 * @param {String} value - the value to convert
 * @returns {Duration | null} the parsed duration or null
 * @throws {TypeError} 1 value required
 *
 * @example
 * // Convert string 'P1DT5M30S' to duration:
 * var result = parseISO('P1HT5M30S')
 * //=> { days: 1, minutes: 5, seconds: 30 }
 */

export function parseISODuration(value: string | null | undefined): Duration | null {
    if (!value) {
        return null;
    }

    const match = value.match(durationRegex);
    if (!match) {
        return null;
    }

    // at least one part must be specified
    if (!match[1] && !match[2] && !match[3] && !match[4] && !match[5] && !match[6]) {
        return null;
    }

    const duration: Duration = {};
    if (match[1]) duration.years = parseFloat(match[1]);
    if (match[2]) duration.months = parseFloat(match[2]);
    if (match[3]) duration.days = parseFloat(match[3]);
    if (match[4]) duration.hours = parseFloat(match[4]);
    if (match[5]) duration.minutes = parseFloat(match[5]);
    if (match[6]) duration.seconds = parseFloat(match[6]);
    return duration;
}
