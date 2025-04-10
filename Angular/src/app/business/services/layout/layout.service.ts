import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { ConfigService } from '../config.service';
import { getPrimengAutocompleteCodebookOptions, InitTopBarData, LayoutBaseService, PrimengOption, User } from '@playerty/spider';
import { combineLatest, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LayoutService extends LayoutBaseService implements OnDestroy {

    constructor(
        protected override apiService: ApiService,
        protected override config: ConfigService,
        protected override authService: AuthService,
        private router: Router
    ) {
        super(apiService, config, authService);

        this.initUnreadNotificationsCountForCurrentUser();
    }

    //#region Top Bar

    override initTopBarData = () => {
        return combineLatest([this.authService.user$, this.authService.currentPartnerUser$, this.authService.partner$, this.unreadNotificationsCount$]).pipe(
            map(([currentUser, currentPartnerUser, currentPartner, unreadNotificationsCount]) => {
                return new InitTopBarData({
                    companyName: currentPartner?.name ?? this.config.companyName,
                    userProfilePath: currentPartnerUser ? `/partner-administration/users/${currentPartnerUser.id}` : `/administration/users/${currentUser?.id}`,
                    unreadNotificationsCount: unreadNotificationsCount,
                    showProfileIcon: true,
                    currentUser: currentUser,
                });
            })
        )
    }

    override initUnreadNotificationsCountForCurrentUserObservable = () => {
        return this.authService.currentPartnerUser$;
    }

    //#endregion

    //#region Side Bar

    override searchPartners = (event: AutoCompleteCompleteEvent) => {
        return getPrimengAutocompleteCodebookOptions(this.apiService.getPartnerWithSlugAutocompleteList, 50, event.query).pipe(
            map(po => po)
        );
    }

    override partnersAutocompleteButtonClick = async (selectedPartner: PrimengOption) => {
        if (selectedPartner.value) {
            this.router.navigate(['/'], { queryParams: { [this.config.partnerParamKey]: selectedPartner.value } });
        }
    }

    //#endregion
    
}
