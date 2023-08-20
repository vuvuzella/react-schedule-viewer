interface IWorkerSelector {
    worker: string
    workerList: string[]
}

export function WorkerSelector({ worker, workerList }: IWorkerSelector) {
    return (
        <div>
            <label>
                Current Worker:
                <select value={worker}>
                    {
                        workerList.map((worker, index) => <option key={index}>{worker}</option>)
                    }
                </select>
            </label>
        </div>
    )
}
