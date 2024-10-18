import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';
import { FileSelectEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/business/services/api/api.service';

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
    files: File[] = [];
    @Input() objectId: number;
    @Input() objectTypeName: string;
    @Input() objectPropertyName: string;

    uploadPhotoEndpoint: () => Observable<any>;

    constructor(private apiService: ApiService) { 
        super();
    }

    override ngOnInit(){
        if (this.control.value != null) {
            const file = this.base64ToFile(this.control.value);
            this.files.push(file);
        }
        super.ngOnInit();
    }

    onSelectedFiles(event: FileSelectEvent){
        const file = event.files[0];

        const formData: FormData = new FormData();
        formData.append('file', file, `${this.objectTypeName}-${this.objectPropertyName}-${this.objectId}`);
        
        this.apiService.uploadLogoImage(formData).subscribe((completeFileName: string) => {
            this.control.setValue(completeFileName);
        });
    }

    choose(event, chooseCallback){
        chooseCallback();
    }
    
    removeFile(removeUploadedFileCallback, index){
        removeUploadedFileCallback(index);
        this.control.setValue(null);
    }

    base64ToFile(base64String: string){
        const byteCharacters = atob(base64String);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const blob = new Blob([byteNumbers], { type: 'image/png' });
        const file = new File([blob], 'photo', { type: 'image/png' });

        return file;
    }

}
