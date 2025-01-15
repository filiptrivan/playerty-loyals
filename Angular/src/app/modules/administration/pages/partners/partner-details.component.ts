import { BaseFormService } from './../../../../core/services/base-form.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Partner, PartnerSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helpers/partner.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { SoftButton } from 'src/app/core/entities/soft-button';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-details',
    templateUrl: './partner-details.component.html',
    styles: [],
})
export class PartnerDetailsComponent extends BaseFormCopy implements OnInit {
    partnerFormGroup = new SoftFormGroup<Partner>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override translateClassNamesService: TranslateClassNamesService,
        protected override validatorService: ValidatorService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService, baseFormService);
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
