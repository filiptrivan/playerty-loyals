import { ChangeDetectorRef, Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { HttpClient } from '@angular/common/http';
import { SpiderMessageService } from 'src/app/core/services/spider-message.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpiderControlsModule } from 'src/app/core/controls/spider-controls.module';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { VerificationTokenRequest } from 'src/app/business/entities/security-entities.generated';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { LayoutService } from 'src/app/layout/services/app.layout.service';

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
export class VerificationWrapperComponent extends BaseForm<VerificationTokenRequest> implements OnInit {
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
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        public layoutService: LayoutService, 
    ) { 
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }

    override ngOnInit(){
        this.init(new VerificationTokenRequest({email: this.email}));
    }

    init(model: VerificationTokenRequest){
        this.initFormGroup(model);
    }

    codeSubmit(){
        let isValid: boolean = this.checkFormGroupValidity();
    
        if(isValid){
            this.onCodeSubmit.next(this.model.verificationCode);
        }
    }

    resendVerificationToken(){
        this.onResendVerificationToken.next(null);
    }

}

