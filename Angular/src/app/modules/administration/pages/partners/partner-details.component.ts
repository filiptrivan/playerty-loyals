import { BaseFormService } from './../../../../core/services/base-form.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { Partner, PartnerSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helpers/partner.service';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SpiderFormGroup } from 'src/app/core/components/spider-form-control/spider-form-control';
import { SpiderMessageService } from 'src/app/core/services/spider-message.service';

@Component({
    selector: 'partner-details',
    templateUrl: './partner-details.component.html',
    styles: [],
})
export class PartnerDetailsComponent extends BaseFormCopy implements OnInit {
    partnerFormGroup = new SpiderFormGroup<Partner>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        
    }

    override onBeforeSave = (saveBody: PartnerSaveBody): void => {

    }

    override onAfterSave = async () => {
        if ((await firstValueFrom(this.partnerService.partner$))?.id == this.partnerFormGroup.controls.id.getRawValue()) {
            this.partnerService.setCurrentPartner(this.partnerFormGroup.getRawValue()); // FT: Not doing this because maybe the administrator is saving it.
        }
    }
}
