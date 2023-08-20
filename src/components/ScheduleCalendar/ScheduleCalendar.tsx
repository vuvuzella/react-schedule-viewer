import { DateTime } from "luxon";

interface IScheduleCalendar {

}

enum START_WEEK {
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6,
    SUN = 7,
}

export function ScheduleCalendar() {

    const startOfTheWeek = START_WEEK.SUN

    const dateTime = DateTime.now();
    const month = dateTime.month;
    const year = dateTime.year;
    const OFFSET = DateTime.local(year, month, 1).weekday & startOfTheWeek;

    const NUM_COLS = 7;
    const contents = Array<null>(31).fill(null).map((_, i) => i + 1);

    const tableRows = []

    // Create Calendar data
    for (let i = 0; i < contents.length;) {
        const offset = i === 0 ? OFFSET : 0;

        const slice = contents.slice(i, i + NUM_COLS - offset);
        const offsetSlice = [...Array(offset), ...slice];
        const slicePush = offsetSlice.length < NUM_COLS ? [...offsetSlice, ...Array(NUM_COLS - offsetSlice.length).fill(null)] : offsetSlice
        tableRows.push(slicePush)

        i += NUM_COLS - offset;

    }

    const calendarTable = tableRows.map(row => (
        <tr>
            {
                row.map(col => (
                    <td>{col}</td>
                ))
            }
        </tr>
    ))

    return (
        <div className="schedule">
            <div className="month">Month: August</div>
            <div className="view">
                <table>
                    <thead>
                        <tr>
                            <td>Sun</td>
                            <td>Mon</td>
                            <td>Tue</td>
                            <td>Wed</td>
                            <td>Thu</td>
                            <td>Fri</td>
                            <td>Sat</td>
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
