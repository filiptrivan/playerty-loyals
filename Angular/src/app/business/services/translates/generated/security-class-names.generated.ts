export function getTranslatedClassNameSecurity(name: string): string
{
    switch(name) 
    {
        case 'ExternalProvider':
            return $localize`:@@ExternalProvider:ExternalProvider`;
        case 'RefreshTokenRequest':
            return $localize`:@@RefreshTokenRequest:RefreshTokenRequest`;
        case 'VerificationTokenRequest':
            return $localize`:@@VerificationTokenRequest:VerificationTokenRequest`;
        case 'User':
            return $localize`:@@User:User`;
        case 'Permission':
            return $localize`:@@Permission:Permission`;
        case 'Role':
            return $localize`:@@Role:Role`;
        case 'RefreshToken':
            return $localize`:@@RefreshToken:RefreshToken`;
        case 'ForgotPasswordVerificationToken':
            return $localize`:@@ForgotPasswordVerificationToken:ForgotPasswordVerificationToken`;
        case 'RegistrationVerificationResult':
            return $localize`:@@RegistrationVerificationResult:RegistrationVerificationResult`;
        case 'RegistrationVerificationToken':
            return $localize`:@@RegistrationVerificationToken:RegistrationVerificationToken`;
        case 'Registration':
            return $localize`:@@Registration:Registration`;
        case 'Login':
            return $localize`:@@Login:Login`;
        case 'LoginVerificationToken':
            return $localize`:@@LoginVerificationToken:LoginVerificationToken`;
        case 'ForgotPassword':
            return $localize`:@@ForgotPassword:ForgotPassword`;
        case 'LoginResult':
            return $localize`:@@LoginResult:LoginResult`;
        case 'JwtAuthResult':
            return $localize`:@@JwtAuthResult:JwtAuthResult`;
        case 'Notification':
            return $localize`:@@Notification:Notification`;
        default:
            return null;
    }
}

