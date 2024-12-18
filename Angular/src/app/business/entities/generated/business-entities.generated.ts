import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";
import { MimeTypes } from "src/app/core/entities/mime-type";



export class UserExtended extends BaseEntity
{
    email?: string;
	password?: string;
	hasLoggedInWithExternalProvider?: boolean;
	numberOfFailedAttemptsInARow?: number;
	birthDate?: Date;
	genderDisplayName?: string;
	genderId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        email,
		password,
		hasLoggedInWithExternalProvider,
		numberOfFailedAttemptsInARow,
		birthDate,
		genderDisplayName,
		genderId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		password?: string;
		hasLoggedInWithExternalProvider?: boolean;
		numberOfFailedAttemptsInARow?: number;
		birthDate?: Date;
		genderDisplayName?: string;
		genderId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('UserExtended'); 

        this.email = email;
		this.password = password;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.numberOfFailedAttemptsInARow = numberOfFailedAttemptsInARow;
		this.birthDate = birthDate;
		this.genderDisplayName = genderDisplayName;
		this.genderId = genderId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UserExtendedSaveBody extends BaseEntity
{
    userExtendedDTO?: UserExtended;
	selectedRoleIds?: number[];

    constructor(
    {
        userExtendedDTO,
		selectedRoleIds
    }:{
        userExtendedDTO?: UserExtended;
		selectedRoleIds?: number[];     
    } = {}
    ) {
        super('UserExtendedSaveBody'); 

        this.userExtendedDTO = userExtendedDTO;
		this.selectedRoleIds = selectedRoleIds;
    }
}


export class Tier extends BaseEntity
{
    name?: string;
	description?: string;
	validFrom?: number;
	validTo?: number;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		validFrom,
		validTo,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		validFrom?: number;
		validTo?: number;
		partnerDisplayName?: string;
		partnerId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Tier'); 

        this.name = name;
		this.description = description;
		this.validFrom = validFrom;
		this.validTo = validTo;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class TierSaveBody extends BaseEntity
{
    tierDTO?: Tier;
	tierDTOList?: Tier[];
	businessSystemTierDTOList?: BusinessSystemTier[];
	businessSystemTierDiscountProductGroupDTOList?: BusinessSystemTierDiscountProductGroup[];

    constructor(
    {
        tierDTO,
		tierDTOList,
		businessSystemTierDTOList,
		businessSystemTierDiscountProductGroupDTOList
    }:{
        tierDTO?: Tier;
		tierDTOList?: Tier[];
		businessSystemTierDTOList?: BusinessSystemTier[];
		businessSystemTierDiscountProductGroupDTOList?: BusinessSystemTierDiscountProductGroup[];     
    } = {}
    ) {
        super('TierSaveBody'); 

        this.tierDTO = tierDTO;
		this.tierDTOList = tierDTOList;
		this.businessSystemTierDTOList = businessSystemTierDTOList;
		this.businessSystemTierDiscountProductGroupDTOList = businessSystemTierDiscountProductGroupDTOList;
    }
}


export class PartnerPermission extends BaseEntity
{
    name?: string;
	description?: string;
	code?: string;
	id?: number;

    constructor(
    {
        name,
		description,
		code,
		id
    }:{
        name?: string;
		description?: string;
		code?: string;
		id?: number;     
    } = {}
    ) {
        super('PartnerPermission'); 

        this.name = name;
		this.description = description;
		this.code = code;
		this.id = id;
    }
}


export class PartnerPermissionSaveBody extends BaseEntity
{
    partnerPermissionDTO?: PartnerPermission;

    constructor(
    {
        partnerPermissionDTO
    }:{
        partnerPermissionDTO?: PartnerPermission;     
    } = {}
    ) {
        super('PartnerPermissionSaveBody'); 

        this.partnerPermissionDTO = partnerPermissionDTO;
    }
}


export class UserNotification extends BaseEntity
{
    notificationDisplayName?: string;
	notificationId?: number;
	userDisplayName?: string;
	userId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDisplayName,
		notificationId,
		userDisplayName,
		userId,
		isMarkedAsRead
    }:{
        notificationDisplayName?: string;
		notificationId?: number;
		userDisplayName?: string;
		userId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('UserNotification'); 

        this.notificationDisplayName = notificationDisplayName;
		this.notificationId = notificationId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class UserNotificationSaveBody extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationSaveBody'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}


export class Segmentation extends BaseEntity
{
    name?: string;
	description?: string;
	pointsForTheFirstTimeFill?: number;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		pointsForTheFirstTimeFill,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		pointsForTheFirstTimeFill?: number;
		partnerDisplayName?: string;
		partnerId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Segmentation'); 

        this.name = name;
		this.description = description;
		this.pointsForTheFirstTimeFill = pointsForTheFirstTimeFill;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class SegmentationSaveBody extends BaseEntity
{
    segmentationDTO?: Segmentation;
	segmentationItemsDTO?: SegmentationItem[];

    constructor(
    {
        segmentationDTO,
		segmentationItemsDTO
    }:{
        segmentationDTO?: Segmentation;
		segmentationItemsDTO?: SegmentationItem[];     
    } = {}
    ) {
        super('SegmentationSaveBody'); 

        this.segmentationDTO = segmentationDTO;
		this.segmentationItemsDTO = segmentationItemsDTO;
    }
}


export class PartnerUserSegmentationItem extends BaseEntity
{
    partnerUserDisplayName?: string;
	partnerUserId?: number;
	checkedSegmentationItemDisplayName?: string;
	checkedSegmentationItemId?: number;

    constructor(
    {
        partnerUserDisplayName,
		partnerUserId,
		checkedSegmentationItemDisplayName,
		checkedSegmentationItemId
    }:{
        partnerUserDisplayName?: string;
		partnerUserId?: number;
		checkedSegmentationItemDisplayName?: string;
		checkedSegmentationItemId?: number;     
    } = {}
    ) {
        super('PartnerUserSegmentationItem'); 

        this.partnerUserDisplayName = partnerUserDisplayName;
		this.partnerUserId = partnerUserId;
		this.checkedSegmentationItemDisplayName = checkedSegmentationItemDisplayName;
		this.checkedSegmentationItemId = checkedSegmentationItemId;
    }
}


export class PartnerUserSegmentationItemSaveBody extends BaseEntity
{
    partnerUserSegmentationItemDTO?: PartnerUserSegmentationItem;

    constructor(
    {
        partnerUserSegmentationItemDTO
    }:{
        partnerUserSegmentationItemDTO?: PartnerUserSegmentationItem;     
    } = {}
    ) {
        super('PartnerUserSegmentationItemSaveBody'); 

        this.partnerUserSegmentationItemDTO = partnerUserSegmentationItemDTO;
    }
}


export class PartnerNotificationSaveBody extends BaseEntity
{
    isMarkedAsRead?: boolean;
	tableFilter?: TableFilter;
	selectedIds?: number[];
	unselectedIds?: number[];
	isAllSelected?: boolean;
	partnerNotificationDTO?: PartnerNotification;

    constructor(
    {
        isMarkedAsRead,
		tableFilter,
		selectedIds,
		unselectedIds,
		isAllSelected,
		partnerNotificationDTO
    }:{
        isMarkedAsRead?: boolean;
		tableFilter?: TableFilter;
		selectedIds?: number[];
		unselectedIds?: number[];
		isAllSelected?: boolean;
		partnerNotificationDTO?: PartnerNotification;     
    } = {}
    ) {
        super('PartnerNotificationSaveBody'); 

        this.isMarkedAsRead = isMarkedAsRead;
		this.tableFilter = tableFilter;
		this.selectedIds = selectedIds;
		this.unselectedIds = unselectedIds;
		this.isAllSelected = isAllSelected;
		this.partnerNotificationDTO = partnerNotificationDTO;
    }
}


export class SegmentationItem extends BaseEntity
{
    name?: string;
	orderNumber?: number;
	segmentationDisplayName?: string;
	segmentationId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	checked?: boolean;

    constructor(
    {
        name,
		orderNumber,
		segmentationDisplayName,
		segmentationId,
		version,
		id,
		createdAt,
		modifiedAt,
		checked
    }:{
        name?: string;
		orderNumber?: number;
		segmentationDisplayName?: string;
		segmentationId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		checked?: boolean;     
    } = {}
    ) {
        super('SegmentationItem'); 

        this.name = name;
		this.orderNumber = orderNumber;
		this.segmentationDisplayName = segmentationDisplayName;
		this.segmentationId = segmentationId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.checked = checked;
    }
}


export class SegmentationItemSaveBody extends BaseEntity
{
    segmentationItemDTO?: SegmentationItem;

    constructor(
    {
        segmentationItemDTO
    }:{
        segmentationItemDTO?: SegmentationItem;     
    } = {}
    ) {
        super('SegmentationItemSaveBody'); 

        this.segmentationItemDTO = segmentationItemDTO;
    }
}


export class BusinessSystemUpdatePointsScheduledTask extends BaseEntity
{
    transactionsFrom?: Date;
	transactionsTo?: Date;
	isManual?: boolean;
	businessSystemDisplayName?: string;
	businessSystemId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        transactionsFrom,
		transactionsTo,
		isManual,
		businessSystemDisplayName,
		businessSystemId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        transactionsFrom?: Date;
		transactionsTo?: Date;
		isManual?: boolean;
		businessSystemDisplayName?: string;
		businessSystemId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('BusinessSystemUpdatePointsScheduledTask'); 

        this.transactionsFrom = transactionsFrom;
		this.transactionsTo = transactionsTo;
		this.isManual = isManual;
		this.businessSystemDisplayName = businessSystemDisplayName;
		this.businessSystemId = businessSystemId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class BusinessSystemUpdatePointsScheduledTaskSaveBody extends BaseEntity
{
    businessSystemUpdatePointsScheduledTaskDTO?: BusinessSystemUpdatePointsScheduledTask;

    constructor(
    {
        businessSystemUpdatePointsScheduledTaskDTO
    }:{
        businessSystemUpdatePointsScheduledTaskDTO?: BusinessSystemUpdatePointsScheduledTask;     
    } = {}
    ) {
        super('BusinessSystemUpdatePointsScheduledTaskSaveBody'); 

        this.businessSystemUpdatePointsScheduledTaskDTO = businessSystemUpdatePointsScheduledTaskDTO;
    }
}


export class DiscountProductGroup extends BaseEntity
{
    name?: string;
	code?: string;
	businessSystemDisplayName?: string;
	businessSystemId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		code,
		businessSystemDisplayName,
		businessSystemId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		code?: string;
		businessSystemDisplayName?: string;
		businessSystemId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('DiscountProductGroup'); 

        this.name = name;
		this.code = code;
		this.businessSystemDisplayName = businessSystemDisplayName;
		this.businessSystemId = businessSystemId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class DiscountProductGroupSaveBody extends BaseEntity
{
    discountProductGroupDTO?: DiscountProductGroup;

    constructor(
    {
        discountProductGroupDTO
    }:{
        discountProductGroupDTO?: DiscountProductGroup;     
    } = {}
    ) {
        super('DiscountProductGroupSaveBody'); 

        this.discountProductGroupDTO = discountProductGroupDTO;
    }
}


export class Notification extends BaseEntity
{
    isMarkedAsRead?: boolean;
	title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        isMarkedAsRead,
		title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        isMarkedAsRead?: boolean;
		title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Notification'); 

        this.isMarkedAsRead = isMarkedAsRead;
		this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class BusinessSystemTierDiscountProductGroup extends BaseEntity
{
    id?: number;
	businessSystemId?: number;
	selectedForBusinessSystem?: boolean;
	businessSystemTierClientIndex?: number;
	tierClientIndex?: number;
	businessSystemTierDisplayName?: string;
	businessSystemTierId?: number;
	discountProductGroupDisplayName?: string;
	discountProductGroupId?: number;
	discount?: number;

    constructor(
    {
        id,
		businessSystemId,
		selectedForBusinessSystem,
		businessSystemTierClientIndex,
		tierClientIndex,
		businessSystemTierDisplayName,
		businessSystemTierId,
		discountProductGroupDisplayName,
		discountProductGroupId,
		discount
    }:{
        id?: number;
		businessSystemId?: number;
		selectedForBusinessSystem?: boolean;
		businessSystemTierClientIndex?: number;
		tierClientIndex?: number;
		businessSystemTierDisplayName?: string;
		businessSystemTierId?: number;
		discountProductGroupDisplayName?: string;
		discountProductGroupId?: number;
		discount?: number;     
    } = {}
    ) {
        super('BusinessSystemTierDiscountProductGroup'); 

        this.id = id;
		this.businessSystemId = businessSystemId;
		this.selectedForBusinessSystem = selectedForBusinessSystem;
		this.businessSystemTierClientIndex = businessSystemTierClientIndex;
		this.tierClientIndex = tierClientIndex;
		this.businessSystemTierDisplayName = businessSystemTierDisplayName;
		this.businessSystemTierId = businessSystemTierId;
		this.discountProductGroupDisplayName = discountProductGroupDisplayName;
		this.discountProductGroupId = discountProductGroupId;
		this.discount = discount;
    }
}


export class ExternalDiscountProductGroup extends BaseEntity
{
    name?: string;
	code?: string;

    constructor(
    {
        name,
		code
    }:{
        name?: string;
		code?: string;     
    } = {}
    ) {
        super('ExternalDiscountProductGroup'); 

        this.name = name;
		this.code = code;
    }
}


export class BusinessSystemTier extends BaseEntity
{
    orderNumber?: number;
	businessSystemDisplayName?: string;
	businessSystemId?: number;
	tierDisplayName?: string;
	tierId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	tierClientIndex?: number;

    constructor(
    {
        orderNumber,
		businessSystemDisplayName,
		businessSystemId,
		tierDisplayName,
		tierId,
		version,
		id,
		createdAt,
		modifiedAt,
		tierClientIndex
    }:{
        orderNumber?: number;
		businessSystemDisplayName?: string;
		businessSystemId?: number;
		tierDisplayName?: string;
		tierId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		tierClientIndex?: number;     
    } = {}
    ) {
        super('BusinessSystemTier'); 

        this.orderNumber = orderNumber;
		this.businessSystemDisplayName = businessSystemDisplayName;
		this.businessSystemId = businessSystemId;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.tierClientIndex = tierClientIndex;
    }
}


export class BusinessSystemTierSaveBody extends BaseEntity
{
    businessSystemTierDTO?: BusinessSystemTier;

    constructor(
    {
        businessSystemTierDTO
    }:{
        businessSystemTierDTO?: BusinessSystemTier;     
    } = {}
    ) {
        super('BusinessSystemTierSaveBody'); 

        this.businessSystemTierDTO = businessSystemTierDTO;
    }
}


export class PartnerNotification extends BaseEntity
{
    partnerDisplayName?: string;
	partnerId?: number;
	title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        partnerDisplayName,
		partnerId,
		title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        partnerDisplayName?: string;
		partnerId?: number;
		title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerNotification'); 

        this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class BusinessSystemTierDiscountProductGroupSaveBody extends BaseEntity
{
    businessSystemTierDiscountProductGroupDTO?: BusinessSystemTierDiscountProductGroup;

    constructor(
    {
        businessSystemTierDiscountProductGroupDTO
    }:{
        businessSystemTierDiscountProductGroupDTO?: BusinessSystemTierDiscountProductGroup;     
    } = {}
    ) {
        super('BusinessSystemTierDiscountProductGroupSaveBody'); 

        this.businessSystemTierDiscountProductGroupDTO = businessSystemTierDiscountProductGroupDTO;
    }
}


export class PartnerUserSaveBody extends BaseEntity
{
    selectedPartnerRoleIds?: number[];
	selectedSegmentationItemIds?: number[];
	userExtendedDTO?: UserExtended;
	selectedRoleIds?: number[];
	partnerUserDTO?: PartnerUser;

    constructor(
    {
        selectedPartnerRoleIds,
		selectedSegmentationItemIds,
		userExtendedDTO,
		selectedRoleIds,
		partnerUserDTO
    }:{
        selectedPartnerRoleIds?: number[];
		selectedSegmentationItemIds?: number[];
		userExtendedDTO?: UserExtended;
		selectedRoleIds?: number[];
		partnerUserDTO?: PartnerUser;     
    } = {}
    ) {
        super('PartnerUserSaveBody'); 

        this.selectedPartnerRoleIds = selectedPartnerRoleIds;
		this.selectedSegmentationItemIds = selectedSegmentationItemIds;
		this.userExtendedDTO = userExtendedDTO;
		this.selectedRoleIds = selectedRoleIds;
		this.partnerUserDTO = partnerUserDTO;
    }
}


export class BusinessSystem extends BaseEntity
{
    name?: string;
	updatePointsInterval?: number;
	updatePointsStartDate?: Date;
	getTransactionsEndpoint?: string;
	getDiscountCategoriesEndpoint?: string;
	createUserEndpoint?: string;
	updateUserGroupEndpoint?: string;
	updatePointsScheduledTaskIsPaused?: boolean;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		updatePointsInterval,
		updatePointsStartDate,
		getTransactionsEndpoint,
		getDiscountCategoriesEndpoint,
		createUserEndpoint,
		updateUserGroupEndpoint,
		updatePointsScheduledTaskIsPaused,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		updatePointsInterval?: number;
		updatePointsStartDate?: Date;
		getTransactionsEndpoint?: string;
		getDiscountCategoriesEndpoint?: string;
		createUserEndpoint?: string;
		updateUserGroupEndpoint?: string;
		updatePointsScheduledTaskIsPaused?: boolean;
		partnerDisplayName?: string;
		partnerId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('BusinessSystem'); 

        this.name = name;
		this.updatePointsInterval = updatePointsInterval;
		this.updatePointsStartDate = updatePointsStartDate;
		this.getTransactionsEndpoint = getTransactionsEndpoint;
		this.getDiscountCategoriesEndpoint = getDiscountCategoriesEndpoint;
		this.createUserEndpoint = createUserEndpoint;
		this.updateUserGroupEndpoint = updateUserGroupEndpoint;
		this.updatePointsScheduledTaskIsPaused = updatePointsScheduledTaskIsPaused;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class BusinessSystemSaveBody extends BaseEntity
{
    businessSystemDTO?: BusinessSystem;

    constructor(
    {
        businessSystemDTO
    }:{
        businessSystemDTO?: BusinessSystem;     
    } = {}
    ) {
        super('BusinessSystemSaveBody'); 

        this.businessSystemDTO = businessSystemDTO;
    }
}


export class QrCode extends BaseEntity
{
    email?: string;
	transactionCode?: any;
	discount?: number;

    constructor(
    {
        email,
		transactionCode,
		discount
    }:{
        email?: string;
		transactionCode?: any;
		discount?: number;     
    } = {}
    ) {
        super('QrCode'); 

        this.email = email;
		this.transactionCode = transactionCode;
		this.discount = discount;
    }
}


export class Transaction extends BaseEntity
{
    productName?: string;
	code?: string;
	productImageUrl?: string;
	productCategoryName?: string;
	productCategoryImageUrl?: string;
	price?: number;
	boughtAt?: Date;
	points?: number;
	partnerUserDisplayName?: string;
	partnerUserId?: number;
	businessSystemDisplayName?: string;
	businessSystemId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        productName,
		code,
		productImageUrl,
		productCategoryName,
		productCategoryImageUrl,
		price,
		boughtAt,
		points,
		partnerUserDisplayName,
		partnerUserId,
		businessSystemDisplayName,
		businessSystemId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        productName?: string;
		code?: string;
		productImageUrl?: string;
		productCategoryName?: string;
		productCategoryImageUrl?: string;
		price?: number;
		boughtAt?: Date;
		points?: number;
		partnerUserDisplayName?: string;
		partnerUserId?: number;
		businessSystemDisplayName?: string;
		businessSystemId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Transaction'); 

        this.productName = productName;
		this.code = code;
		this.productImageUrl = productImageUrl;
		this.productCategoryName = productCategoryName;
		this.productCategoryImageUrl = productCategoryImageUrl;
		this.price = price;
		this.boughtAt = boughtAt;
		this.points = points;
		this.partnerUserDisplayName = partnerUserDisplayName;
		this.partnerUserId = partnerUserId;
		this.businessSystemDisplayName = businessSystemDisplayName;
		this.businessSystemId = businessSystemId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class TransactionSaveBody extends BaseEntity
{
    transactionDTO?: Transaction;

    constructor(
    {
        transactionDTO
    }:{
        transactionDTO?: Transaction;     
    } = {}
    ) {
        super('TransactionSaveBody'); 

        this.transactionDTO = transactionDTO;
    }
}


export class NotificationSaveBody extends BaseEntity
{
    notificationDTO?: Notification;
	isMarkedAsRead?: boolean;
	tableFilter?: TableFilter;
	selectedIds?: number[];
	unselectedIds?: number[];
	isAllSelected?: boolean;

    constructor(
    {
        notificationDTO,
		isMarkedAsRead,
		tableFilter,
		selectedIds,
		unselectedIds,
		isAllSelected
    }:{
        notificationDTO?: Notification;
		isMarkedAsRead?: boolean;
		tableFilter?: TableFilter;
		selectedIds?: number[];
		unselectedIds?: number[];
		isAllSelected?: boolean;     
    } = {}
    ) {
        super('NotificationSaveBody'); 

        this.notificationDTO = notificationDTO;
		this.isMarkedAsRead = isMarkedAsRead;
		this.tableFilter = tableFilter;
		this.selectedIds = selectedIds;
		this.unselectedIds = unselectedIds;
		this.isAllSelected = isAllSelected;
    }
}


export class PartnerUser extends BaseEntity
{
    points?: number;
	partnerDisplayName?: string;
	partnerId?: number;
	userDisplayName?: string;
	userId?: number;
	tierDisplayName?: string;
	tierId?: number;
	checkedSegmentationItemsCommaSeparated?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        points,
		partnerDisplayName,
		partnerId,
		userDisplayName,
		userId,
		tierDisplayName,
		tierId,
		checkedSegmentationItemsCommaSeparated,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        points?: number;
		partnerDisplayName?: string;
		partnerId?: number;
		userDisplayName?: string;
		userId?: number;
		tierDisplayName?: string;
		tierId?: number;
		checkedSegmentationItemsCommaSeparated?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerUser'); 

        this.points = points;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
		this.checkedSegmentationItemsCommaSeparated = checkedSegmentationItemsCommaSeparated;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class Brand extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	code?: string;
	pointsMultiplier?: number;

    constructor(
    {
        name,
		nameLatin,
		code,
		pointsMultiplier
    }:{
        name?: string;
		nameLatin?: string;
		code?: string;
		pointsMultiplier?: number;     
    } = {}
    ) {
        super('Brand'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.code = code;
		this.pointsMultiplier = pointsMultiplier;
    }
}


export class PartnerRolePartnerPermission extends BaseEntity
{
    partnerRoleDisplayName?: string;
	partnerRoleId?: number;
	partnerPermissionDisplayName?: string;
	partnerPermissionId?: number;

    constructor(
    {
        partnerRoleDisplayName,
		partnerRoleId,
		partnerPermissionDisplayName,
		partnerPermissionId
    }:{
        partnerRoleDisplayName?: string;
		partnerRoleId?: number;
		partnerPermissionDisplayName?: string;
		partnerPermissionId?: number;     
    } = {}
    ) {
        super('PartnerRolePartnerPermission'); 

        this.partnerRoleDisplayName = partnerRoleDisplayName;
		this.partnerRoleId = partnerRoleId;
		this.partnerPermissionDisplayName = partnerPermissionDisplayName;
		this.partnerPermissionId = partnerPermissionId;
    }
}


export class PartnerRolePartnerPermissionSaveBody extends BaseEntity
{
    partnerRolePartnerPermissionDTO?: PartnerRolePartnerPermission;

    constructor(
    {
        partnerRolePartnerPermissionDTO
    }:{
        partnerRolePartnerPermissionDTO?: PartnerRolePartnerPermission;     
    } = {}
    ) {
        super('PartnerRolePartnerPermissionSaveBody'); 

        this.partnerRolePartnerPermissionDTO = partnerRolePartnerPermissionDTO;
    }
}


export class MergedPartnerUser extends BaseEntity
{
    

    constructor(
    {
        
    }:{
             
    } = {}
    ) {
        super('MergedPartnerUser'); 

        
    }
}


export class OnlineShop extends BaseEntity
{
    transactionCode?: any;
	discount?: number;

    constructor(
    {
        transactionCode,
		discount
    }:{
        transactionCode?: any;
		discount?: number;     
    } = {}
    ) {
        super('OnlineShop'); 

        this.transactionCode = transactionCode;
		this.discount = discount;
    }
}


export class PartnerRole extends BaseEntity
{
    name?: string;
	description?: string;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		partnerDisplayName?: string;
		partnerId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerRole'); 

        this.name = name;
		this.description = description;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class PartnerRoleSaveBody extends BaseEntity
{
    partnerRoleDTO?: PartnerRole;
	selectedPermissionIds?: number[];
	selectedPartnerUserIds?: number[];

    constructor(
    {
        partnerRoleDTO,
		selectedPermissionIds,
		selectedPartnerUserIds
    }:{
        partnerRoleDTO?: PartnerRole;
		selectedPermissionIds?: number[];
		selectedPartnerUserIds?: number[];     
    } = {}
    ) {
        super('PartnerRoleSaveBody'); 

        this.partnerRoleDTO = partnerRoleDTO;
		this.selectedPermissionIds = selectedPermissionIds;
		this.selectedPartnerUserIds = selectedPartnerUserIds;
    }
}


export class Product extends BaseEntity
{
    id?: number;
	name?: string;
	description?: string;
	code?: string;
	price?: number;
	category?: string;
	linkToWebsite?: string;

    constructor(
    {
        id,
		name,
		description,
		code,
		price,
		category,
		linkToWebsite
    }:{
        id?: number;
		name?: string;
		description?: string;
		code?: string;
		price?: number;
		category?: string;
		linkToWebsite?: string;     
    } = {}
    ) {
        super('Product'); 

        this.id = id;
		this.name = name;
		this.description = description;
		this.code = code;
		this.price = price;
		this.category = category;
		this.linkToWebsite = linkToWebsite;
    }
}


export class BusinessSystemUpdatePointsDataBody extends BaseEntity
{
    businessSystemId?: number;
	businessSystemVersion?: number;
	updatePointsStartDate?: Date;
	updatePointsInterval?: number;

    constructor(
    {
        businessSystemId,
		businessSystemVersion,
		updatePointsStartDate,
		updatePointsInterval
    }:{
        businessSystemId?: number;
		businessSystemVersion?: number;
		updatePointsStartDate?: Date;
		updatePointsInterval?: number;     
    } = {}
    ) {
        super('BusinessSystemUpdatePointsDataBody'); 

        this.businessSystemId = businessSystemId;
		this.businessSystemVersion = businessSystemVersion;
		this.updatePointsStartDate = updatePointsStartDate;
		this.updatePointsInterval = updatePointsInterval;
    }
}


export class ExternalTransaction extends BaseEntity
{
    userEmail?: string;
	code?: string;
	productName?: string;
	productImageUrl?: string;
	productCategoryName?: string;
	productCategoryImageUrl?: string;
	price?: number;
	boughtAt?: Date;

    constructor(
    {
        userEmail,
		code,
		productName,
		productImageUrl,
		productCategoryName,
		productCategoryImageUrl,
		price,
		boughtAt
    }:{
        userEmail?: string;
		code?: string;
		productName?: string;
		productImageUrl?: string;
		productCategoryName?: string;
		productCategoryImageUrl?: string;
		price?: number;
		boughtAt?: Date;     
    } = {}
    ) {
        super('ExternalTransaction'); 

        this.userEmail = userEmail;
		this.code = code;
		this.productName = productName;
		this.productImageUrl = productImageUrl;
		this.productCategoryName = productCategoryName;
		this.productCategoryImageUrl = productCategoryImageUrl;
		this.price = price;
		this.boughtAt = boughtAt;
    }
}


export class PartnerUserPartnerRole extends BaseEntity
{
    partnerRoleDisplayName?: string;
	partnerRoleId?: number;
	partnerUserDisplayName?: string;
	partnerUserId?: number;

    constructor(
    {
        partnerRoleDisplayName,
		partnerRoleId,
		partnerUserDisplayName,
		partnerUserId
    }:{
        partnerRoleDisplayName?: string;
		partnerRoleId?: number;
		partnerUserDisplayName?: string;
		partnerUserId?: number;     
    } = {}
    ) {
        super('PartnerUserPartnerRole'); 

        this.partnerRoleDisplayName = partnerRoleDisplayName;
		this.partnerRoleId = partnerRoleId;
		this.partnerUserDisplayName = partnerUserDisplayName;
		this.partnerUserId = partnerUserId;
    }
}


export class PartnerUserPartnerRoleSaveBody extends BaseEntity
{
    partnerUserPartnerRoleDTO?: PartnerUserPartnerRole;

    constructor(
    {
        partnerUserPartnerRoleDTO
    }:{
        partnerUserPartnerRoleDTO?: PartnerUserPartnerRole;     
    } = {}
    ) {
        super('PartnerUserPartnerRoleSaveBody'); 

        this.partnerUserPartnerRoleDTO = partnerUserPartnerRoleDTO;
    }
}


export class Partner extends BaseEntity
{
    name?: string;
	email?: string;
	slug?: string;
	logoImageData?: string;
	logoImage?: string;
	primaryColor?: string;
	productsRecommendationEndpoint?: string;
	pointsMultiplier?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		email,
		slug,
		logoImageData,
		logoImage,
		primaryColor,
		productsRecommendationEndpoint,
		pointsMultiplier,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		email?: string;
		slug?: string;
		logoImageData?: string;
		logoImage?: string;
		primaryColor?: string;
		productsRecommendationEndpoint?: string;
		pointsMultiplier?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Partner'); 

        this.name = name;
		this.email = email;
		this.slug = slug;
		this.logoImageData = logoImageData;
		this.logoImage = logoImage;
		this.primaryColor = primaryColor;
		this.productsRecommendationEndpoint = productsRecommendationEndpoint;
		this.pointsMultiplier = pointsMultiplier;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class PartnerSaveBody extends BaseEntity
{
    partnerDTO?: Partner;

    constructor(
    {
        partnerDTO
    }:{
        partnerDTO?: Partner;     
    } = {}
    ) {
        super('PartnerSaveBody'); 

        this.partnerDTO = partnerDTO;
    }
}


export class Gender extends BaseEntity
{
    name?: string;
	id?: number;

    constructor(
    {
        name,
		id
    }:{
        name?: string;
		id?: number;     
    } = {}
    ) {
        super('Gender'); 

        this.name = name;
		this.id = id;
    }
}


export class GenderSaveBody extends BaseEntity
{
    genderDTO?: Gender;

    constructor(
    {
        genderDTO
    }:{
        genderDTO?: Gender;     
    } = {}
    ) {
        super('GenderSaveBody'); 

        this.genderDTO = genderDTO;
    }
}


export class UpdatePoints extends BaseEntity
{
    businessSystemId?: number;
	businessSystemVersion?: number;
	fromDate?: Date;
	toDate?: Date;

    constructor(
    {
        businessSystemId,
		businessSystemVersion,
		fromDate,
		toDate
    }:{
        businessSystemId?: number;
		businessSystemVersion?: number;
		fromDate?: Date;
		toDate?: Date;     
    } = {}
    ) {
        super('UpdatePoints'); 

        this.businessSystemId = businessSystemId;
		this.businessSystemVersion = businessSystemVersion;
		this.fromDate = fromDate;
		this.toDate = toDate;
    }
}


export class PartnerUserPartnerNotification extends BaseEntity
{
    partnerNotificationDisplayName?: string;
	partnerNotificationId?: number;
	partnerUserDisplayName?: string;
	partnerUserId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        partnerNotificationDisplayName,
		partnerNotificationId,
		partnerUserDisplayName,
		partnerUserId,
		isMarkedAsRead
    }:{
        partnerNotificationDisplayName?: string;
		partnerNotificationId?: number;
		partnerUserDisplayName?: string;
		partnerUserId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('PartnerUserPartnerNotification'); 

        this.partnerNotificationDisplayName = partnerNotificationDisplayName;
		this.partnerNotificationId = partnerNotificationId;
		this.partnerUserDisplayName = partnerUserDisplayName;
		this.partnerUserId = partnerUserId;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class PartnerUserPartnerNotificationSaveBody extends BaseEntity
{
    partnerUserPartnerNotificationDTO?: PartnerUserPartnerNotification;

    constructor(
    {
        partnerUserPartnerNotificationDTO
    }:{
        partnerUserPartnerNotificationDTO?: PartnerUserPartnerNotification;     
    } = {}
    ) {
        super('PartnerUserPartnerNotificationSaveBody'); 

        this.partnerUserPartnerNotificationDTO = partnerUserPartnerNotificationDTO;
    }
}


export class PartnerUserSegmentation extends BaseEntity
{
    partnerUserThatHasFilledSegmentationDisplayName?: string;
	partnerUserThatHasFilledSegmentationId?: number;
	alreadyFilledSegmentationDisplayName?: string;
	alreadyFilledSegmentationId?: number;

    constructor(
    {
        partnerUserThatHasFilledSegmentationDisplayName,
		partnerUserThatHasFilledSegmentationId,
		alreadyFilledSegmentationDisplayName,
		alreadyFilledSegmentationId
    }:{
        partnerUserThatHasFilledSegmentationDisplayName?: string;
		partnerUserThatHasFilledSegmentationId?: number;
		alreadyFilledSegmentationDisplayName?: string;
		alreadyFilledSegmentationId?: number;     
    } = {}
    ) {
        super('PartnerUserSegmentation'); 

        this.partnerUserThatHasFilledSegmentationDisplayName = partnerUserThatHasFilledSegmentationDisplayName;
		this.partnerUserThatHasFilledSegmentationId = partnerUserThatHasFilledSegmentationId;
		this.alreadyFilledSegmentationDisplayName = alreadyFilledSegmentationDisplayName;
		this.alreadyFilledSegmentationId = alreadyFilledSegmentationId;
    }
}


export class PartnerUserSegmentationSaveBody extends BaseEntity
{
    partnerUserSegmentationDTO?: PartnerUserSegmentation;

    constructor(
    {
        partnerUserSegmentationDTO
    }:{
        partnerUserSegmentationDTO?: PartnerUserSegmentation;     
    } = {}
    ) {
        super('PartnerUserSegmentationSaveBody'); 

        this.partnerUserSegmentationDTO = partnerUserSegmentationDTO;
    }
}


// FT HACK: Fake generated class, because of api imports
export class Namebook extends BaseEntity
{
    id?: number;
    displayName?: string;

    constructor(
    {
        id,
        displayName,
    }:{
        id?: number;
        displayName?: string;
    } = {}
    ) {
        super('Namebook');

        this.id = id;
        this.displayName = displayName;
    }
}

// FT HACK: Fake generated class, because of api imports
export class Codebook extends BaseEntity
{
    code?: string;
    displayName?: string;

    constructor(
    {
        code,
        displayName,
    }:{
        code?: string;
        displayName?: string;
    } = {}
    ) {
        super('Codebook');

        this.code = code;
        this.displayName = displayName;
    }
}

// FT HACK: Fake generated class, because of api imports
export class TableFilter extends BaseEntity
{
    filters?: Map<string, TableFilterContext[]>;
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: TableFilterSortMeta[];
    additionalFilterIdInt?: number;
    additionalFilterIdLong?: number;

    constructor(
    {
        filters,
        first,
        rows,
        sortField,
        sortOrder,
        multiSortMeta,
        additionalFilterIdInt,
        additionalFilterIdLong,
    }:{
        filters?: Map<string, TableFilterContext[]>;
        first?: number;
        rows?: number;
        sortField?: string;
        sortOrder?: number;
        multiSortMeta?: TableFilterSortMeta[];
        additionalFilterIdInt?: number;
        additionalFilterIdLong?: number;
    } = {}
    ) {
        super('TableFilter');

        this.filters = filters;
        this.first = first;
        this.rows = rows;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
        this.multiSortMeta = multiSortMeta;
        this.additionalFilterIdInt = additionalFilterIdInt;
        this.additionalFilterIdLong = additionalFilterIdLong;
    }
}

