export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'name':
            return $localize`:@@Name:Name`;
        case 'nameLatin':
            return $localize`:@@NameLatin:NameLatin`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'id':
            return $localize`:@@Id:Id`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'price':
            return $localize`:@@Price:Price`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'user':
            return $localize`:@@User:User`;
        case 'product':
            return $localize`:@@Product:Product`;
        case 'transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'code':
            return $localize`:@@Code:Code`;
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
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'transactionCode':
            return $localize`:@@TransactionCode:TransactionCode`;
        case 'brand':
            return $localize`:@@Brand:Brand`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'selectedRoleIds':
            return $localize`:@@SelectedRoleIds:SelectedRoleIds`;
        default:
            return null;
    }
}

