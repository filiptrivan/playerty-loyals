import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesSecurityService {

    constructor(
    private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'ForgotPassword':
                return this.translocoService.translate('ForgotPassword');
            case 'ForgotPasswordVerificationToken':
                return this.translocoService.translate('ForgotPasswordVerificationToken');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'LoginResult':
                return this.translocoService.translate('LoginResult');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'RefreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'RefreshTokenRequest':
                return this.translocoService.translate('RefreshTokenRequest');
            case 'Registration':
                return this.translocoService.translate('Registration');
            case 'RegistrationVerificationResult':
                return this.translocoService.translate('RegistrationVerificationResult');
            case 'RegistrationVerificationToken':
                return this.translocoService.translate('RegistrationVerificationToken');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            case 'Permission':
                return this.translocoService.translate('Permission');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'RoleUser':
                return this.translocoService.translate('RoleUser');
            default:
                return null;
        }
    }
}

