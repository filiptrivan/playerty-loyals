export function getTranslatedLabelBusiness(name: string): string
{
    switch(name) 
    {
        case 'selectedUserIds':
            return $localize`:@@SelectedUserIds:SelectedUserIds`;
        case 'notificationDTO':
            return $localize`:@@NotificationDTO:NotificationDTO`;
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
        case 'title':
            return $localize`:@@Title:Title`;
        case 'titleLatin':
            return $localize`:@@TitleLatin:TitleLatin`;
        case 'description':
            return $localize`:@@Description:Description`;
        case 'descriptionLatin':
            return $localize`:@@DescriptionLatin:DescriptionLatin`;
        case 'version':
            return $localize`:@@Version:Version`;
        case 'createdAt':
            return $localize`:@@CreatedAt:CreatedAt`;
        case 'modifiedAt':
            return $localize`:@@ModifiedAt:ModifiedAt`;
        case 'discount':
            return $localize`:@@Discount:Discount`;
        case 'validFrom':
            return $localize`:@@ValidFrom:ValidFrom`;
        case 'validTo':
            return $localize`:@@ValidTo:ValidTo`;
        case 'guid':
            return $localize`:@@Guid:Guid`;
        case 'points':
            return $localize`:@@Points:Points`;
        case 'user':
            return $localize`:@@User:User`;
        case 'product':
            return $localize`:@@Product:Product`;
        case 'transaction':
            return $localize`:@@Transaction:Transaction`;
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
        case 'transactionCode':
            return $localize`:@@TransactionCode:TransactionCode`;
        default:
            return null;
    }
}

