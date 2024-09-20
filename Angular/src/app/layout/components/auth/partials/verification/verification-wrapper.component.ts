import { AuthService } from '../../../../../core/services/auth.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { LayoutService } from '../../../../service/app.layout.service';
import { Subscription } from 'rxjs';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { HttpClient } from '@angular/common/http';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { VerificationTokenRequest } from 'src/app/business/entities/generated/security-entities.generated';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'verification-wrapper',
    templateUrl: './verification-wrapper.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        SoftControlsModule,
    ]
})
export class VerificationWrapperComponent extends BaseForm<VerificationTokenRequest> implements OnInit {
    private subscription: Subscription | null = null;
    @Input() email: string;
    @Output() onResendVerificationToken: EventEmitter<any> = new EventEmitter();
    @Output() onCodeSubmit: EventEmitter<string> = new EventEmitter();

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router,
        protected override route: ActivatedRoute,
        public layoutService: LayoutService, 
        private authService: AuthService, 
    ) { 
        super(differs, http, messageService, changeDetectorRef, router, route);
    }

    override ngOnInit(){
        this.subscription = this.authService.navigateToDashboardIfLoggedIn(); // TODO FT: Make the guard for this
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

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}

