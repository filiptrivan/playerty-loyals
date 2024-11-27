import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from '../../../../core/services/helper-functions';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidatorBusinessService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
        switch(formControl.label + className){
        case 'nameDiscountCategory':
            return this.nameDiscountCategoryValidator(formControl);
        case 'codeDiscountCategory':
            return this.codeDiscountCategoryValidator(formControl);
        case 'storeIdDiscountCategory':
            return this.storeIdDiscountCategoryValidator(formControl);

        case 'titleNotification':
            return this.titleNotificationValidator(formControl);
        case 'descriptionNotification':
            return this.descriptionNotificationValidator(formControl);
        case 'emailBodyNotification':
            return this.emailBodyNotificationValidator(formControl);

        case 'pointsPartnerUser':
            return this.pointsPartnerUserValidator(formControl);
        case 'partnerIdPartnerUser':
            return this.partnerIdPartnerUserValidator(formControl);
        case 'userIdPartnerUser':
            return this.userIdPartnerUserValidator(formControl);

        case 'nameSegmentation':
            return this.nameSegmentationValidator(formControl);
        case 'descriptionSegmentation':
            return this.descriptionSegmentationValidator(formControl);
        case 'pointsForTheFirstTimeFillSegmentation':
            return this.pointsForTheFirstTimeFillSegmentationValidator(formControl);
        case 'partnerIdSegmentation':
            return this.partnerIdSegmentationValidator(formControl);

        case 'nameSegmentationItem':
            return this.nameSegmentationItemValidator(formControl);
        case 'orderNumberSegmentationItem':
            return this.orderNumberSegmentationItemValidator(formControl);
        case 'segmentationIdSegmentationItem':
            return this.segmentationIdSegmentationItemValidator(formControl);

        case 'discountStoreTierDiscountCategory':
            return this.discountStoreTierDiscountCategoryValidator(formControl);

        case 'orderNumberStoreTier':
            return this.orderNumberStoreTierValidator(formControl);
        case 'storeIdStoreTier':
            return this.storeIdStoreTierValidator(formControl);
        case 'tierIdStoreTier':
            return this.tierIdStoreTierValidator(formControl);

        case 'emailUserExtended':
            return this.emailUserExtendedValidator(formControl);
        case 'passwordUserExtended':
            return this.passwordUserExtendedValidator(formControl);
        case 'hasLoggedInWithExternalProviderUserExtended':
            return this.hasLoggedInWithExternalProviderUserExtendedValidator(formControl);
        case 'numberOfFailedAttemptsInARowUserExtended':
            return this.numberOfFailedAttemptsInARowUserExtendedValidator(formControl);














        case 'nameGender':
            return this.nameGenderValidator(formControl);


        case 'namePartner':
            return this.namePartnerValidator(formControl);
        case 'slugPartner':
            return this.slugPartnerValidator(formControl);
        case 'logoImagePartner':
            return this.logoImagePartnerValidator(formControl);
        case 'primaryColorPartner':
            return this.primaryColorPartnerValidator(formControl);
        case 'productsRecommendationEndpointPartner':
            return this.productsRecommendationEndpointPartnerValidator(formControl);
        case 'pointsMultiplierPartner':
            return this.pointsMultiplierPartnerValidator(formControl);

        case 'partnerIdPartnerNotification':
            return this.partnerIdPartnerNotificationValidator(formControl);
        case 'titlePartnerNotification':
            return this.titlePartnerNotificationValidator(formControl);
        case 'descriptionPartnerNotification':
            return this.descriptionPartnerNotificationValidator(formControl);
        case 'emailBodyPartnerNotification':
            return this.emailBodyPartnerNotificationValidator(formControl);


        case 'namePartnerPermission':
            return this.namePartnerPermissionValidator(formControl);
        case 'descriptionPartnerPermission':
            return this.descriptionPartnerPermissionValidator(formControl);
        case 'codePartnerPermission':
            return this.codePartnerPermissionValidator(formControl);

        case 'namePartnerRole':
            return this.namePartnerRoleValidator(formControl);
        case 'descriptionPartnerRole':
            return this.descriptionPartnerRoleValidator(formControl);
        case 'partnerIdPartnerRole':
            return this.partnerIdPartnerRoleValidator(formControl);

        case 'nameStore':
            return this.nameStoreValidator(formControl);
        case 'updatePointsIntervalStore':
            return this.updatePointsIntervalStoreValidator(formControl);
        case 'getTransactionsEndpointStore':
            return this.getTransactionsEndpointStoreValidator(formControl);
        case 'getDiscountCategoriesEndpointStore':
            return this.getDiscountCategoriesEndpointStoreValidator(formControl);
        case 'createUserEndpointStore':
            return this.createUserEndpointStoreValidator(formControl);
        case 'updateUserGroupEndpointStore':
            return this.updateUserGroupEndpointStoreValidator(formControl);
        case 'partnerIdStore':
            return this.partnerIdStoreValidator(formControl);

        case 'shouldStartedAtStoreUpdatePointsScheduledTask':
            return this.shouldStartedAtStoreUpdatePointsScheduledTaskValidator(formControl);
        case 'storeIdStoreUpdatePointsScheduledTask':
            return this.storeIdStoreUpdatePointsScheduledTaskValidator(formControl);

        case 'nameTier':
            return this.nameTierValidator(formControl);
        case 'descriptionTier':
            return this.descriptionTierValidator(formControl);
        case 'validFromTier':
            return this.validFromTierValidator(formControl);
        case 'validToTier':
            return this.validToTierValidator(formControl);
        case 'partnerIdTier':
            return this.partnerIdTierValidator(formControl);

        case 'productNameTransaction':
            return this.productNameTransactionValidator(formControl);
        case 'productCategoryNameTransaction':
            return this.productCategoryNameTransactionValidator(formControl);
        case 'priceTransaction':
            return this.priceTransactionValidator(formControl);
        case 'pointsTransaction':
            return this.pointsTransactionValidator(formControl);
        case 'partnerUserIdTransaction':
            return this.partnerUserIdTransactionValidator(formControl);

            default:
                return null;
        }
    }


    nameDiscountCategoryValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    codeDiscountCategoryValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    storeIdDiscountCategoryValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const storeIdValid = notEmptyRule;

            return storeIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    titleNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const titleValid = notEmptyRule && stringLengthRule;

            return titleValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = notEmptyRule && stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    emailBodyNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const emailBodyValid = stringLengthRule;

            return emailBodyValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }


    pointsPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const pointsValid = notEmptyRule;

            return pointsValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    partnerIdPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    userIdPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const userIdValid = notEmptyRule;

            return userIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    nameSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    pointsForTheFirstTimeFillSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const pointsForTheFirstTimeFillValid = notEmptyRule && numberMinRangeRule;

            return pointsForTheFirstTimeFillValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    partnerIdSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    nameSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    orderNumberSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    segmentationIdSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const segmentationIdValid = notEmptyRule;

            return segmentationIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    discountStoreTierDiscountCategoryValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const max = 100;
        const numberMaxRangeRule = (value <= max) || (typeof value === 'undefined' || value === null || value === '');
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const discountValid = notEmptyRule && numberMaxRangeRule && numberMinRangeRule;

            return discountValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMaxNumberRangeMin', {max, min}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    orderNumberStoreTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    storeIdStoreTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const storeIdValid = notEmptyRule;

            return storeIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    tierIdStoreTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const tierIdValid = notEmptyRule;

            return tierIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    emailUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    passwordUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 40;
        const max = 80;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const passwordValid = stringLengthRule;

            return passwordValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    hasLoggedInWithExternalProviderUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const hasLoggedInWithExternalProviderValid = notEmptyRule;

            return hasLoggedInWithExternalProviderValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    numberOfFailedAttemptsInARowUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const numberOfFailedAttemptsInARowValid = notEmptyRule;

            return numberOfFailedAttemptsInARowValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }















    nameGenderValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }



    namePartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    slugPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const slugValid = notEmptyRule && stringLengthRule;

            return slugValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    logoImagePartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1024;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const logoImageValid = stringLengthRule;

            return logoImageValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    primaryColorPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const length = 7;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const primaryColorValid = stringSingleLengthRule;

            return primaryColorValid ? null : { _ : this.translocoService.translate('SingleLength', {length}) };
        };
        
        return validator;
    }

    productsRecommendationEndpointPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productsRecommendationEndpointValid = stringLengthRule;

            return productsRecommendationEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    pointsMultiplierPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const precision = 10;
        const scale = 2;
        const ignoreTrailingZeros = false;
        const precisionScaleRule = validatePrecisionScale(value, precision, scale, ignoreTrailingZeros) || (typeof value === 'undefined' || value === null || value === '');

            const pointsMultiplierValid = notEmptyRule && precisionScaleRule;

            return pointsMultiplierValid ? null : { _ : this.translocoService.translate('NotEmptyPrecisionScale', {precision, scale}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    partnerIdPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    titlePartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const titleValid = notEmptyRule && stringLengthRule;

            return titleValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = notEmptyRule && stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    emailBodyPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const emailBodyValid = stringLengthRule;

            return emailBodyValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }



    namePartnerPermissionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionPartnerPermissionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    codePartnerPermissionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    namePartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    partnerIdPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    nameStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    updatePointsIntervalStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const updatePointsIntervalValid = numberMinRangeRule;

            return updatePointsIntervalValid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };
        
        return validator;
    }

    getTransactionsEndpointStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const getTransactionsEndpointValid = stringLengthRule;

            return getTransactionsEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    getDiscountCategoriesEndpointStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const getDiscountCategoriesEndpointValid = stringLengthRule;

            return getDiscountCategoriesEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    createUserEndpointStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const createUserEndpointValid = stringLengthRule;

            return createUserEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    updateUserGroupEndpointStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const updateUserGroupEndpointValid = stringLengthRule;

            return updateUserGroupEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    partnerIdStoreValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    shouldStartedAtStoreUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const shouldStartedAtValid = notEmptyRule;

            return shouldStartedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    storeIdStoreUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const storeIdValid = notEmptyRule;

            return storeIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    nameTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    validFromTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const validFromValid = notEmptyRule && numberMinRangeRule;

            return validFromValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    validToTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const validToValid = notEmptyRule && numberMinRangeRule;

            return validToValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    partnerIdTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    productNameTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productNameValid = notEmptyRule && stringLengthRule;

            return productNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    productCategoryNameTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryNameValid = notEmptyRule && stringLengthRule;

            return productCategoryNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    priceTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const precision = 16;
        const scale = 2;
        const ignoreTrailingZeros = false;
        const precisionScaleRule = validatePrecisionScale(value, precision, scale, ignoreTrailingZeros) || (typeof value === 'undefined' || value === null || value === '');

            const priceValid = notEmptyRule && precisionScaleRule;

            return priceValid ? null : { _ : this.translocoService.translate('NotEmptyPrecisionScale', {precision, scale}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    pointsTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const pointsValid = notEmptyRule;

            return pointsValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    partnerUserIdTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerUserIdValid = notEmptyRule;

            return partnerUserIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


}

