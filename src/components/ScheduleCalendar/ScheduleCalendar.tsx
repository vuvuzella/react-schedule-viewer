import { DateTime } from "luxon";
import { Table, Container } from "react-bootstrap";

type Assignment = {
    name: string,
    role: string,
    date: DateTime,
    startTime: string,
    endTime: string
}

type CalendarData = {
    day: number,
    data: Assignment | null
}

interface IScheduleCalendar {
    assignments: Assignment[]
    startOfTheWeek: START_WEEK
    selectedWorker: string | undefined
}

export enum START_WEEK {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6,
}

export enum Month {
    Jan = 1,
    Feb = 2,
    Mar = 3,
    Apr = 4,
    May = 5,
    Jun = 6,
    Jul = 7,
    Aug = 8,
    Sep = 9,
    Oct = 10,
    Nov = 11,
    Dec = 12
}

const daysList = Object.keys(START_WEEK).filter(key => isNaN(Number(key))).map(day => day.toLowerCase().split('').map((letter, index) => index === 0 ? letter.toLocaleUpperCase() : letter).join(''));

function getCalendarHeaderData(startOfTheWeek: START_WEEK): Array<string> {
    // Re-arrange the days according to the chosen startOfTheWeek
    const daysHeader = [...daysList.slice(startOfTheWeek, daysList.length), ...daysList.slice(0, startOfTheWeek)];
    return daysHeader;


}

function createCalendarData(assignments: Assignment[], month: Month, year: number, daysHeader: Array<string>): Array<Array<CalendarData | null>> {

    // Calendar data creation algorithm
    // Get the number of offsets needed based on the chosen startOfTheWeek
    // The index where the start of the week is originally becomes the offset
    const startWeekday = DateTime.local(year, month, 1).weekday;
    const OFFSET = daysHeader.indexOf(daysList[startWeekday - 1]);

    // assume 1 month data:
    // TODO: get the number of days based on the month and year
    const numOfDays = DateTime.local(year, month).daysInMonth!;
    const contents: Array<CalendarData> = Array<null>(numOfDays).fill(null).map((_, i) => ({
        day: i + 1,
        data: null
    }));

    // put the correwsponding assignment for the specific month in each CalendarData
    assignments.forEach(assignment => {
        contents[assignment.date.day - 1].data = assignment
    });

    // Create Calendar data array with the corresponding offset fillers
    const NUM_COLS = 7;
    const tableRows = []
    for (let i = 0; i < contents.length;) {

        // only the first row of data should have an offset >= 0
        const offset = i === 0 ? OFFSET : 0;

        const slice = contents.slice(i, i + NUM_COLS - offset);
        const offsetSlice: Array<CalendarData | null> = [...Array(offset), ...slice];
        const slicePush: Array<CalendarData | null> = offsetSlice.length < NUM_COLS ? [...offsetSlice, ...Array(NUM_COLS - offsetSlice.length).fill(null)] : offsetSlice;
        tableRows.push(slicePush);

        i += NUM_COLS - offset;

    }

    return tableRows;
}

function generateCalendarTables(assignments: Assignment[], startOfTheWeek: START_WEEK, selectedWorker: string) {

    const daysHeader = getCalendarHeaderData(startOfTheWeek);

    // TODO: display all months calendar given the array of assignments which contain the months to view
    const workerMonthsList = assignments.map(worker => [worker.date.month!]).reduce((accum, curMonth) => !accum.includes(curMonth[0]) ? [...accum, ...curMonth] : accum, [])
    const monthsAssignment = workerMonthsList.map(month => ({ [month]: assignments.filter(assignment => assignment.date.month === month) })).reduce((accum, monthAssignment) => ({ ...accum, ...monthAssignment }), {});
    const year = DateTime.now().year
    const tableData = workerMonthsList.map(monthNum => ({
        month: DateTime.local(year, monthNum).monthLong,
        calendarData: createCalendarData(monthsAssignment[monthNum], monthNum, year, daysHeader)
    }))

    // Generate the calendar rows jsx
    const tables = tableData.map(data => (
        <>
            <div>
                <h2>{data.month}</h2>
            </div>

            <div className="table-responsive">
                <Table className="align-middle" striped="columns" bordered>
                    <thead>
                        <tr>
                            {
                                daysHeader.map((day, i) => (
                                    <th key={i}>{day}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            data.calendarData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {
                                        row.map((column, columnIndex) => (
                                            <td key={String(rowIndex) + columnIndex} >
                                                <div key={String(rowIndex) + columnIndex + 1}>{column?.day}</div>
                                                <div key={String(rowIndex) + columnIndex + 2}>{column?.data ? 'role: ' + column.data.role.trim() : null}</div>
                                                <div key={String(rowIndex) + columnIndex + 3}>{column?.data ? 'start time: ' + column.data.startTime.trim() : null}</div>
                                                <div key={String(rowIndex) + columnIndex + 4}>{column?.data ? 'end time: ' + column.data.endTime.trim() : null}</div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    ))
    return tables;
}

export function ScheduleCalendar({ assignments, startOfTheWeek, selectedWorker }: IScheduleCalendar) {


    const filteredAssignments = selectedWorker && assignments.length
        ? assignments
            .filter(schedule => schedule.name.toLocaleLowerCase() === selectedWorker.toLocaleLowerCase())
        : []
    const view = selectedWorker ? generateCalendarTables(filteredAssignments, startOfTheWeek, selectedWorker) : null    // TODO: make this a switchable view based on currently selected view option

    return (
        <div className="schedule">
            <div className="view">
                {view}
            </div>
        </div>

    )
}
