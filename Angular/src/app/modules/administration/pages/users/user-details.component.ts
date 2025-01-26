import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { UserExtended } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderMessageService, BaseFormService } from '@playerty/spider';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styles: [],
})
export class UserDetailsComponent extends BaseFormCopy implements OnInit {
    userExtendedFormGroup = new SpiderFormGroup<UserExtended>({});

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
         
    override ngOnInit() {
        
    }

    userExtendedFormGroupInitFinish(){
        this.userExtendedFormGroup.controls.email.disable();
    }

    override onBeforeSave = (): void => {

    }
}
