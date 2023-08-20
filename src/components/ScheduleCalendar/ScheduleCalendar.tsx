import { DateTime } from "luxon";

interface IScheduleCalendar {

}

enum START_WEEK {
    MON = 0,
    TUE = 1,
    WED = 2,
    THU = 3,
    FRI = 4,
    SAT = 5,
    SUN = 6,
}

export function ScheduleCalendar() {

    const startOfTheWeek = START_WEEK.FRI
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const daysHeader = [...days.slice(startOfTheWeek, days.length), ...days.slice(0, startOfTheWeek)]

    const dateTime = DateTime.now();
    const month = dateTime.month;
    const year = dateTime.year;
    const startWeekday = DateTime.local(year, month, 1).weekday;
    const OFFSET = daysHeader.indexOf(days[startWeekday - 1]);

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
                            {
                                daysHeader.map(day => (
                                    <td>{day}</td>
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
