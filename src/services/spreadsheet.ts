import { read, Sheet } from 'xlsx';
import { getDateFromFormat } from './utils';
import { DateTime } from 'luxon'

function getStartEndTimes(column: string, sheet: Sheet) {
    return ({
        startTime: sheet[column + 2] ? sheet[column + 2].w : "no start time",
        endTime: sheet[column + 30] ? sheet[column + 30].w : "no end time"
    });
}

function getRole(column: string, sheet: Sheet) {
    return { role: sheet[column + 1].w };
}

function getDate(row: string, sheet: Sheet) {
    return { date: getDateFromFormat(sheet['B' + row].w) }
}

function getWorker(column: string, row: string, sheet: Sheet) {
    const workers: string[] = sheet[column + row] ? sheet[column + row].w.trim().split(' ') : []
    return workers.map(worker => ({ name: worker }));
}

function getDataFromSheet(sheet: Sheet) {
    const columns = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('');   // The columns to reference a specific cell using A1 format
    const NUM_ROWS = 27;
    const ROW_OFFSET = 3
    const dataRowIndices = Array<number>(NUM_ROWS).fill(1).map((_, i) => i + ROW_OFFSET);   // create a range of numbers with an offset

    const data = columns
        .map(col => dataRowIndices.map(row => {
            if (sheet[col + row]) {
                const assignees = getWorker(col, row.toString(), sheet);
                const startEndTimes = getStartEndTimes(col, sheet);
                const role = getRole(col, sheet);
                const date = getDate(row.toString(), sheet);
                const data = assignees.map(worker => ({
                    ...worker,
                    ...startEndTimes,
                    ...role,
                    ...date,
                    meta: { cell: col + row }    // to be expanded in the future with more meta information
                }))
                return data;    // return [] of length either 1 or 2
            } else {
                return [];      // return empty []
            }
        }).filter(row => row.length > 0)    // filter out empty array
            .reduce((prevVal, curVal) => [...prevVal, ...curVal], []))  // reduce [][1-2] into [1]
        .reduce((prevVal, curVal) => [...prevVal, ...curVal], []);  // reduce [][1] into []
    return data
}

export type ScheduleData = {
    name: string,
    role: string  // Can be an enum but this depends on the excel file
    date: DateTime,
    startTime: string,
    endTime: string,
    meta: {
        cell: string
    }
}

export function readExcelFile(buffer: ArrayBuffer): ScheduleData[] {
    const xls = read(buffer);
    const sheet = xls.Sheets["Sheet1"];
    const data = getDataFromSheet(sheet);
    return data;
}
