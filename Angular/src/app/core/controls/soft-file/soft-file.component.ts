import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
    selector: 'soft-file',
    templateUrl: './soft-file.component.html',
    styles: [],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        RequiredComponent
    ]
})
export class SoftFileComponent extends BaseControl implements OnInit {

    constructor() { 
        super();
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    onSelectedFiles(event: FileSelectEvent){
        const file = event.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.substring(base64String.indexOf(',') + 1);
            this.control.setValue(base64Data);
        };
    }

    choose(event, chooseCallback){
        chooseCallback();
    }
    
    removeFile(removeUploadedFileCallback, index){
        removeUploadedFileCallback(index);
        this.control.setValue(null);
    }

}
