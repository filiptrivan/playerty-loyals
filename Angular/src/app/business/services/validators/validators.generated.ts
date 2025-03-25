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
            case 'pointsAchievement':
                return this.pointsAchievementValidator(formControl);
            case 'expirationDateAchievement':
                return this.expirationDateAchievementValidator(formControl);
            case 'partnerUserIdAchievement':
                return this.partnerUserIdAchievementValidator(formControl);
            case 'achievementTypeIdAchievement':
                return this.achievementTypeIdAchievementValidator(formControl);
            case 'versionAchievement':
                return this.versionAchievementValidator(formControl);
            case 'createdAtAchievement':
                return this.createdAtAchievementValidator(formControl);
            case 'modifiedAtAchievement':
                return this.modifiedAtAchievementValidator(formControl);

            case 'nameAchievementType':
                return this.nameAchievementTypeValidator(formControl);

            case 'businessSystemIdAutomaticUpdatePoints':
                return this.businessSystemIdAutomaticUpdatePointsValidator(formControl);
            case 'businessSystemVersionAutomaticUpdatePoints':
                return this.businessSystemVersionAutomaticUpdatePointsValidator(formControl);
            case 'updatePointsStartDateAutomaticUpdatePoints':
                return this.updatePointsStartDateAutomaticUpdatePointsValidator(formControl);
            case 'updatePointsIntervalAutomaticUpdatePoints':
                return this.updatePointsIntervalAutomaticUpdatePointsValidator(formControl);

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
            case 'orderNumberDiscountProductGroup':
                return this.orderNumberDiscountProductGroupValidator(formControl);
            case 'businessSystemIdDiscountProductGroup':
                return this.businessSystemIdDiscountProductGroupValidator(formControl);
            case 'versionDiscountProductGroup':
                return this.versionDiscountProductGroupValidator(formControl);
            case 'createdAtDiscountProductGroup':
                return this.createdAtDiscountProductGroupValidator(formControl);
            case 'modifiedAtDiscountProductGroup':
                return this.modifiedAtDiscountProductGroupValidator(formControl);

            case 'businessSystemIdExcelUpdatePoints':
                return this.businessSystemIdExcelUpdatePointsValidator(formControl);
            case 'businessSystemVersionExcelUpdatePoints':
                return this.businessSystemVersionExcelUpdatePointsValidator(formControl);

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

            case 'businessSystemIdManualUpdatePoints':
                return this.businessSystemIdManualUpdatePointsValidator(formControl);
            case 'businessSystemVersionManualUpdatePoints':
                return this.businessSystemVersionManualUpdatePointsValidator(formControl);
            case 'fromDateManualUpdatePoints':
                return this.fromDateManualUpdatePointsValidator(formControl);
            case 'toDateManualUpdatePoints':
                return this.toDateManualUpdatePointsValidator(formControl);

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
            case 'pointsDurationPartner':
                return this.pointsDurationPartnerValidator(formControl);
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
            case 'businessSystemUpdatePointsScheduledTaskIdTransaction':
                return this.businessSystemUpdatePointsScheduledTaskIdTransactionValidator(formControl);
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

            case 'verificationCodeVerificationTokenRequest':
                return this.verificationCodeVerificationTokenRequestValidator(formControl);
            case 'emailVerificationTokenRequest':
                return this.emailVerificationTokenRequestValidator(formControl);

            default:
                return null;
        }
    }

    pointsAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    expirationDateAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    partnerUserIdAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    achievementTypeIdAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtAchievementValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameAchievementTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 70;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    businessSystemIdAutomaticUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemVersionAutomaticUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    updatePointsStartDateAutomaticUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    updatePointsIntervalAutomaticUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    nameBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    getTransactionsEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    getDiscountProductGroupsEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    createUserEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    updateUserGroupEndpointBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    updatePointsIntervalBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NumberRangeMin', {min}) };
        };

        control.validator = validator;

        return validator;
    }

    partnerIdBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtBusinessSystemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
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

            const valid = notEmptyRule && numberMaxRangeRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMaxNumberRangeMin', {max, min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    orderNumberBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemIdBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    tierIdBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtBusinessSystemTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    isManualBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemIdBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtBusinessSystemUpdatePointsScheduledTaskValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    codeDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    orderNumberDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemIdDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    businessSystemIdExcelUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemVersionExcelUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    nameExternalDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    codeExternalDiscountProductGroupValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    codeExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 20;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    productNameExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    productImageUrlExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    productCategoryNameExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    productCategoryImageUrlExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

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

            const valid = notEmptyRule && precisionScaleRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyPrecisionScale', {precision, scale}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    boughtAtExternalTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameGenderValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 70;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    businessSystemIdManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemVersionManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    fromDateManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    toDateManualUpdatePointsValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    titleNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    emailBodyNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    namePartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    slugPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    logoImagePartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1024;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    primaryColorPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const length = 7;
            const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringSingleLengthRule;

            return valid ? null : { _ : this.translocoService.translate('SingleLength', {length}) };
        };

        control.validator = validator;

        return validator;
    }

    productsRecommendationEndpointPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

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

            const valid = notEmptyRule && precisionScaleRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyPrecisionScale', {precision, scale}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    pointsDurationPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const max = 1100;
            const numberMaxRangeRule = (value <= max) || (typeof value === 'undefined' || value === null || value === '');
            const min = 0;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && numberMaxRangeRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMaxNumberRangeMin', {max, min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtPartnerValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    titlePartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    emailBodyPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    partnerIdPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtPartnerNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    namePartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionPartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    codePartnerPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    namePartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    partnerIdPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtPartnerRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    pointsPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    partnerIdPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    userIdPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtPartnerUserValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    namePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    nameLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    descriptionLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    codePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }


    nameRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    versionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    pointsForTheFirstTimeFillSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 0;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    partnerIdSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtSegmentationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 100;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    orderNumberSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    segmentationIdSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtSegmentationItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    nameTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 255;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    descriptionTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 400;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    validFromTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 0;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    validToTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 0;
            const numberMinRangeRule = (value >= min) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && numberMinRangeRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyNumberRangeMin', {min}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    partnerIdTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtTierValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    productNameTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    codeTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const min = 1;
            const max = 20;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    productImageUrlTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    productCategoryNameTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 500;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

        return validator;
    }

    productCategoryImageUrlTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const min = 1;
            const max = 1000;
            const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const valid = stringLengthRule;

            return valid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;

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

            const valid = notEmptyRule && precisionScaleRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyPrecisionScale', {precision, scale}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    boughtAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    pointsTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    partnerUserIdTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    businessSystemUpdatePointsScheduledTaskIdTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtTransactionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    versionUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }

    createdAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }

    modifiedAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const valid = notEmptyRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity(); // FT: It's necessary only for Date Angular type
        return validator;
    }


    verificationCodeVerificationTokenRequestValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
            const length = 6;
            const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const valid = notEmptyRule && stringSingleLengthRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptySingleLength', {length}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

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

            const valid = notEmptyRule && stringLengthRule && emailAddressRule;

            return valid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;

        return validator;
    }



}
