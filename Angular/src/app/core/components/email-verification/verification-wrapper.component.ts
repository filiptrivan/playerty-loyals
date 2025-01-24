import { ChangeDetectorRef, Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpiderMessageService } from 'src/app/core/services/spider-message.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpiderControlsModule } from 'src/app/core/controls/spider-controls.module';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { VerificationTokenRequest } from 'src/app/core/entities/security-entities.generated';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { BaseFormCopy } from '../base-form/base-form copy';
import { BaseFormService } from '../../services/base-form.service';
import { SpiderFormGroup } from '../spider-form-control/spider-form-control';

@Component({
    selector: 'verification-wrapper',
    templateUrl: './verification-wrapper.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderControlsModule,
        TranslocoDirective,
    ]
})
export class VerificationWrapperComponent extends BaseFormCopy implements OnInit {
    verificationTokenRequestFormGroup = new SpiderFormGroup<VerificationTokenRequest>({});

    @Input() email: string;
    @Output() onResendVerificationToken: EventEmitter<any> = new EventEmitter();
    @Output() onCodeSubmit: EventEmitter<string> = new EventEmitter();

    constructor(
      protected override differs: KeyValueDiffers,
      protected override http: HttpClient,
      protected override messageService: SpiderMessageService, 
      protected override changeDetectorRef: ChangeDetectorRef,
      protected override router: Router, 
      protected override route: ActivatedRoute,
      protected override translocoService: TranslocoService,
      protected override baseFormService: BaseFormService,
    ) { 
      super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit(){
        this.initVerificationTokenRequestFormGroup(new VerificationTokenRequest({email: this.email}));
    }

    initVerificationTokenRequestFormGroup(model: VerificationTokenRequest){
        this.initFormGroup(this.verificationTokenRequestFormGroup, this.formGroup, model, model.typeName, []);
    }

    codeSubmit(){
        let isValid: boolean = this.checkFormGroupValidity();
    
        if(isValid){
            this.onCodeSubmit.next(this.verificationTokenRequestFormGroup.controls.verificationCode.getRawValue());
        }
    }

    resendVerificationToken(){
        this.onResendVerificationToken.next(null);
    }

}

