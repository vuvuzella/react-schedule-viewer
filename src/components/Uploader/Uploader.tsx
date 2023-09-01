import './Uploader.css'

import { FormEvent, useState } from 'react';
import { readExcelFile } from '../../services/spreadsheet';
import { Form, Button } from 'react-bootstrap';

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
        <Form onSubmit={onSubmit} className="">
            <Form.Group controlId="formUpload">
                <Form.Label>Upload an excel file sheet</Form.Label>
                <Form.Control type="file" onChange={(e: any) => e.currentTarget.files?.length > 0 ? setFile(e.currentTarget.files[0]) : null} className="mb-2"></Form.Control>
            </Form.Group>
            <Button className="mb-2" type="submit" variant="primary">Upload</Button>
        </Form>
    )
}
