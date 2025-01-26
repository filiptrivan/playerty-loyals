import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ConfigBaseService } from '@playerty/spider';

@Injectable({
  providedIn: 'root',
})
export class ConfigService extends ConfigBaseService
{
    override production: boolean = environment.production;
    override apiUrl: string = environment.apiUrl;
    override frontendUrl: string = environment.frontendUrl;
    override googleClientId: string = environment.googleClientId;
    override companyName: string = environment.companyName;

    /* URLs */
    partnerSelectSlug: string = 'partner-select';
    administrationSlug: string = 'administration';
    partnerAdministrationSlug: string = 'partner-administration';

    /* Local storage */
    partnerSlugKey: string = 'partner_slug';

    /* Query params */
    partnerParamKey: string = 'partner';

    constructor(
    ) {
        super();
    }
}