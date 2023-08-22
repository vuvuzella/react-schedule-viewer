import { DateTime } from 'luxon'

export function getDateFromFormat(date: string): DateTime {
    const format = "d-LLL"
    const dateObj = DateTime.fromFormat(date, format)
    return dateObj
}
