import { ValidationErrors } from '@angular/forms';
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { validatePrecisionScale } from 'src/app/core/services/helper-functions';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
        protected translocoService: TranslocoService
    ) {
    }

    getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
        switch(formControl.label + className){

        case 'updatePointsIntervalBusinessSystemUpdatePointsDataBody':
            return this.updatePointsIntervalBusinessSystemUpdatePointsDataBodyValidator(formControl);

        case 'nameExternalDiscountProductGroup':
            return this.nameExternalDiscountProductGroupValidator(formControl);
        case 'codeExternalDiscountProductGroup':
            return this.codeExternalDiscountProductGroupValidator(formControl);

        case 'userEmailExternalTransaction':
            return this.userEmailExternalTransactionValidator(formControl);
        case 'codeExternalTransaction':
            return this.codeExternalTransactionValidator(formControl);
        case 'productNameExternalTransaction':
            return this.productNameExternalTransactionValidator(formControl);
        case 'productImageUrlExternalTransaction':
            return this.productImageUrlExternalTransactionValidator(formControl);
        case 'productCategoryNameExternalTransaction':
            return this.productCategoryNameExternalTransactionValidator(formControl);
        case 'productCategoryImageUrlExternalTransaction':
            return this.productCategoryImageUrlExternalTransactionValidator(formControl);
        case 'priceExternalTransaction':
            return this.priceExternalTransactionValidator(formControl);
        case 'boughtAtExternalTransaction':
            return this.boughtAtExternalTransactionValidator(formControl);





        case 'discountBusinessSystemTierDiscountProductGroup':
            return this.discountBusinessSystemTierDiscountProductGroupValidator(formControl);

        case 'orderNumberBusinessSystemTier':
            return this.orderNumberBusinessSystemTierValidator(formControl);
        case 'businessSystemIdBusinessSystemTier':
            return this.businessSystemIdBusinessSystemTierValidator(formControl);
        case 'tierIdBusinessSystemTier':
            return this.tierIdBusinessSystemTierValidator(formControl);
        case 'versionBusinessSystemTier':
            return this.versionBusinessSystemTierValidator(formControl);
        case 'createdAtBusinessSystemTier':
            return this.createdAtBusinessSystemTierValidator(formControl);
        case 'modifiedAtBusinessSystemTier':
            return this.modifiedAtBusinessSystemTierValidator(formControl);

        case 'titleNotification':
            return this.titleNotificationValidator(formControl);
        case 'descriptionNotification':
            return this.descriptionNotificationValidator(formControl);
        case 'emailBodyNotification':
            return this.emailBodyNotificationValidator(formControl);
        case 'versionNotification':
            return this.versionNotificationValidator(formControl);
        case 'createdAtNotification':
            return this.createdAtNotificationValidator(formControl);
        case 'modifiedAtNotification':
            return this.modifiedAtNotificationValidator(formControl);





        case 'nameSegmentationItem':
            return this.nameSegmentationItemValidator(formControl);
        case 'orderNumberSegmentationItem':
            return this.orderNumberSegmentationItemValidator(formControl);
        case 'segmentationIdSegmentationItem':
            return this.segmentationIdSegmentationItemValidator(formControl);
        case 'versionSegmentationItem':
            return this.versionSegmentationItemValidator(formControl);
        case 'createdAtSegmentationItem':
            return this.createdAtSegmentationItemValidator(formControl);
        case 'modifiedAtSegmentationItem':
            return this.modifiedAtSegmentationItemValidator(formControl);



        case 'nameBusinessSystem':
            return this.nameBusinessSystemValidator(formControl);
        case 'updatePointsIntervalBusinessSystem':
            return this.updatePointsIntervalBusinessSystemValidator(formControl);
        case 'getTransactionsEndpointBusinessSystem':
            return this.getTransactionsEndpointBusinessSystemValidator(formControl);
        case 'getDiscountCategoriesEndpointBusinessSystem':
            return this.getDiscountCategoriesEndpointBusinessSystemValidator(formControl);
        case 'createUserEndpointBusinessSystem':
            return this.createUserEndpointBusinessSystemValidator(formControl);
        case 'updateUserGroupEndpointBusinessSystem':
            return this.updateUserGroupEndpointBusinessSystemValidator(formControl);
        case 'partnerIdBusinessSystem':
            return this.partnerIdBusinessSystemValidator(formControl);
        case 'versionBusinessSystem':
            return this.versionBusinessSystemValidator(formControl);
        case 'createdAtBusinessSystem':
            return this.createdAtBusinessSystemValidator(formControl);
        case 'modifiedAtBusinessSystem':
            return this.modifiedAtBusinessSystemValidator(formControl);




        case 'transactionsFromBusinessSystemUpdatePointsScheduledTask':
            return this.transactionsFromBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'transactionsToBusinessSystemUpdatePointsScheduledTask':
            return this.transactionsToBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'isManualBusinessSystemUpdatePointsScheduledTask':
            return this.isManualBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'businessSystemIdBusinessSystemUpdatePointsScheduledTask':
            return this.businessSystemIdBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'versionBusinessSystemUpdatePointsScheduledTask':
            return this.versionBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'createdAtBusinessSystemUpdatePointsScheduledTask':
            return this.createdAtBusinessSystemUpdatePointsScheduledTaskValidator(formControl);
        case 'modifiedAtBusinessSystemUpdatePointsScheduledTask':
            return this.modifiedAtBusinessSystemUpdatePointsScheduledTaskValidator(formControl);


        case 'nameDiscountProductGroup':
            return this.nameDiscountProductGroupValidator(formControl);
        case 'codeDiscountProductGroup':
            return this.codeDiscountProductGroupValidator(formControl);
        case 'businessSystemIdDiscountProductGroup':
            return this.businessSystemIdDiscountProductGroupValidator(formControl);
        case 'versionDiscountProductGroup':
            return this.versionDiscountProductGroupValidator(formControl);
        case 'createdAtDiscountProductGroup':
            return this.createdAtDiscountProductGroupValidator(formControl);
        case 'modifiedAtDiscountProductGroup':
            return this.modifiedAtDiscountProductGroupValidator(formControl);


        case 'nameGender':
            return this.nameGenderValidator(formControl);


        case 'namePartner':
            return this.namePartnerValidator(formControl);
        case 'emailPartner':
            return this.emailPartnerValidator(formControl);
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
        case 'versionPartner':
            return this.versionPartnerValidator(formControl);
        case 'createdAtPartner':
            return this.createdAtPartnerValidator(formControl);
        case 'modifiedAtPartner':
            return this.modifiedAtPartnerValidator(formControl);


        case 'partnerIdPartnerNotification':
            return this.partnerIdPartnerNotificationValidator(formControl);
        case 'titlePartnerNotification':
            return this.titlePartnerNotificationValidator(formControl);
        case 'descriptionPartnerNotification':
            return this.descriptionPartnerNotificationValidator(formControl);
        case 'emailBodyPartnerNotification':
            return this.emailBodyPartnerNotificationValidator(formControl);
        case 'versionPartnerNotification':
            return this.versionPartnerNotificationValidator(formControl);
        case 'createdAtPartnerNotification':
            return this.createdAtPartnerNotificationValidator(formControl);
        case 'modifiedAtPartnerNotification':
            return this.modifiedAtPartnerNotificationValidator(formControl);

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
        case 'versionPartnerRole':
            return this.versionPartnerRoleValidator(formControl);
        case 'createdAtPartnerRole':
            return this.createdAtPartnerRoleValidator(formControl);
        case 'modifiedAtPartnerRole':
            return this.modifiedAtPartnerRoleValidator(formControl);



        case 'pointsPartnerUser':
            return this.pointsPartnerUserValidator(formControl);
        case 'partnerIdPartnerUser':
            return this.partnerIdPartnerUserValidator(formControl);
        case 'userIdPartnerUser':
            return this.userIdPartnerUserValidator(formControl);
        case 'versionPartnerUser':
            return this.versionPartnerUserValidator(formControl);
        case 'createdAtPartnerUser':
            return this.createdAtPartnerUserValidator(formControl);
        case 'modifiedAtPartnerUser':
            return this.modifiedAtPartnerUserValidator(formControl);









        case 'nameSegmentation':
            return this.nameSegmentationValidator(formControl);
        case 'descriptionSegmentation':
            return this.descriptionSegmentationValidator(formControl);
        case 'pointsForTheFirstTimeFillSegmentation':
            return this.pointsForTheFirstTimeFillSegmentationValidator(formControl);
        case 'partnerIdSegmentation':
            return this.partnerIdSegmentationValidator(formControl);
        case 'versionSegmentation':
            return this.versionSegmentationValidator(formControl);
        case 'createdAtSegmentation':
            return this.createdAtSegmentationValidator(formControl);
        case 'modifiedAtSegmentation':
            return this.modifiedAtSegmentationValidator(formControl);



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
        case 'versionTier':
            return this.versionTierValidator(formControl);
        case 'createdAtTier':
            return this.createdAtTierValidator(formControl);
        case 'modifiedAtTier':
            return this.modifiedAtTierValidator(formControl);

        case 'productNameTransaction':
            return this.productNameTransactionValidator(formControl);
        case 'codeTransaction':
            return this.codeTransactionValidator(formControl);
        case 'productImageUrlTransaction':
            return this.productImageUrlTransactionValidator(formControl);
        case 'productCategoryNameTransaction':
            return this.productCategoryNameTransactionValidator(formControl);
        case 'productCategoryImageUrlTransaction':
            return this.productCategoryImageUrlTransactionValidator(formControl);
        case 'priceTransaction':
            return this.priceTransactionValidator(formControl);
        case 'boughtAtTransaction':
            return this.boughtAtTransactionValidator(formControl);
        case 'pointsTransaction':
            return this.pointsTransactionValidator(formControl);
        case 'partnerUserIdTransaction':
            return this.partnerUserIdTransactionValidator(formControl);
        case 'businessSystemIdTransaction':
            return this.businessSystemIdTransactionValidator(formControl);
        case 'versionTransaction':
            return this.versionTransactionValidator(formControl);
        case 'createdAtTransaction':
            return this.createdAtTransactionValidator(formControl);
        case 'modifiedAtTransaction':
            return this.modifiedAtTransactionValidator(formControl);


        case 'emailUserExtended':
            return this.emailUserExtendedValidator(formControl);
        case 'versionUserExtended':
            return this.versionUserExtendedValidator(formControl);
        case 'createdAtUserExtended':
            return this.createdAtUserExtendedValidator(formControl);
        case 'modifiedAtUserExtended':
            return this.modifiedAtUserExtendedValidator(formControl);






        case 'emailLogin':
            return this.emailLoginValidator(formControl);




        case 'emailRegistration':
            return this.emailRegistrationValidator(formControl);




        case 'verificationCodeVerificationTokenRequest':
            return this.verificationCodeVerificationTokenRequestValidator(formControl);
        case 'emailVerificationTokenRequest':
            return this.emailVerificationTokenRequestValidator(formControl);

        case 'namePermission':
            return this.namePermissionValidator(formControl);
        case 'nameLatinPermission':
            return this.nameLatinPermissionValidator(formControl);
        case 'descriptionPermission':
            return this.descriptionPermissionValidator(formControl);
        case 'descriptionLatinPermission':
            return this.descriptionLatinPermissionValidator(formControl);
        case 'codePermission':
            return this.codePermissionValidator(formControl);


        case 'nameRole':
            return this.nameRoleValidator(formControl);
        case 'descriptionRole':
            return this.descriptionRoleValidator(formControl);
        case 'versionRole':
            return this.versionRoleValidator(formControl);
        case 'createdAtRole':
            return this.createdAtRoleValidator(formControl);
        case 'modifiedAtRole':
            return this.modifiedAtRoleValidator(formControl);

















            default:
                return null;
        }
    }



    updatePointsIntervalBusinessSystemUpdatePointsDataBodyValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const updatePointsIntervalValid = numberMinRangeRule;

            return updatePointsIntervalValid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };
        
        return validator;
    }


    nameExternalDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
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

    codeExternalDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
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


    userEmailExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const userEmailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return userEmailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    codeExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 20;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    productNameExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
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

    productImageUrlExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productImageUrlValid = stringLengthRule;

            return productImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    productCategoryNameExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
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

    productCategoryImageUrlExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryImageUrlValid = stringLengthRule;

            return productCategoryImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    priceExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
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

    boughtAtExternalTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const boughtAtValid = notEmptyRule;

            return boughtAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }






    discountBusinessSystemTierDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
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


    orderNumberBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    businessSystemIdBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    tierIdBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const tierIdValid = notEmptyRule;

            return tierIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    versionBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtBusinessSystemTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtSegmentationItemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }




    nameBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
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

    updatePointsIntervalBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const updatePointsIntervalValid = numberMinRangeRule;

            return updatePointsIntervalValid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };
        
        return validator;
    }

    getTransactionsEndpointBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
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

    getDiscountCategoriesEndpointBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
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

    createUserEndpointBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
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

    updateUserGroupEndpointBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
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

    partnerIdBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    versionBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtBusinessSystemValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }





    transactionsFromBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const transactionsFromValid = notEmptyRule;

            return transactionsFromValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    transactionsToBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const transactionsToValid = notEmptyRule;

            return transactionsToValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    isManualBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const isManualValid = notEmptyRule;

            return isManualValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    businessSystemIdBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    versionBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtBusinessSystemUpdatePointsScheduledTaskValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }



    nameDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
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

    codeDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
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

    businessSystemIdDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    versionDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtDiscountProductGroupValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    emailPartnerValidator(control: SoftFormControl): SoftValidatorFn {
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

    versionPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtPartnerValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtPartnerNotificationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
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

    versionPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtPartnerRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
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

    versionPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtPartnerUserValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtSegmentationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtTierValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    codeTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 20;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    productImageUrlTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productImageUrlValid = stringLengthRule;

            return productImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
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

    productCategoryImageUrlTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryImageUrlValid = stringLengthRule;

            return productCategoryImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
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

    boughtAtTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const boughtAtValid = notEmptyRule;

            return boughtAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    businessSystemIdTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    versionTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtTransactionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
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

    versionUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtUserExtendedValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }







    emailLoginValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }





    emailRegistrationValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }





    verificationCodeVerificationTokenRequestValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const length = 6;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const verificationCodeValid = notEmptyRule && stringSingleLengthRule;

            return verificationCodeValid ? null : { _ : this.translocoService.translate('NotEmptySingleLength', {length}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    emailVerificationTokenRequestValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


    namePermissionValidator(control: SoftFormControl): SoftValidatorFn {
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

    nameLatinPermissionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameLatinValid = notEmptyRule && stringLengthRule;

            return nameLatinValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    descriptionPermissionValidator(control: SoftFormControl): SoftValidatorFn {
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

    descriptionLatinPermissionValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionLatinValid = stringLengthRule;

            return descriptionLatinValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };
        
        return validator;
    }

    codePermissionValidator(control: SoftFormControl): SoftValidatorFn {
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



    nameRoleValidator(control: SoftFormControl): SoftValidatorFn {
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

    descriptionRoleValidator(control: SoftFormControl): SoftValidatorFn {
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

    versionRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    createdAtRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }

    modifiedAtRoleValidator(control: SoftFormControl): SoftValidatorFn {
        const validator: SoftValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        return validator;
    }


















}

