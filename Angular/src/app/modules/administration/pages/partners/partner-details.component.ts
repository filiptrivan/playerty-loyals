import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Partner, PartnerSaveBody } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helpers/partner.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-details',
    templateUrl: './partner-details.component.html',
    styles: [],
})
export class PartnerDetailsComponent extends BaseFormCopy implements OnInit {
    override saveObservableMethod = this.apiService.savePartner;
    partnerFormGroup: SoftFormGroup<Partner>;
    partnerSaveBodyName: string = nameof<PartnerSaveBody>('partnerDTO');
    override mainDTOName: string = this.partnerSaveBodyName;

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
        private apiService: ApiService,
        private partnerService: PartnerService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if(this.modelId > 0){
                forkJoin({
                    partner: this.apiService.getPartner(this.modelId),
                })
                .subscribe(({ partner }) => {
                    this.initPartnerFormGroup(new Partner(partner));
                });
            }
            else{
                this.initPartnerFormGroup(new Partner({id: 0}));
            }
        });
    }

    initPartnerFormGroup(partner: Partner) {
        this.partnerFormGroup = this.initFormGroup<Partner>(partner, this.partnerSaveBodyName, ['primaryColor']);
    }

    override onBeforeSave(): void {
        let saveBody: PartnerSaveBody = new PartnerSaveBody();

        saveBody.partnerDTO = this.partnerFormGroup.getRawValue();

        this.saveBody = saveBody;
    }

    override async onAfterSave(): Promise<void> {
        if ((await firstValueFrom(this.partnerService.partner$))?.id == this.partnerFormGroup.controls.id.getRawValue()) {
            this.partnerService.setCurrentPartner(this.partnerFormGroup.getRawValue()); // FT: Not doing this because maybe the administrator is saving it.
        }
    }
}
