import { SoftFormGroup } from '../../../../core/components/soft-form-control/soft-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { Store, StoreSaveBody } from 'src/app/business/entities/generated/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/translated-class-names.generated';
import { ValidatorService } from 'src/app/business/services/validation/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { nameof } from 'src/app/core/services/helper-functions';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';

@Component({
    selector: 'store-details',
    templateUrl: './store-details.component.html',
    styles: [],
})
export class StoreDetailsComponent extends BaseFormCopy implements OnInit {
    tableControllerName: string = 'Store';
    objectNameForTheRequest: string = 'DiscountCategory';

    storeFormGroup: SoftFormGroup<Store>;
    storeSaveBodyName: string = nameof<StoreSaveBody>('storeDTO');

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
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, translateClassNamesService, validatorService);
    }
         
    override ngOnInit() {
        this.controllerName = 'Store';
        this.saveMethodName = 'SaveStore';
        this.detailsTitle = this.translocoService.translate('Store');

        this.route.params.subscribe((params) => {
            this.modelId = params['id'];

            if (this.modelId > 0) {
                forkJoin({
                    store: this.apiService.getStore(this.modelId),
                })
                .subscribe(({ store }) => {
                    this.storeFormGroup = this.initFormGroup(new Store(store), this.storeSaveBodyName);
                });
            }else{
                this.storeFormGroup = this.initFormGroup(new Store({id: 0}), this.storeSaveBodyName);
            }
        });
    }

    override onBeforeSave(): void {
        let saveBody: StoreSaveBody = new StoreSaveBody();

        saveBody.storeDTO = this.storeFormGroup.getRawValue();

        this.saveBody = saveBody;
    }
}
