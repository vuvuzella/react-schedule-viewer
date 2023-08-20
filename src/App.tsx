import { useState } from 'react'
import { DateTime } from 'luxon'
import './App.css'
import { WorkerSelector } from './components/WorkerSelector/WorkerSelector'
import { ScheduleCalendar, START_WEEK } from './components/ScheduleCalendar/ScheduleCalendar'

function getDateFromFormat(date: string): DateTime {
  const format = "dd-LLL"
  return DateTime.fromFormat(date, format)
}

// Possible classess:
// Role(name, startTime, endTime) // The startTime and endTime change, can be made unique
// AnatomicalPathologyWorker(name, Assignment[])  can be a LabTech, or an Assistant
// Assignment(LabTech, Role)
// Roster(DateTime, Assignments[])

const DATA = [
  { name: "KL", role: "MACRO", date: getDateFromFormat("17-Jul"), startTime: "8:00", endTime: "16:30" },
  { name: "KL", role: "SPECIALS", date: getDateFromFormat("18-Jul"), startTime: "6:30", endTime: "15:00" },
  { name: "KL", role: "SPECIALS", date: getDateFromFormat("21-Jul"), startTime: "6:30", endTime: "15:00" },
  { name: "KL", role: "CUT/RECUT", date: getDateFromFormat("22-Jul"), startTime: "6:00", endTime: "14:30" },
  { name: "KL", role: "ALLOCATION SLIDE FILE", date: getDateFromFormat("23-Jul"), startTime: "6:30", endTime: "3:00" },
]

function App() {

  const workerList = DATA.map(worker => worker.name).reduce((accum, workerName) => !accum.includes(workerName) ? [...accum, workerName] : accum, Array<string>())
  const startDateRange = DATA.map(worker => worker.date).reduce((prevDate, curDate) => prevDate < curDate ? curDate : prevDate)
  const endDateRange = DATA.map(worker => worker.date).reduce((prevDate, curDate) => curDate > prevDate ? curDate : prevDate)

  const [worker, setWorker] = useState<string>(workerList[0]);

  return (
    <div>
      <WorkerSelector worker={worker} workerList={workerList} />
      <ScheduleCalendar assignments={DATA} startOfTheWeek={START_WEEK.SUN} />
    </div>
  )
}

export default App
