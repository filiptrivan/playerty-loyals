import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { PrimengModule, SpiderControlsModule } from '@playerty/spider';

@Component({
    selector: 'intermediate-step-wrapper',
    templateUrl: './intermediate-step-wrapper.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
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
