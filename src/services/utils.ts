import { DateTime } from 'luxon'

export function getDateFromFormat(date: string): DateTime {
    const format = "d-LLL"
    return DateTime.fromFormat(date, format)
}
