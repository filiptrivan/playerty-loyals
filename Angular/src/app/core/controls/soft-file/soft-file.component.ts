import { ApiService } from './../../../business/services/api/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { CommonModule } from '@angular/common';
import { FileSelectEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { getMimeTypeForFileName } from '../../services/helper-functions';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';

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
        RequiredComponent,
        TranslocoDirective
    ]
})
export class SoftFileComponent extends BaseControl implements OnInit {
    files: File[] = [];
    @Input() objectId: number;
    @Input() fileData: string;

    uploadPhotoEndpoint: () => Observable<any>;

    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
        private apiService: ApiService,
    ) { 
        super(translocoService, translateLabelsService);
    }

    override ngOnInit(){
        if (this.control.value != null && this.fileData != null) {
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

    // FT: Put inside global functions if you need it
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
