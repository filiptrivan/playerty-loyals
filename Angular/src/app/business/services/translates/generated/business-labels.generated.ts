export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'name':
            return $localize`:@@Name:Name`;
        case 'nameLatin':
            return $localize`:@@NameLatin:NameLatin`;
        case 'code':
            return $localize`:@@Code:Code`;
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'transactionCode':
            return $localize`:@@TransactionCode:TransactionCode`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'id':
            return $localize`:@@Id:Id`;
        case 'price':
            return $localize`:@@Price:Price`;
        case 'brand':
            return $localize`:@@Brand:Brand`;
        case 'email':
            return $localize`:@@Email:Email`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'isMarkedAsRead':
            return $localize`:@@IsMarkedAsRead:IsMarkedAsRead`;
        case 'notifications':
            return $localize`:@@Notifications:Notifications`;
        case 'partnerUsers':
            return $localize`:@@PartnerUsers:PartnerUsers`;
        case 'slug':
            return $localize`:@@Slug:Slug`;
        case 'loadPurchasesEndpoint':
            return $localize`:@@LoadPurchasesEndpoint:LoadPurchasesEndpoint`;
        case 'loadReversalsEndpoint':
            return $localize`:@@LoadReversalsEndpoint:LoadReversalsEndpoint`;
        case 'updatePointsInterval':
            return $localize`:@@UpdatePointsInterval:UpdatePointsInterval`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'partner':
            return $localize`:@@Partner:Partner`;
        case 'user':
            return $localize`:@@User:User`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'tier':
            return $localize`:@@Tier:Tier`;
        case 'roles':
            return $localize`:@@Roles:Roles`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'product':
            return $localize`:@@Product:Product`;
        case 'transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'password':
            return $localize`:@@Password:Password`;
        case 'hasLoggedInWithExternalProvider':
            return $localize`:@@HasLoggedInWithExternalProvider:HasLoggedInWithExternalProvider`;
        case 'numberOfFailedAttemptsInARow':
            return $localize`:@@NumberOfFailedAttemptsInARow:NumberOfFailedAttemptsInARow`;
        default:
            return null;
    }
}

