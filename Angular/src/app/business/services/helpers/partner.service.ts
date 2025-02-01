// import { Injectable } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from '../api/api.service';
// import { BehaviorSubject, firstValueFrom, map, Observable, Subscription } from 'rxjs';
// import { AuthService } from 'src/app/business/services/auth/auth.service';
// import { Partner, PartnerUser } from '../../entities/business-entities.generated';
// import { ConfigService } from '../config.service';
// import { adjustColor } from '@playerty/spider';

// @Injectable({
//   providedIn: 'root' // FT: Ensures the service is available application-wide
// })
// export class PartnerService {
//   private userSubscription: Subscription | null = null;

//   private _partner = new BehaviorSubject<Partner | undefined>(undefined);
//   partner$ = this._partner.asObservable();

//   private _currentPartnerUser = new BehaviorSubject<PartnerUser | undefined>(undefined);
//   currentPartnerUser$ = this._currentPartnerUser.asObservable();
   
//   constructor(
//     private apiService: ApiService,
//     private route: ActivatedRoute,
//     private authService: AuthService,
//     private config: ConfigService
//   ) {
//   }



//   ngOnDestroy(): void {
//     if (this.userSubscription) {
//       this.userSubscription.unsubscribe();
//     }
//   }
// }