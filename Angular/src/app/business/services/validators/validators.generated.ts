import { ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { SpiderFormControl, SpiderValidatorFn, validatePrecisionScale } from '@playerty/spider';

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
        protected translocoService: TranslocoService
    ) {
    }

    setValidator = (formControl: SpiderFormControl, className: string): SpiderValidatorFn => { 
        switch(formControl.label + className){






        case 'nameBusinessSystem':
            return this.nameBusinessSystemValidator(formControl);
        case 'getTransactionsEndpointBusinessSystem':
            return this.getTransactionsEndpointBusinessSystemValidator(formControl);
        case 'getDiscountProductGroupsEndpointBusinessSystem':
            return this.getDiscountProductGroupsEndpointBusinessSystemValidator(formControl);
        case 'createUserEndpointBusinessSystem':
            return this.createUserEndpointBusinessSystemValidator(formControl);
        case 'updateUserGroupEndpointBusinessSystem':
            return this.updateUserGroupEndpointBusinessSystemValidator(formControl);
        case 'updatePointsIntervalBusinessSystem':
            return this.updatePointsIntervalBusinessSystemValidator(formControl);
        case 'partnerIdBusinessSystem':
            return this.partnerIdBusinessSystemValidator(formControl);
        case 'versionBusinessSystem':
            return this.versionBusinessSystemValidator(formControl);
        case 'createdAtBusinessSystem':
            return this.createdAtBusinessSystemValidator(formControl);
        case 'modifiedAtBusinessSystem':
            return this.modifiedAtBusinessSystemValidator(formControl);


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


        case 'updatePointsStartDateBusinessSystemUpdatePointsDataBody':
            return this.updatePointsStartDateBusinessSystemUpdatePointsDataBodyValidator(formControl);
        case 'updatePointsIntervalBusinessSystemUpdatePointsDataBody':
            return this.updatePointsIntervalBusinessSystemUpdatePointsDataBodyValidator(formControl);

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


        case 'businessSystemIdExcelManualUpdatePoints':
            return this.businessSystemIdExcelManualUpdatePointsValidator(formControl);
        case 'businessSystemVersionExcelManualUpdatePoints':
            return this.businessSystemVersionExcelManualUpdatePointsValidator(formControl);


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

        case 'nameGender':
            return this.nameGenderValidator(formControl);




        case 'emailLogin':
            return this.emailLoginValidator(formControl);





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

        case 'titlePartnerNotification':
            return this.titlePartnerNotificationValidator(formControl);
        case 'descriptionPartnerNotification':
            return this.descriptionPartnerNotificationValidator(formControl);
        case 'emailBodyPartnerNotification':
            return this.emailBodyPartnerNotificationValidator(formControl);
        case 'partnerIdPartnerNotification':
            return this.partnerIdPartnerNotificationValidator(formControl);
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







        case 'emailRegistration':
            return this.emailRegistrationValidator(formControl);



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


        case 'businessSystemIdUpdatePoints':
            return this.businessSystemIdUpdatePointsValidator(formControl);
        case 'businessSystemVersionUpdatePoints':
            return this.businessSystemVersionUpdatePointsValidator(formControl);
        case 'fromDateUpdatePoints':
            return this.fromDateUpdatePointsValidator(formControl);
        case 'toDateUpdatePoints':
            return this.toDateUpdatePointsValidator(formControl);


        case 'emailUserExtended':
            return this.emailUserExtendedValidator(formControl);
        case 'versionUserExtended':
            return this.versionUserExtendedValidator(formControl);
        case 'createdAtUserExtended':
            return this.createdAtUserExtendedValidator(formControl);
        case 'modifiedAtUserExtended':
            return this.modifiedAtUserExtendedValidator(formControl);






        case 'verificationCodeVerificationTokenRequest':
            return this.verificationCodeVerificationTokenRequestValidator(formControl);
        case 'emailVerificationTokenRequest':
            return this.emailVerificationTokenRequestValidator(formControl);

            default:
                return null;
        }
    }







    nameBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    getTransactionsEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const getTransactionsEndpointValid = stringLengthRule;

            return getTransactionsEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    getDiscountProductGroupsEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const getDiscountProductGroupsEndpointValid = stringLengthRule;

            return getDiscountProductGroupsEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createUserEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const createUserEndpointValid = stringLengthRule;

            return createUserEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    updateUserGroupEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const updateUserGroupEndpointValid = stringLengthRule;

            return updateUserGroupEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    updatePointsIntervalBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const updatePointsIntervalValid = numberMinRangeRule;

            return updatePointsIntervalValid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    discountBusinessSystemTierDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    orderNumberBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemIdBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    tierIdBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const tierIdValid = notEmptyRule;

            return tierIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    updatePointsStartDateBusinessSystemUpdatePointsDataBodyValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const updatePointsStartDateValid = notEmptyRule;

            return updatePointsStartDateValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    updatePointsIntervalBusinessSystemUpdatePointsDataBodyValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const updatePointsIntervalValid = notEmptyRule && numberMinRangeRule;

            return updatePointsIntervalValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    isManualBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const isManualValid = notEmptyRule;

            return isManualValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemIdBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




    nameDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codeDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemIdDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    businessSystemIdExcelManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemVersionExcelManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemVersionValid = notEmptyRule;

            return businessSystemVersionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    nameExternalDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codeExternalDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    userEmailExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codeExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 20;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productNameExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productNameValid = notEmptyRule && stringLengthRule;

            return productNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productImageUrlExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productImageUrlValid = stringLengthRule;

            return productImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productCategoryNameExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryNameValid = notEmptyRule && stringLengthRule;

            return productCategoryNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productCategoryImageUrlExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryImageUrlValid = stringLengthRule;

            return productCategoryImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    priceExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    boughtAtExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const boughtAtValid = notEmptyRule;

            return boughtAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    nameGenderValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




    emailLoginValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }





    titleNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const titleValid = notEmptyRule && stringLengthRule;

            return titleValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = notEmptyRule && stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailBodyNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const emailBodyValid = stringLengthRule;

            return emailBodyValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }



    namePartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    slugPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const slugValid = notEmptyRule && stringLengthRule;

            return slugValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    logoImagePartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1024;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const logoImageValid = stringLengthRule;

            return logoImageValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    primaryColorPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const length = 7;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const primaryColorValid = stringSingleLengthRule;

            return primaryColorValid ? null : { _ : this.translocoService.translate('SingleLength', {length}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productsRecommendationEndpointPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productsRecommendationEndpointValid = stringLengthRule;

            return productsRecommendationEndpointValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    pointsMultiplierPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    titlePartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const titleValid = notEmptyRule && stringLengthRule;

            return titleValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = notEmptyRule && stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailBodyPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const emailBodyValid = stringLengthRule;

            return emailBodyValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    namePartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionPartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codePartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    namePartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }





    pointsPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const pointsValid = notEmptyRule;

            return pointsValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    userIdPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const userIdValid = notEmptyRule;

            return userIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }










    namePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    nameLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameLatinValid = notEmptyRule && stringLengthRule;

            return nameLatinValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionLatinValid = stringLengthRule;

            return descriptionLatinValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }







    emailRegistrationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }



    nameRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




    nameSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    pointsForTheFirstTimeFillSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const pointsForTheFirstTimeFillValid = notEmptyRule && numberMinRangeRule;

            return pointsForTheFirstTimeFillValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    nameSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    orderNumberSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    segmentationIdSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const segmentationIdValid = notEmptyRule;

            return segmentationIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }








    nameTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    validFromTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const validFromValid = notEmptyRule && numberMinRangeRule;

            return validFromValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    validToTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 0;
        const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const validToValid = notEmptyRule && numberMinRangeRule;

            return validToValid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerIdTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerIdValid = notEmptyRule;

            return partnerIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    productNameTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productNameValid = notEmptyRule && stringLengthRule;

            return productNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codeTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 20;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productImageUrlTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productImageUrlValid = stringLengthRule;

            return productImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productCategoryNameTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 500;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryNameValid = notEmptyRule && stringLengthRule;

            return productCategoryNameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    productCategoryImageUrlTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const productCategoryImageUrlValid = stringLengthRule;

            return productCategoryImageUrlValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    priceTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    boughtAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const boughtAtValid = notEmptyRule;

            return boughtAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    pointsTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const pointsValid = notEmptyRule;

            return pointsValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    partnerUserIdTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const partnerUserIdValid = notEmptyRule;

            return partnerUserIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemIdTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    businessSystemIdUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemIdValid = notEmptyRule;

            return businessSystemIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    businessSystemVersionUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const businessSystemVersionValid = notEmptyRule;

            return businessSystemVersionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    fromDateUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const fromDateValid = notEmptyRule;

            return fromDateValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    toDateUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const toDateValid = notEmptyRule;

            return toDateValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    emailUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }






    verificationCodeVerificationTokenRequestValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const length = 6;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const verificationCodeValid = notEmptyRule && stringSingleLengthRule;

            return verificationCodeValid ? null : { _ : this.translocoService.translate('NotEmptySingleLength', {length}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailVerificationTokenRequestValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
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
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


}

