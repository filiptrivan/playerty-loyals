import { Injectable } from "@angular/core";
import { TranslateLabelsGeneratedService } from "./labels.generated";
import { TranslateLabelsAbstractService } from '@playerty/spider';

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
