import { FormEvent, useState, useEffect } from 'react';
import { readExcelFile } from '../../services/spreadsheet';

export function Uploader() {

    const [file, setFile] = useState<File | null>(null);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // What is this for?

        // Read data
        console.log(file);

        file?.arrayBuffer().then(buffer => readExcelFile(buffer));


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
