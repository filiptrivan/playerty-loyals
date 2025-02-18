import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { getControl, SpiderControlsModule, SpiderFormGroup, SpiderPanelsModule } from '@playerty/spider';
import { ManualUpdatePoints } from 'src/app/business/entities/business-entities.generated';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'manual-update-points-body',
    templateUrl: './manual-update-points-body.component.html',
    styles: [],
    standalone: true,
    imports: [
        SpiderPanelsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        ButtonModule,
        TranslocoDirective,
    ]
})
export class ManualUpdatePointsBodyComponent implements OnInit {
    @Input() manualUpdatePointsFormGroup: SpiderFormGroup<ManualUpdatePoints>;

    constructor(
    ) { 
    }

    ngOnInit(){

    }

    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }
}
