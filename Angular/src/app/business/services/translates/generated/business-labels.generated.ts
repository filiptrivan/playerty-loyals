import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateLabelsBusinessService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    translate(name: string): string
    {
        switch(name) 
        {
            case 'partnerNotifications':
                return this.translocoService.translate('PartnerNotifications');
            case 'partnerUsers':
                return this.translocoService.translate('PartnerUsers');
            case 'isMarkedAsRead':
                return this.translocoService.translate('IsMarkedAsRead');
            case 'partner':
                return this.translocoService.translate('Partner');
            case 'title':
                return this.translocoService.translate('Title');
            case 'description':
                return this.translocoService.translate('Description');
            case 'emailBody':
                return this.translocoService.translate('EmailBody');
            case 'version':
                return this.translocoService.translate('Version');
            case 'id':
                return this.translocoService.translate('Id');
            case 'createdAt':
                return this.translocoService.translate('CreatedAt');
            case 'modifiedAt':
                return this.translocoService.translate('ModifiedAt');
            case 'storeTiers':
                return this.translocoService.translate('StoreTiers');
            case 'discountCategories':
                return this.translocoService.translate('DiscountCategories');
            case 'discount':
                return this.translocoService.translate('Discount');
            case 'name':
                return this.translocoService.translate('Name');
            case 'code':
                return this.translocoService.translate('Code');
            case 'price':
                return this.translocoService.translate('Price');
            case 'category':
                return this.translocoService.translate('Category');
            case 'linkToWebsite':
                return this.translocoService.translate('LinkToWebsite');
            case 'points':
                return this.translocoService.translate('Points');
            case 'user':
                return this.translocoService.translate('User');
            case 'tier':
                return this.translocoService.translate('Tier');
            case 'checkedSegmentationItems':
                return this.translocoService.translate('CheckedSegmentationItems');
            case 'product':
                return this.translocoService.translate('Product');
            case 'transaction':
                return this.translocoService.translate('Transaction');
            case 'checked':
                return this.translocoService.translate('Checked');
            case 'email':
                return this.translocoService.translate('Email');
            case 'password':
                return this.translocoService.translate('Password');
            case 'hasLoggedInWithExternalProvider':
                return this.translocoService.translate('HasLoggedInWithExternalProvider');
            case 'numberOfFailedAttemptsInARow':
                return this.translocoService.translate('NumberOfFailedAttemptsInARow');
            case 'birthDate':
                return this.translocoService.translate('BirthDate');
            case 'gender':
                return this.translocoService.translate('Gender');
            case 'storeDTO':
                return this.translocoService.translate('StoreDTO');
            case 'userExtendedDTO':
                return this.translocoService.translate('UserExtendedDTO');
            case 'selectedRoleIds':
                return this.translocoService.translate('SelectedRoleIds');
            case 'partnerUserDTO':
                return this.translocoService.translate('PartnerUserDTO');
            case 'selectedPartnerRoleIds':
                return this.translocoService.translate('SelectedPartnerRoleIds');
            case 'selectedSegmentationItemIds':
                return this.translocoService.translate('SelectedSegmentationItemIds');
            case 'selectedForStore':
                return this.translocoService.translate('SelectedForStore');
            case 'partnerNotificationDTO':
                return this.translocoService.translate('PartnerNotificationDTO');
            case 'tableFilter':
                return this.translocoService.translate('TableFilter');
            case 'selectedIds':
                return this.translocoService.translate('SelectedIds');
            case 'unselectedIds':
                return this.translocoService.translate('UnselectedIds');
            case 'isAllSelected':
                return this.translocoService.translate('IsAllSelected');
            case 'partnerRoleDTO':
                return this.translocoService.translate('PartnerRoleDTO');
            case 'selectedPermissionIds':
                return this.translocoService.translate('SelectedPermissionIds');
            case 'selectedPartnerUserIds':
                return this.translocoService.translate('SelectedPartnerUserIds');
            case 'orderNumber':
                return this.translocoService.translate('OrderNumber');
            case 'segmentation':
                return this.translocoService.translate('Segmentation');
            case 'tierDTOList':
                return this.translocoService.translate('TierDTOList');
            case 'storeTierDTOList':
                return this.translocoService.translate('StoreTierDTOList');
            case 'notifications':
                return this.translocoService.translate('Notifications');
            case 'users':
                return this.translocoService.translate('Users');
            case 'updatePointsInterval':
                return this.translocoService.translate('UpdatePointsInterval');
            case 'loadPurchasesEndpoint':
                return this.translocoService.translate('LoadPurchasesEndpoint');
            case 'loadReversalsEndpoint':
                return this.translocoService.translate('LoadReversalsEndpoint');
            case 'createUserEndpoint':
                return this.translocoService.translate('CreateUserEndpoint');
            case 'updateUserGroupEndpoint':
                return this.translocoService.translate('UpdateUserGroupEndpoint');
            case 'store':
                return this.translocoService.translate('Store');
            case 'nameLatin':
                return this.translocoService.translate('NameLatin');
            case 'pointsMultiplier':
                return this.translocoService.translate('PointsMultiplier');
            case 'transactionCode':
                return this.translocoService.translate('TransactionCode');
            case 'segmentationDTO':
                return this.translocoService.translate('SegmentationDTO');
            case 'segmentationItemsDTO':
                return this.translocoService.translate('SegmentationItemsDTO');
            case 'validFrom':
                return this.translocoService.translate('ValidFrom');
            case 'validTo':
                return this.translocoService.translate('ValidTo');
            case 'guid':
                return this.translocoService.translate('Guid');
            case 'pointsForTheFirstTimeFill':
                return this.translocoService.translate('PointsForTheFirstTimeFill');
            case 'notificationDTO':
                return this.translocoService.translate('NotificationDTO');
            case 'slug':
                return this.translocoService.translate('Slug');
            case 'logoImageData':
                return this.translocoService.translate('LogoImageData');
            case 'logoImage':
                return this.translocoService.translate('LogoImage');
            case 'primaryColor':
                return this.translocoService.translate('PrimaryColor');
            case 'productsRecommendationEndpoint':
                return this.translocoService.translate('ProductsRecommendationEndpoint');
            default:
                return null;
        }
    }
}

