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
            case 'name':
                return this.translocoService.translate('Name');
            case 'id':
                return this.translocoService.translate('Id');
            case 'segmentationDTO':
                return this.translocoService.translate('SegmentationDTO');
            case 'segmentationItemsDTO':
                return this.translocoService.translate('SegmentationItemsDTO');
            case 'code':
                return this.translocoService.translate('Code');
            case 'description':
                return this.translocoService.translate('Description');
            case 'pointsForTheFirstTimeFill':
                return this.translocoService.translate('PointsForTheFirstTimeFill');
            case 'partner':
                return this.translocoService.translate('Partner');
            case 'version':
                return this.translocoService.translate('Version');
            case 'createdAt':
                return this.translocoService.translate('CreatedAt');
            case 'modifiedAt':
                return this.translocoService.translate('ModifiedAt');
            case 'storeTier':
                return this.translocoService.translate('StoreTier');
            case 'discountCategory':
                return this.translocoService.translate('DiscountCategory');
            case 'discount':
                return this.translocoService.translate('Discount');
            case 'email':
                return this.translocoService.translate('Email');
            case 'transactionCode':
                return this.translocoService.translate('TransactionCode');
            case 'partnerNotificationDTO':
                return this.translocoService.translate('PartnerNotificationDTO');
            case 'isMarkedAsRead':
                return this.translocoService.translate('IsMarkedAsRead');
            case 'tableFilter':
                return this.translocoService.translate('TableFilter');
            case 'selectedIds':
                return this.translocoService.translate('SelectedIds');
            case 'unselectedIds':
                return this.translocoService.translate('UnselectedIds');
            case 'isAllSelected':
                return this.translocoService.translate('IsAllSelected');
            case 'updatePointsInterval':
                return this.translocoService.translate('UpdatePointsInterval');
            case 'updatePointsStartDate':
                return this.translocoService.translate('UpdatePointsStartDate');
            case 'getTransactionsEndpoint':
                return this.translocoService.translate('GetTransactionsEndpoint');
            case 'getDiscountCategoriesEndpoint':
                return this.translocoService.translate('GetDiscountCategoriesEndpoint');
            case 'createUserEndpoint':
                return this.translocoService.translate('CreateUserEndpoint');
            case 'updateUserGroupEndpoint':
                return this.translocoService.translate('UpdateUserGroupEndpoint');
            case 'updatePointsScheduledTaskIsPaused':
                return this.translocoService.translate('UpdatePointsScheduledTaskIsPaused');
            case 'validFrom':
                return this.translocoService.translate('ValidFrom');
            case 'validTo':
                return this.translocoService.translate('ValidTo');
            case 'tierClientIndex':
                return this.translocoService.translate('TierClientIndex');
            case 'title':
                return this.translocoService.translate('Title');
            case 'emailBody':
                return this.translocoService.translate('EmailBody');
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
            case 'points':
                return this.translocoService.translate('Points');
            case 'user':
                return this.translocoService.translate('User');
            case 'tier':
                return this.translocoService.translate('Tier');
            case 'checkedSegmentationItems':
                return this.translocoService.translate('CheckedSegmentationItems');
            case 'price':
                return this.translocoService.translate('Price');
            case 'category':
                return this.translocoService.translate('Category');
            case 'linkToWebsite':
                return this.translocoService.translate('LinkToWebsite');
            case 'store':
                return this.translocoService.translate('Store');
            case 'checked':
                return this.translocoService.translate('Checked');
            case 'notificationDTO':
                return this.translocoService.translate('NotificationDTO');
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
            case 'storeTierClientIndex':
                return this.translocoService.translate('StoreTierClientIndex');
            case 'storeVersion':
                return this.translocoService.translate('StoreVersion');
            case 'orderNumber':
                return this.translocoService.translate('OrderNumber');
            case 'userEmail':
                return this.translocoService.translate('UserEmail');
            case 'productName':
                return this.translocoService.translate('ProductName');
            case 'productImageUrl':
                return this.translocoService.translate('ProductImageUrl');
            case 'productCategoryName':
                return this.translocoService.translate('ProductCategoryName');
            case 'productCategoryImageUrl':
                return this.translocoService.translate('ProductCategoryImageUrl');
            case 'boughtAt':
                return this.translocoService.translate('BoughtAt');
            case 'tierDTOList':
                return this.translocoService.translate('TierDTOList');
            case 'storeTierDTOList':
                return this.translocoService.translate('StoreTierDTOList');
            case 'storeTierDiscountCategoryDTOList':
                return this.translocoService.translate('StoreTierDiscountCategoryDTOList');
            case 'partnerUser':
                return this.translocoService.translate('PartnerUser');
            case 'partnerNotifications':
                return this.translocoService.translate('PartnerNotifications');
            case 'partnerUsers':
                return this.translocoService.translate('PartnerUsers');
            case 'transactionsFrom':
                return this.translocoService.translate('TransactionsFrom');
            case 'transactionsTo':
                return this.translocoService.translate('TransactionsTo');
            case 'isManual':
                return this.translocoService.translate('IsManual');
            case 'notifications':
                return this.translocoService.translate('Notifications');
            case 'users':
                return this.translocoService.translate('Users');
            case 'storeDTO':
                return this.translocoService.translate('StoreDTO');
            case 'fromDate':
                return this.translocoService.translate('FromDate');
            case 'toDate':
                return this.translocoService.translate('ToDate');
            case 'segmentation':
                return this.translocoService.translate('Segmentation');
            case 'partnerRoleDTO':
                return this.translocoService.translate('PartnerRoleDTO');
            case 'selectedPermissionIds':
                return this.translocoService.translate('SelectedPermissionIds');
            case 'selectedPartnerUserIds':
                return this.translocoService.translate('SelectedPartnerUserIds');
            case 'nameLatin':
                return this.translocoService.translate('NameLatin');
            case 'pointsMultiplier':
                return this.translocoService.translate('PointsMultiplier');
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

