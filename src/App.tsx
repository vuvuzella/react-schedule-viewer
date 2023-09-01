import { useState } from 'react'
import './App.css'
import { WorkerSelector } from './components/WorkerSelector/WorkerSelector'
import { ScheduleCalendar, START_WEEK } from './components/ScheduleCalendar/ScheduleCalendar'
import { Uploader } from './components/Uploader/Uploader'
import { getDateFromFormat } from './services/utils'
import { ScheduleData } from './services/spreadsheet'

import { Container, Row, Col } from 'react-bootstrap'
import { Jumbotron } from './components/Jumbotron/Jumbotron'

// Possible classess:
// Role(name, startTime, endTime) // The startTime and endTime change, can be made unique
// AnatomicalPathologyWorker(name, Assignment[])  can be a LabTech, or an Assistant
// Assignment(LabTech, Role)
// Roster(DateTime, Assignments[])



function App() {

  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [workerList, setWorkerList] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | undefined>(workerList.length > 0 ? workerList[0] : undefined);

  function onUploadData(data: ScheduleData[]) {
    setScheduleData(data);
    const workerList = data
      .map(sched => [sched.name])
      .reduce(
        (accumNameList, prevNameList) =>
          accumNameList.includes(prevNameList[0])
            ? accumNameList
            : [...accumNameList, ...prevNameList], []
      );
    setWorkerList(workerList);
    setSelectedWorker(workerList[0]);
  }

  return (
    <Container id="app">
      <Row>
        <Jumbotron title='Pathology Lab Schedule Viewer' description="This app enables the user to view any lab worker's shcedule in different types of views. Currently there are 2 views being developed: The calendar view and a list view" ></Jumbotron>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="">
          <Uploader setData={onUploadData} />
        </Col>
      </Row>
      <Row className="">
        <WorkerSelector worker={selectedWorker} workerList={workerList} setSelectedWorker={setSelectedWorker} />
        <ScheduleCalendar assignments={scheduleData} selectedWorker={selectedWorker} startOfTheWeek={START_WEEK.SUNDAY} />
      </Row>
    </Container>
  )
}

export default App
