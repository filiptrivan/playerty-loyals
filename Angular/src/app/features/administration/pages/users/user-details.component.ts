import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { UserExtended } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderMessageService, BaseFormService, IsAuthorizedForSaveEvent } from '@playerty/spider';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styles: [],
})
export class UserDetailsComponent extends BaseFormCopy implements OnInit {
    userExtendedFormGroup = new SpiderFormGroup<UserExtended>({});
    
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
        return this.authService.user$.pipe(
            map((currentUser) => {
                if (currentUser) {
                    const isCurrentUserPage = this.isCurrentUserPage(currentUser.id);
                    return isCurrentUserPage;
                }

                return false;
            })
        );
    }

    isCurrentUserPage = (currentUserId: number) => {
        return currentUserId === this.userExtendedFormGroup.getRawValue().id;
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;

        this.userExtendedFormGroup.controls.email.disable();
    }

    override onBeforeSave = (): void => {

    }
}
