import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Partner } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
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
        private apiService: ApiService) 
        {
        super(differs, http, messageService, changeDetectorRef, router, route);
        }
         
    override ngOnInit() {
        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            forkJoin({
                partner: this.apiService.getPartner(this.modelId),
            })
            .subscribe(({ partner }) => {
                this.init(new Partner(partner));
            });
        });
    }

    init(model: Partner){
        this.initFormGroup(model);
    }

    override onBeforeSave(): void {
        // let saveBody: UserExtendedSaveBody = new UserExtendedSaveBody();

        // saveBody.partnerExtendedDTO = this.model;
        // saveBody.selectedRoleIds = this.selectedRoles.value;

        // this.saveBody = saveBody;
        // return;
    }
}
