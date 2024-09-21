export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'id':
            return $localize`:@@Id:Id`;
        case 'name':
            return $localize`:@@Name:Name`;
        case 'code':
            return $localize`:@@Code:Code`;
        case 'price':
            return $localize`:@@Price:Price`;
        case 'brand':
            return $localize`:@@Brand:Brand`;
        case 'nameLatin':
            return $localize`:@@NameLatin:NameLatin`;
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'product':
            return $localize`:@@Product:Product`;
        case 'transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
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
        case 'version':
            return $localize`:@@Version:Version`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'user':
            return $localize`:@@User:User`;
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
        case 'transactionCode':
            return $localize`:@@TransactionCode:TransactionCode`;
        default:
            return null;
    }
}

