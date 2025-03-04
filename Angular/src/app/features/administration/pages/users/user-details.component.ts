import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { UserExtended } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderMessageService, BaseFormService, IsAuthorizedForSaveEvent } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { combineLatest, map, Observable } from 'rxjs';
import { BusinessPermissionCodes } from 'src/app/business/enums/business-enums.generated';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styles: [],
})
export class UserDetailsComponent extends BaseFormCopy implements OnInit {
    userExtendedFormGroup = new SpiderFormGroup<UserExtended>({});

    showIsDisabledControl: boolean = false;
    showHasLoggedInWithExternalProvider: boolean = false;
    // showAccessedTheSystem: boolean = false;
    
    isAuthorizedForSave: boolean = false;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private authService: AuthService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
         
    override ngOnInit() {
        
    }

    authorizedForSaveObservable = (): Observable<boolean> => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authService.user$]).pipe(
            map(([currentUserPermissionCodes, currentUser]) => {
                if (currentUserPermissionCodes != null && currentUser != null) {
                    const IsDisabledAndExternalLoggedInControls = this.showIsDisabledAndExternalLoggedInControlsForPermissions(currentUserPermissionCodes);
                    this.showIsDisabledControl = IsDisabledAndExternalLoggedInControls;
                    this.showHasLoggedInWithExternalProvider = IsDisabledAndExternalLoggedInControls;
                    // this.showAccessedTheSystem = IsDisabledAndExternalLoggedInControls;
                    return this.isCurrentUserPage(currentUser.id);
                }

                return false;
            })
        );
    }

    showIsDisabledAndExternalLoggedInControlsForPermissions = (currentUserPermissionCodes: string[]) => {
        return currentUserPermissionCodes.includes(BusinessPermissionCodes.ReadUserExtended) ||
               currentUserPermissionCodes.includes(BusinessPermissionCodes.UpdateUserExtended);
    }

    isCurrentUserPage = (currentUserId: number) => {
        return currentUserId === this.userExtendedFormGroup.getRawValue().id;
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;

        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.disable();
        // this.userExtendedFormGroup.controls.accessedTheSystem.disable();
    }

    override onBeforeSave = (): void => {

    }
}
