import { read } from 'xlsx';

export function readExcelFile(buffer: ArrayBuffer) {
    const xls = read(buffer);
    console.log(xls);
}
