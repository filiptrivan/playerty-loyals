import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesGeneratedService {

    constructor(
    private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'Login':
                return this.translocoService.translate('Login');
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
            case 'PermissionSaveBody':
                return this.translocoService.translate('PermissionSaveBody');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'BusinessObject':
                return this.translocoService.translate('BusinessObject');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'ReadonlyObject':
                return this.translocoService.translate('ReadonlyObject');
            case 'SimpleSaveResult':
                return this.translocoService.translate('SimpleSaveResult');
            case 'TableFilterContext':
                return this.translocoService.translate('TableFilterContext');
            case 'TableFilter':
                return this.translocoService.translate('TableFilter');
            case 'TableFilterSortMeta':
                return this.translocoService.translate('TableFilterSortMeta');
            case 'TableResponse':
                return this.translocoService.translate('TableResponse');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            default:
                return null;
        }
    }
}

