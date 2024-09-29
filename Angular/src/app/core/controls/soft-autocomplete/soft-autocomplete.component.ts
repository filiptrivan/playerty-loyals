import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { BaseAutocompleteControl } from '../base-autocomplete-control';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';

@Component({
    selector: 'soft-autocomplete',
    templateUrl: './soft-autocomplete.component.html',
    styles: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        RequiredComponent
    ]
})
export class SoftAutocompleteComponent extends BaseAutocompleteControl implements OnInit {
    // @Input() required: boolean = true; // TODO FT: delete if you don't need through whole app
    @Input() showMoreOptions: boolean = false;
    @Input() moreOptionsIcon: string = 'pi-ellipsis-h';
    @Output() onMoreOptionsClick: EventEmitter<null> = new EventEmitter();

    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    search(event: AutoCompleteCompleteEvent){
        this.onTextInput.next(event);
    }

    buttonClick(){

    }

    moreOptionsClick(){
        this.onMoreOptionsClick.next(null);
    }

}
