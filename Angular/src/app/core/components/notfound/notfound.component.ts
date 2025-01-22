import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'not-found',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent { 
    companyName = environment.companyName;
}