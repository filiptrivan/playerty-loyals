import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { getControl, SpiderControlsModule, SpiderFormGroup, SpiderPanelsModule } from '@playerty/spider';
import { BusinessSystemUpdatePointsDataBody } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'automatic-update-points-body',
    templateUrl: './automatic-update-points-body.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderPanelsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        ButtonModule
    ]
})
export class AutomaticUpdatePointsBodyComponent implements OnInit {
    @Input() automaticUpdatePointsFormGroup: SpiderFormGroup<BusinessSystemUpdatePointsDataBody>;

    constructor(
    ) { 
    }

    ngOnInit(){

    }

    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }
}
