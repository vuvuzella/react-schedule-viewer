interface IWorkerSelector {
    worker: string | undefined
    workerList: string[]
    setSelectedWorker: (e: any) => void // TODO: set correct type
}

export function WorkerSelector({ worker, workerList, setSelectedWorker }: IWorkerSelector) {
    return (
        <div>
            <label>
                Current Worker:
                <select value={worker} onChange={(e) => setSelectedWorker(e.target.value)}>
                    {
                        workerList.map((worker, index) => <option key={index} value={worker}>{worker}</option>)
                    }
                </select>
            </label>
        </div>
    )
}
