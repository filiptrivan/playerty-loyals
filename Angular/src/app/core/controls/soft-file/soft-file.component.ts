import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';
import { FileSelectEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/business/services/api/api.service';
import { getMimeTypeForFileName } from '../../services/helper-functions';

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
    @Input() fileData: string;

    uploadPhotoEndpoint: () => Observable<any>;

    constructor(private apiService: ApiService) { 
        super();
    }

    override ngOnInit(){
        if (this.control.value != null) {
            const file = this.base64ToFile(this.fileData);
            this.files.push(file);
        }

        super.ngOnInit();
    }

    onSelectedFiles(event: FileSelectEvent){
        const file = event.files[0];

        const formData: FormData = new FormData();
        formData.append('file', file, `${this.objectId}-${file.name}`);
        
        this.apiService.uploadLogoImage(formData).subscribe((completeFileName: string) => {
            this.control.setValue(completeFileName);
        });
    }

    choose(event, chooseCallback){
        chooseCallback();
    }
    
    removeFile(removeFileCallback, index: number){
        removeFileCallback(index);
        this.control.setValue(null);
    }

    base64ToFile(base64String: string){
        const [header, base64Content] = base64String.split(';base64,');
        const fileName = header.split('=')[1];
        const mimeType = getMimeTypeForFileName(fileName);

        const byteCharacters = atob(base64Content);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const blob = new Blob([byteNumbers], { type: mimeType });
        const file = new File([blob], fileName, { type: mimeType });

        return file;
    }

}
