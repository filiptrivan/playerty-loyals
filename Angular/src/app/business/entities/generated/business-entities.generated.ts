import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";
import { MimeTypes } from "src/app/core/entities/mime-type";


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


export class PartnerNotificationSaveBody extends BaseEntity
{
    partnerNotificationDTO?: PartnerNotification;
	isMarkedAsRead?: boolean;
	tableFilter?: TableFilter;
	selectedIds?: number[];
	unselectedIds?: number[];
	isAllSelected?: boolean;

    constructor(
    {
        partnerNotificationDTO,
		isMarkedAsRead,
		tableFilter,
		selectedIds,
		unselectedIds,
		isAllSelected
    }:{
        partnerNotificationDTO?: PartnerNotification;
		isMarkedAsRead?: boolean;
		tableFilter?: TableFilter;
		selectedIds?: number[];
		unselectedIds?: number[];
		isAllSelected?: boolean;     
    } = {}
    ) {
        super('PartnerNotificationSaveBody'); 

        this.partnerNotificationDTO = partnerNotificationDTO;
		this.isMarkedAsRead = isMarkedAsRead;
		this.tableFilter = tableFilter;
		this.selectedIds = selectedIds;
		this.unselectedIds = unselectedIds;
		this.isAllSelected = isAllSelected;
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


export class StoreTier extends BaseEntity
{
    orderNumber?: number;
	storeDisplayName?: string;
	storeId?: number;
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
		storeDisplayName,
		storeId,
		tierDisplayName,
		tierId,
		version,
		id,
		createdAt,
		modifiedAt,
		tierClientIndex
    }:{
        orderNumber?: number;
		storeDisplayName?: string;
		storeId?: number;
		tierDisplayName?: string;
		tierId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		tierClientIndex?: number;     
    } = {}
    ) {
        super('StoreTier'); 

        this.orderNumber = orderNumber;
		this.storeDisplayName = storeDisplayName;
		this.storeId = storeId;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.tierClientIndex = tierClientIndex;
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


export class PartnerNotificationPartnerUser extends BaseEntity
{
    partnerNotificationsId?: number;
	partnerUsersId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        partnerNotificationsId,
		partnerUsersId,
		isMarkedAsRead
    }:{
        partnerNotificationsId?: number;
		partnerUsersId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('PartnerNotificationPartnerUser'); 

        this.partnerNotificationsId = partnerNotificationsId;
		this.partnerUsersId = partnerUsersId;
		this.isMarkedAsRead = isMarkedAsRead;
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


export class StoreTierDiscountCategory extends BaseEntity
{
    id?: number;
	storeId?: number;
	selectedForStore?: boolean;
	storeTierClientIndex?: number;
	tierClientIndex?: number;
	storeTierDisplayName?: string;
	storeTierId?: number;
	discountCategoryDisplayName?: string;
	discountCategoryId?: number;
	discount?: number;

    constructor(
    {
        id,
		storeId,
		selectedForStore,
		storeTierClientIndex,
		tierClientIndex,
		storeTierDisplayName,
		storeTierId,
		discountCategoryDisplayName,
		discountCategoryId,
		discount
    }:{
        id?: number;
		storeId?: number;
		selectedForStore?: boolean;
		storeTierClientIndex?: number;
		tierClientIndex?: number;
		storeTierDisplayName?: string;
		storeTierId?: number;
		discountCategoryDisplayName?: string;
		discountCategoryId?: number;
		discount?: number;     
    } = {}
    ) {
        super('StoreTierDiscountCategory'); 

        this.id = id;
		this.storeId = storeId;
		this.selectedForStore = selectedForStore;
		this.storeTierClientIndex = storeTierClientIndex;
		this.tierClientIndex = tierClientIndex;
		this.storeTierDisplayName = storeTierDisplayName;
		this.storeTierId = storeTierId;
		this.discountCategoryDisplayName = discountCategoryDisplayName;
		this.discountCategoryId = discountCategoryId;
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
	storeDisplayName?: string;
	storeId?: number;
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
		storeDisplayName,
		storeId,
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
		storeDisplayName?: string;
		storeId?: number;
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
		this.storeDisplayName = storeDisplayName;
		this.storeId = storeId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class Store extends BaseEntity
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
        super('Store'); 

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


export class ExternalDiscountCategory extends BaseEntity
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
        super('ExternalDiscountCategory'); 

        this.name = name;
		this.code = code;
    }
}


export class PartnerUserSaveBody extends BaseEntity
{
    userExtendedDTO?: UserExtended;
	selectedRoleIds?: number[];
	partnerUserDTO?: PartnerUser;
	selectedPartnerRoleIds?: number[];
	selectedSegmentationItemIds?: number[];

    constructor(
    {
        userExtendedDTO,
		selectedRoleIds,
		partnerUserDTO,
		selectedPartnerRoleIds,
		selectedSegmentationItemIds
    }:{
        userExtendedDTO?: UserExtended;
		selectedRoleIds?: number[];
		partnerUserDTO?: PartnerUser;
		selectedPartnerRoleIds?: number[];
		selectedSegmentationItemIds?: number[];     
    } = {}
    ) {
        super('PartnerUserSaveBody'); 

        this.userExtendedDTO = userExtendedDTO;
		this.selectedRoleIds = selectedRoleIds;
		this.partnerUserDTO = partnerUserDTO;
		this.selectedPartnerRoleIds = selectedPartnerRoleIds;
		this.selectedSegmentationItemIds = selectedSegmentationItemIds;
    }
}


export class StoreSaveBody extends BaseEntity
{
    storeDTO?: Store;

    constructor(
    {
        storeDTO
    }:{
        storeDTO?: Store;     
    } = {}
    ) {
        super('StoreSaveBody'); 

        this.storeDTO = storeDTO;
    }
}


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


export class DiscountCategory extends BaseEntity
{
    name?: string;
	code?: string;
	storeDisplayName?: string;
	storeId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		code,
		storeDisplayName,
		storeId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		code?: string;
		storeDisplayName?: string;
		storeId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('DiscountCategory'); 

        this.name = name;
		this.code = code;
		this.storeDisplayName = storeDisplayName;
		this.storeId = storeId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class StoreUpdatePointsScheduledTask extends BaseEntity
{
    transactionsFrom?: Date;
	transactionsTo?: Date;
	isManual?: boolean;
	storeDisplayName?: string;
	storeId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        transactionsFrom,
		transactionsTo,
		isManual,
		storeDisplayName,
		storeId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        transactionsFrom?: Date;
		transactionsTo?: Date;
		isManual?: boolean;
		storeDisplayName?: string;
		storeId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('StoreUpdatePointsScheduledTask'); 

        this.transactionsFrom = transactionsFrom;
		this.transactionsTo = transactionsTo;
		this.isManual = isManual;
		this.storeDisplayName = storeDisplayName;
		this.storeId = storeId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UpdatePoints extends BaseEntity
{
    storeId?: number;
	storeVersion?: number;
	fromDate?: Date;
	toDate?: Date;

    constructor(
    {
        storeId,
		storeVersion,
		fromDate,
		toDate
    }:{
        storeId?: number;
		storeVersion?: number;
		fromDate?: Date;
		toDate?: Date;     
    } = {}
    ) {
        super('UpdatePoints'); 

        this.storeId = storeId;
		this.storeVersion = storeVersion;
		this.fromDate = fromDate;
		this.toDate = toDate;
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


export class StoreUpdatePointsDataBody extends BaseEntity
{
    storeId?: number;
	storeVersion?: number;
	updatePointsStartDate?: Date;
	updatePointsInterval?: number;

    constructor(
    {
        storeId,
		storeVersion,
		updatePointsStartDate,
		updatePointsInterval
    }:{
        storeId?: number;
		storeVersion?: number;
		updatePointsStartDate?: Date;
		updatePointsInterval?: number;     
    } = {}
    ) {
        super('StoreUpdatePointsDataBody'); 

        this.storeId = storeId;
		this.storeVersion = storeVersion;
		this.updatePointsStartDate = updatePointsStartDate;
		this.updatePointsInterval = updatePointsInterval;
    }
}


export class NotificationUser extends BaseEntity
{
    notificationsId?: number;
	usersId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationsId,
		usersId,
		isMarkedAsRead
    }:{
        notificationsId?: number;
		usersId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('NotificationUser'); 

        this.notificationsId = notificationsId;
		this.usersId = usersId;
		this.isMarkedAsRead = isMarkedAsRead;
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


export class TierSaveBody extends BaseEntity
{
    tierDTOList?: Tier[];
	storeTierDTOList?: StoreTier[];
	storeTierDiscountCategoryDTOList?: StoreTierDiscountCategory[];

    constructor(
    {
        tierDTOList,
		storeTierDTOList,
		storeTierDiscountCategoryDTOList
    }:{
        tierDTOList?: Tier[];
		storeTierDTOList?: StoreTier[];
		storeTierDiscountCategoryDTOList?: StoreTierDiscountCategory[];     
    } = {}
    ) {
        super('TierSaveBody'); 

        this.tierDTOList = tierDTOList;
		this.storeTierDTOList = storeTierDTOList;
		this.storeTierDiscountCategoryDTOList = storeTierDiscountCategoryDTOList;
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

