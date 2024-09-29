import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ApiService } from 'src/app/business/services/api/api.service';
import { isArrayEmpty } from 'src/app/business/services/validation/validation-rules';
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
  partnerIntermediateStepTitle = $localize`:@@PartnerIntermediateStepTitle: Choose the partner whose loyalty application you want to go to.`
  partnerIntermediateStepDescription: string = $localize`:@@PartnerIntermediateStepDescription: Ovde treba nesto da se napise da ce u svakom trenutku moci da promeni partnera. Lorem ipsum description, lorem ipsum lorem ipsum lorem do lo re m ispum.`

  partnerOptions: PrimengOption[];

  constructor(
    protected override differs: KeyValueDiffers,
    protected override http: HttpClient,
    protected override messageService: SoftMessageService, 
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override route: ActivatedRoute,
    private apiService: ApiService,
) { 
    super(differs, http, messageService, changeDetectorRef, router, route);
}

  override ngOnInit(){
    this.init(new PartnerIntermediateStep());
  }

  init(model: PartnerIntermediateStep){
    this.initFormGroup(model);
  }
  
  override onAfterControlInitialization(formControlName: string){
    if(formControlName == 'partnerSlug')
      this.formGroup.controls['partnerSlug'].validator = isArrayEmpty(this.formGroup.controls['partnerSlug'] as SoftFormControl);
  }

  partnerSubmit(){
    let isValid: boolean = this.checkFormGroupValidity();

    if(isValid){
      localStorage.setItem(environment.partnerSlugKey, this.model.partnerSlug);
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