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

    setDate(event:Date) { 
        // event.setTime(event.getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
        // console.log(event)
        // this.control.setValue(event)
    }
}
