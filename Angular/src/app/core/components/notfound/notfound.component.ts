import { Component } from '@angular/core';
import { ConfigBaseService } from '../../services/config-base.service';

@Component({
    selector: 'not-found',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent { 
    companyName = this.config.companyName;

    constructor(
        private config: ConfigBaseService
    ) { 

    }
}