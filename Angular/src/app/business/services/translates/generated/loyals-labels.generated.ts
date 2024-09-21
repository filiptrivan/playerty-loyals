export function getTranslatedLabelLoyals(name: string): string
{
    switch(name) 
    {
        case 'name':
            return $localize`:@@Name:Name`;
        case 'code':
            return $localize`:@@Code:Code`;
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'id':
            return $localize`:@@Id:Id`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'email':
            return $localize`:@@Email:Email`;
        case 'password':
            return $localize`:@@Password:Password`;
        case 'hasLoggedInWithExternalProvider':
            return $localize`:@@HasLoggedInWithExternalProvider:HasLoggedInWithExternalProvider`;
        case 'numberOfFailedAttemptsInARow':
            return $localize`:@@NumberOfFailedAttemptsInARow:NumberOfFailedAttemptsInARow`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'tier':
            return $localize`:@@Tier:Tier`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'selectedRoleIds':
            return $localize`:@@SelectedRoleIds:SelectedRoleIds`;
        default:
            return null;
    }
}

