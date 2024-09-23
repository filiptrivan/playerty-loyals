import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'tier-details',
    templateUrl: './tier-details.component.html',
    styles: [],
})
export class TierDetailsComponent extends BaseForm<Tier> implements OnInit {
    private routeSub: Subscription;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SoftMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route);
        }
         
    override ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modelId = params['id'];
            if(this.modelId > 0){
                forkJoin({
                    tier: this.apiService.getTier(this.modelId),
                  }).subscribe(({ tier }) => {
                    this.init(new Tier(tier));
                  });
            }
            else{
                this.init(new Tier({id:0}));
            }
        });
    }

    init(model: Tier){
        this.initFormGroup(model);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    override onBeforeSave(): void {
    }
}
