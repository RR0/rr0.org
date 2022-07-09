import {Input} from "../input/Input"
import {Logger} from "../Logger"
import {RecordEnumerator} from "../input/RecordEnumerator"
import {UdbRecord} from "../input/db/UdbRecord"

/**
 * A FileInput that reads from a webapp.
 */
export declare class WebFileInput implements Input {
    buffer: Uint8Array
    fileData: ArrayBuffer
    filePos: number
    recordSize: number
    fileSize: number
    private logger
    private $http
    private recordReader
    private getBuffer

    constructor(logger: Logger, $http: any);

    open(dataFile: any, whenDone: Function): void;

    recordEnumerator(firstIndex: number, maxCount: number): RecordEnumerator;

    goToRecord(recordIndex: any): void;

    hasNext(): boolean;

    readRecord(recordIndex: number): Promise<UdbRecord>;

    close(): void;
}
