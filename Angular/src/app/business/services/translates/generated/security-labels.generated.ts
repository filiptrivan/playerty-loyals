import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateLabelsSecurityService {

    constructor(
    private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'idToken':
                return this.translocoService.translate('IdToken');
            case 'browser':
                return this.translocoService.translate('Browser');
            case 'email':
                return this.translocoService.translate('Email');
            case 'newPassword':
                return this.translocoService.translate('NewPassword');
            case 'user':
                return this.translocoService.translate('User');
            case 'expireAt':
                return this.translocoService.translate('ExpireAt');
            case 'userEmail':
                return this.translocoService.translate('UserEmail');
            case 'accessToken':
                return this.translocoService.translate('AccessToken');
            case 'token':
                return this.translocoService.translate('Token');
            case 'password':
                return this.translocoService.translate('Password');
            case 'refreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'ipAddress':
                return this.translocoService.translate('IpAddress');
            case 'tokenString':
                return this.translocoService.translate('TokenString');
            case 'status':
                return this.translocoService.translate('Status');
            case 'message':
                return this.translocoService.translate('Message');
            case 'selectedPermissionIds':
                return this.translocoService.translate('SelectedPermissionIds');
            case 'selectedUserIds':
                return this.translocoService.translate('SelectedUserIds');
            case 'roleDTO':
                return this.translocoService.translate('RoleDTO');
            case 'verificationCode':
                return this.translocoService.translate('VerificationCode');
            case 'name':
                return this.translocoService.translate('Name');
            case 'nameLatin':
                return this.translocoService.translate('NameLatin');
            case 'description':
                return this.translocoService.translate('Description');
            case 'descriptionLatin':
                return this.translocoService.translate('DescriptionLatin');
            case 'code':
                return this.translocoService.translate('Code');
            case 'id':
                return this.translocoService.translate('Id');
            case 'version':
                return this.translocoService.translate('Version');
            case 'createdAt':
                return this.translocoService.translate('CreatedAt');
            case 'modifiedAt':
                return this.translocoService.translate('ModifiedAt');
            case 'roles':
                return this.translocoService.translate('Roles');
            case 'users':
                return this.translocoService.translate('Users');
            default:
                return null;
        }
    }
}

