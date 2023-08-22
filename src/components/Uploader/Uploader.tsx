import { FormEvent, useState } from 'react';
import { readExcelFile } from '../../services/spreadsheet';

interface IUploader {
    setData: any // TODO: set correct type for this
}

export function Uploader({ setData }: IUploader) {

    const [file, setFile] = useState<File | null>(null);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // What is this for?

        // Read data
        console.log(file);

        file?.arrayBuffer()
            .then(buffer => readExcelFile(buffer))
            .then(data => setData(data));


    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Upload an excel file sheet
                <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}></input>
            </label>
            <button type="submit">Upload</button>
        </form>
    )
}
