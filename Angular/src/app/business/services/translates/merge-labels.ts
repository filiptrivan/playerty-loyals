import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { TranslateLabelsGeneratedService } from "./labels.generated";


@Injectable({
    providedIn: 'root',
})
export class TranslateLabelsService {

    constructor(
        private translateLabelsGeneratedService: TranslateLabelsGeneratedService,
    ) {
    }

    translate(name: string){
        let result = null;

        result = this.translateLabelsGeneratedService.translate(name);
        if (result != null)
            return result;

        return name;
    }
}
