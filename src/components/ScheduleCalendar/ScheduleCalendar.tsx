import { DateTime } from "luxon";

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
}

export enum START_WEEK {
    MON = 0,
    TUE = 1,
    WED = 2,
    THU = 3,
    FRI = 4,
    SAT = 5,
    SUN = 6,
}

export function ScheduleCalendar({ assignments, startOfTheWeek }: IScheduleCalendar) {

    // const startOfTheWeek = START_WEEK.FRI
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const daysHeader = [...days.slice(startOfTheWeek, days.length), ...days.slice(0, startOfTheWeek)]
    const monthsList = assignments.map(worker => [worker.date.monthLong!]).reduce((accum, curMonth) => !accum.includes(curMonth[0]) ? [...accum, ...curMonth] : accum, [])

    const dateTime = DateTime.now();
    const month = dateTime.month;
    const year = dateTime.year;
    const startWeekday = DateTime.local(year, month, 1).weekday;
    const OFFSET = daysHeader.indexOf(days[startWeekday - 1]);

    const NUM_COLS = 7;
    const tableRows = []

    // assume 1 month data:
    const contents: Array<CalendarData> = Array<null>(31).fill(null).map((_, i) => ({
        day: i + 1,
        data: null
    }));

    assignments.forEach(assignment => {
        contents[assignment.date.day - 1].data = assignment
    });

    // Create Calendar data
    for (let i = 0; i < contents.length;) {
        const offset = i === 0 ? OFFSET : 0;

        const slice = contents.slice(i, i + NUM_COLS - offset);
        const offsetSlice: Array<CalendarData | null> = [...Array(offset), ...slice];
        const slicePush: Array<CalendarData | null> = offsetSlice.length < NUM_COLS ? [...offsetSlice, ...Array(NUM_COLS - offsetSlice.length).fill(null)] : offsetSlice;
        tableRows.push(slicePush);

        i += NUM_COLS - offset;

    }

    const calendarTable = tableRows.map(row => (
        <tr>
            {
                row.map((col, i) => (
                    <td key={i + 1}>
                        <div key={i + 2}>{col?.day}</div>
                        <div key={i + 3}>{col?.data ? 'role: ' + col.data.role : null}</div>
                        <div key={i + 4}>{col?.data ? 'start time: ' + col.data.startTime : null}</div>
                        <div key={i + 5}>{col?.data ? 'end time: ' + col.data.endTime : null}</div>
                    </td>
                ))
            }
        </tr>
    ))

    return (
        <div className="schedule">
            <div>Month{' '}{monthsList[0]}</div>
            <div className="view">
                <table>
                    <thead>
                        <tr>
                            {
                                daysHeader.map((day, i) => (
                                    <td key={i}>{day}</td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {calendarTable}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
