import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
    selector: 'intermediate-step-wrapper',
    templateUrl: './intermediate-step-wrapper.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        SoftControlsModule,
        TranslocoDirective
    ]
})
export class IntermediateStepWrapperComponent implements OnInit {
    @Input() title: string;
    @Input() description: string;

    constructor(
    ) { 
    }

    ngOnInit(): void {
        
    }

}
