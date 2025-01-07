import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { Partner, Product } from '../../entities/business-entities.generated';
import { SoftControlsModule } from 'src/app/core/controls/soft-controls.module';
import { getControl } from 'src/app/core/services/helper-functions';
import { SoftFormGroup } from 'src/app/core/components/soft-form-control/soft-form-control';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'partner-base-details',
    template:`
<ng-container *transloco="let t">
    <soft-panel>
        <panel-header></panel-header>
        
        <panel-body>
            <form [formGroup]="formGroup" class="grid">
                <div class="col-12">
                    <soft-file [control]="control('logoImage', partnerFormGroup)" [fileData]="partnerFormGroup.controls.logoImageData.getRawValue()" [objectId]="partnerFormGroup.controls.id.getRawValue()"></soft-file>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('name', partnerFormGroup)"></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('slug', partnerFormGroup)"></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('email', partnerFormGroup)"></soft-textbox>
                </div>
                <div class="col-12 md:col-6">
                    <soft-colorpick [control]="control('primaryColor', partnerFormGroup)"></soft-colorpick>
                </div>
                <div class="col-12 md:col-6">
                    <soft-number [control]="control('pointsMultiplier', partnerFormGroup)" [decimal]="true" [maxFractionDigits]="2"></soft-number>
                </div>
                <div class="col-12 md:col-6">
                    <soft-textbox [control]="control('productsRecommendationEndpoint', partnerFormGroup)"></soft-textbox>
                </div>
            </form>
        </panel-body>
        
        <panel-footer>
            <p-button (onClick)="onSave()" [label]="t('Save')" icon="pi pi-save"></p-button>
            <soft-return-button></soft-return-button>
        </panel-footer>
    </soft-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftControlsModule,
    TranslocoDirective,
]
})
export class ProductsRecommendationComponent {
    @Input() formGroup: FormGroup;
    @Input() partnerFormGroup: SoftFormGroup<Partner>;
    @Input() onSave: (reroute?: boolean) => void; 

    constructor(
        private apiService: ApiService
        ) {

        }

    ngOnInit(){

    }

    control(formControlName: keyof Partner, formGroup: SoftFormGroup){
        return getControl<Partner>(formControlName, formGroup);
    }

}