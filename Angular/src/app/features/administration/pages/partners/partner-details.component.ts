import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { Partner } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderMessageService, BaseFormService } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { BusinessPermissionCodes } from 'src/app/business/enums/business-enums.generated';

@Component({
    selector: 'partner-details',
    templateUrl: './partner-details.component.html',
    styles: [],
})
export class PartnerDetailsComponent extends BaseFormCopy implements OnInit {
    partnerFormGroup = new SpiderFormGroup<Partner>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private authService: AuthService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    authorizedForSaveObservable = (): Observable<boolean> => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authService.partner$]).pipe(
            map(([currentUserPermissionCodes, partner]) => {
                if (currentUserPermissionCodes != null && partner != null) {
                    const isCurrentPartnerPage = this.isCurrentPartnerPage(partner.id);
                    return isCurrentPartnerPage && currentUserPermissionCodes.includes(BusinessPermissionCodes.UpdateCurrentPartner);
                }

                return false;
            })
        );
    }

    isCurrentPartnerPage = (currentPartnerId: number) => {
        return currentPartnerId === this.partnerFormGroup.getRawValue().id;
    }

    override onAfterSave = async () => {
        if ((await firstValueFrom(this.authService.partner$))?.id == this.partnerFormGroup.controls.id.getRawValue()) {
            this.authService.setCurrentPartner(this.partnerFormGroup.getRawValue()); // FT: Not doing this because maybe the administrator is saving it.
        }
    }
}
