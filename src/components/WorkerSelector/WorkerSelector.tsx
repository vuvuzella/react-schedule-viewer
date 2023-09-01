import { Form } from "react-bootstrap"

interface IWorkerSelector {
    worker: string | undefined
    workerList: string[]
    setSelectedWorker: (e: any) => void // TODO: set correct type
}

export function WorkerSelector({ worker, workerList, setSelectedWorker }: IWorkerSelector) {
    return (
        <>
            {
                workerList.length ? (
                    <Form.Label>
                        Current Worker:
                        <Form.Select value={worker} onChange={(e) => setSelectedWorker(e.target.value)}>
                            {
                                workerList.map((worker, index) => <option key={index} value={worker}>{worker}</option>)
                            }
                        </Form.Select>
                    </Form.Label>
                ) : null
            }
        </>
    )
}
