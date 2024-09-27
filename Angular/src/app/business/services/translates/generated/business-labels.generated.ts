export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'product':
            return $localize`:@@Product:Product`;
        case 'transaction':
            return $localize`:@@Transaction:Transaction`;
        case 'id':
            return $localize`:@@Id:Id`;
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
        case 'tier':
            return $localize`:@@Tier:Tier`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'userExtendedDTO':
            return $localize`:@@UserExtendedDTO:UserExtendedDTO`;
        case 'name':
            return $localize`:@@Name:Name`;
        case 'nameLatin':
            return $localize`:@@NameLatin:NameLatin`;
        case 'code':
            return $localize`:@@Code:Code`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'price':
            return $localize`:@@Price:Price`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'user':
            return $localize`:@@User:User`;
        case 'transactionCode':
            return $localize`:@@TransactionCode:TransactionCode`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'pointsMultiplier':
            return $localize`:@@PointsMultiplier:PointsMultiplier`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'brand':
            return $localize`:@@Brand:Brand`;
        case 'url':
            return $localize`:@@Url:Url`;
        case 'loadPurchasesEndpoint':
            return $localize`:@@LoadPurchasesEndpoint:LoadPurchasesEndpoint`;
        case 'loadReversalsEndpoint':
            return $localize`:@@LoadReversalsEndpoint:LoadReversalsEndpoint`;
        case 'updatePointsInterval':
            return $localize`:@@UpdatePointsInterval:UpdatePointsInterval`;
        case 'partners':
            return $localize`:@@Partners:Partners`;
        case 'users':
            return $localize`:@@Users:Users`;
        default:
            return null;
    }
}

