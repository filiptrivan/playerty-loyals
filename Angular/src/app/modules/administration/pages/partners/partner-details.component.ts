import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Partner } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helper/partner.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'partner-details',
    templateUrl: './partner-details.component.html',
    styles: [],
})
export class PartnerDetailsComponent extends BaseForm<Partner> implements OnInit {

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
                    this.init(new Partner(partner));
                });
            }
            else{
                this.init(new Partner({id:0}));
            }
        });
    }

    init(model: Partner){
        this.initFormGroup(model);
    }

    override async onAfterSave(savedPartner: Partner): Promise<void> {
        if ((await firstValueFrom(this.partnerService.partner$))?.id == savedPartner.id) {
            this.partnerService.setCurrentPartner(savedPartner); // FT: Not doing this because maybe the administrator is saving it.
        }
    }
}
