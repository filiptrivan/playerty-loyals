import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PartnerService } from 'src/app/business/services/helper/partner.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftFormControl } from 'src/app/core/components/soft-form-control/soft-form-control';
import { BaseEntity } from 'src/app/core/entities/base-entity';
import { PrimengOption } from 'src/app/core/entities/primeng-option';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './partner-select.component.html',
})
export class PartnerSelectComponent extends BaseForm<PartnerIntermediateStep> implements OnInit {
  partnerIntermediateStepTitle: string;
  partnerIntermediateStepDescription: string;

  partnerOptions: PrimengOption[];

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

  override ngOnInit(){
    this.partnerIntermediateStepTitle = this.translocoService.translate('PartnerIntermediateStepTitle');
    this.partnerIntermediateStepDescription = this.translocoService.translate('PartnerIntermediateStepDescription');

    this.init(new PartnerIntermediateStep());
  }

  init(model: PartnerIntermediateStep){
    this.initFormGroup(model);
  }
  
  override onAfterControlInitialization(formControlName: string){
    if(formControlName == 'partnerSlug')
      this.formGroup.controls['partnerSlug'].validator = this.validatorService.isArrayEmpty(this.formGroup.controls['partnerSlug'] as SoftFormControl);
  }

  async partnerSubmit(){
    let isValid: boolean = this.checkFormGroupValidity();

    if(isValid){
      localStorage.setItem(environment.partnerSlugKey, this.model.partnerSlug);
      await firstValueFrom(this.partnerService.loadCurrentPartner());
      await firstValueFrom(this.partnerService.loadCurrentPartnerUser());
      this.router.navigate(['/'], { queryParams: { [environment.partnerParamKey]: this.model.partnerSlug } });
    }
  }
  
  searchPartners(event: AutoCompleteCompleteEvent){ 
      this.apiService.loadPartnerWithSlugListForAutocomplete(50, event?.query).subscribe(cl => {
        this.partnerOptions = cl.map(c => { return { label: c.displayName, value: c.code }});
      })
  }

}

class PartnerIntermediateStep extends BaseEntity
{
	partnerSlug?: string;

    constructor(
    {
		partnerSlug,
    }:{
		partnerSlug?: string;
    } = {}
    ) {
        super('PartnerIntermediateStep'); 

		this.partnerSlug = partnerSlug;
    }
}