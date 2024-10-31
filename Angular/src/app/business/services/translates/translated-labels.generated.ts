import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { TranslateLabelsBusinessService } from './generated/business-labels.generated';
import { TranslateLabelsSecurityService } from './generated/security-labels.generated';

@Injectable({
    providedIn: 'root',
})
export class TranslateLabelsService {

    constructor(
        private translateLabelsBusinessService: TranslateLabelsBusinessService,
        private translateLabelsSecurityService: TranslateLabelsSecurityService
    ) {
    }

    translate(name: string){
        let result = null;

        result = this.translateLabelsBusinessService.translate(name);
        if (result != null)
            return result;

        result = this.translateLabelsSecurityService.translate(name);
        if (result != null)
            return result;

        return name;
    }
}
