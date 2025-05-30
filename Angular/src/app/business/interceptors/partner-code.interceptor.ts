import { inject } from '@angular/core';
import {
    HttpInterceptorFn,
} from '@angular/common/http';
import { ConfigService } from '../services/config.service';

export const partnerCodeInterceptor: HttpInterceptorFn = (req, next) => {
    const config = inject(ConfigService);

    const partnerSlug = localStorage.getItem(config.partnerSlugKey); // Use it for the code also

    if (partnerSlug) {
        req = req.clone({
            setHeaders: { 'Partner-Code': partnerSlug },
        });
    }

    return next(req);
};
