export function getTranslatedLabelBusines(name: string): string
{
    switch(name) 
    {
        case 'name':
            return $localize`:@@Name:Name`;
        case 'nameLatin':
            return $localize`:@@NameLatin:NameLatin`;
        case 'code':
            return $localize`:@@Code:Code`;
        case 'id':
            return $localize`:@@Id:Id`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'price':
            return $localize`:@@Price:Price`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'email':
            return $localize`:@@Email:Email`;
        case 'password':
            return $localize`:@@Password:Password`;
        case 'hasLoggedInWithExternalProvider':
            return $localize`:@@HasLoggedInWithExternalProvider:HasLoggedInWithExternalProvider`;
        case 'numberOfFailedAttemptsInARow':
            return $localize`:@@NumberOfFailedAttemptsInARow:NumberOfFailedAttemptsInARow`;
        case 'tier':
            return $localize`:@@Tier:Tier`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'selectedRoleIds':
            return $localize`:@@SelectedRoleIds:SelectedRoleIds`;
        default:
            return null;
    }
}

