import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';

@Component({
    selector: 'soft-calendar',
    templateUrl: './soft-calendar.component.html',
    styles: []
})
export class SoftCalendarComponent extends BaseControl implements OnInit {
    constructor() {
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }
}
