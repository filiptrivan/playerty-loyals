import { SoftFormControl } from './../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { Tier } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { BaseForm } from 'src/app/core/components/base-form/base-form';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styles: [],
})
export class TierListComponent extends BaseForm<Tier> implements OnInit {
    tiers: Tier[];
    crudMenu: MenuItem[] = this.getCrudMenuForOrderedData(new Tier({id: 0}));

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
        this.init(new Tier());

        forkJoin({
            tiers: this.apiService.loadTierList(),
        }).subscribe(({ tiers }) => {
            this.initFormArray(tiers, new Tier({id: 0}));
            
            this.tiers = tiers;
        });
    }

    init(model: Tier){
        this.initFormGroup(model);
        // FT: I don't like the idea of putting form array inside parent form group because i need to name it somehow
    }

    addNewTier(index: number){
        this.addNewFormControlToTheFormArray(new Tier({id: 0}), index);
    }

    onSaveTiers(){
        this.onSaveList(new Tier());
    }
}
