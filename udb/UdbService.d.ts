import {Logger} from "../Logger"
import {Memory} from "../output/Memory"
import {WebFileInput} from "./WebFileInput"

export declare class WebReadLine {
    lineCb: Function
    closeCb: Function
    private data
    private pos
    private read

    createInterface(param: any): this;

    on(eventName: any, cb: any): this;
}

export declare class UdbService {
    private logger
    private webFileInput
    private $http
    private webReadLine
    private readonly sources
    private readonly memory
    private format
    private firstIndex
    private maxCount
    private recordFormatter
    private loadSources
    private loadData

    constructor(logger: Logger, webFileInput: WebFileInput, $http: any, webReadLine: WebReadLine);

    load(sourcesFilename: string, dataFilename: string): void;

    match(matchCriteria: any): Promise<Memory>;
}
