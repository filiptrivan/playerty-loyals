import { SpiderFormGroup } from './../../../../core/components/spider-form-control/spider-form-control';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslateClassNamesService } from 'src/app/business/services/translates/merge-class-names';
import { ValidatorService } from 'src/app/business/services/validators/validation-rules';
import { BaseFormCopy } from 'src/app/core/components/base-form/base-form copy';
import { BaseFormService } from 'src/app/core/services/base-form.service';
import { SpiderMessageService } from 'src/app/core/services/spider-message.service';
import { Segmentation } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'segmentation-details',
    templateUrl: './segmentation-details.component.html',
    styles: [],
})
export class SegmentationDetailsComponent extends BaseFormCopy implements OnInit {
    segmentationFormGroup = new SpiderFormGroup<Segmentation>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {

    }

    override onBeforeSave = (): void => {

    }
}
