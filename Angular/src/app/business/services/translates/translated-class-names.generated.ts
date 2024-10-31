import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { TranslateClassNamesBusinessService } from './generated/business-class-names.generated';
import { TranslateClassNamesSecurityService } from './generated/security-class-names.generated';

@Injectable({
    providedIn: 'root',
})
export class TranslateClassNamesService {

    constructor(
        private translateClassNamesBusinessService: TranslateClassNamesBusinessService,
        private translateClassNamesSecurityService: TranslateClassNamesSecurityService
    ) {
    }

    translate(name: string){
        let result = null;

        result = this.translateClassNamesBusinessService.translate(name);
        if (result != null)
            return result;

        result = this.translateClassNamesSecurityService.translate(name);
        if (result != null)
            return result;

        return name;
    }
}
