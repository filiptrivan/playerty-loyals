import { Injectable } from "@angular/core";
import { TranslateLabelsGeneratedService } from "./labels.generated";
import { TranslateLabelsAbstractService } from "src/app/core/services/translate-labels-abstract.service";


@Injectable({
    providedIn: 'root',
})
export class TranslateLabelsService extends TranslateLabelsAbstractService {

    constructor(
        private translateLabelsGeneratedService: TranslateLabelsGeneratedService,
    ) {
        super();
    }

    translate = (name: string) => {
        let result = null;

        result = this.translateLabelsGeneratedService.translate(name);
        if (result != null)
            return result;

        return name;
    }
}
