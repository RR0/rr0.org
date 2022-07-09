import {Logger} from "../Logger"
import {UdbService} from "./UdbService"

export declare class UdbController {
    $onInit: () => void
    private udbService
    private matchCriteria
    private matchResults
    private logs

    constructor($scope: any, udbService: UdbService, logger: Logger);

    timeLink(year: any): string;

    search(): Promise<void>;
}
