import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";
import { MimeTypes } from "src/app/core/entities/mime-type";


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


export class StoreTierDiscountCategory extends BaseEntity
{
    storeTiersId?: number;
	discountCategoriesId?: number;
	discount?: number;

    constructor(
    {
        storeTiersId,
		discountCategoriesId,
		discount
    }:{
        storeTiersId?: number;
		discountCategoriesId?: number;
		discount?: number;     
    } = {}
    ) {
        super('StoreTierDiscountCategory'); 

        this.storeTiersId = storeTiersId;
		this.discountCategoriesId = discountCategoriesId;
		this.discount = discount;
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


export class TransactionStatus extends BaseEntity
{
    name?: string;
	code?: string;
	id?: number;

    constructor(
    {
        name,
		code,
		id
    }:{
        name?: string;
		code?: string;
		id?: number;     
    } = {}
    ) {
        super('TransactionStatus'); 

        this.name = name;
		this.code = code;
		this.id = id;
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


export class TransactionProduct extends BaseEntity
{
    productId?: number;
	transactionDisplayName?: string;
	transactionId?: number;
	id?: number;

    constructor(
    {
        productId,
		transactionDisplayName,
		transactionId,
		id
    }:{
        productId?: number;
		transactionDisplayName?: string;
		transactionId?: number;
		id?: number;     
    } = {}
    ) {
        super('TransactionProduct'); 

        this.productId = productId;
		this.transactionDisplayName = transactionDisplayName;
		this.transactionId = transactionId;
		this.id = id;
    }
}


export class SegmentationItem extends BaseEntity
{
    checked?: boolean;
	name?: string;
	orderNumber?: number;
	segmentationDisplayName?: string;
	segmentationId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        checked,
		name,
		orderNumber,
		segmentationDisplayName,
		segmentationId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        checked?: boolean;
		name?: string;
		orderNumber?: number;
		segmentationDisplayName?: string;
		segmentationId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('SegmentationItem'); 

        this.checked = checked;
		this.name = name;
		this.orderNumber = orderNumber;
		this.segmentationDisplayName = segmentationDisplayName;
		this.segmentationId = segmentationId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
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


export class DiscountCategory extends BaseEntity
{
    discount?: number;
	selectedForStore?: boolean;
	name?: string;
	code?: string;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        discount,
		selectedForStore,
		name,
		code,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        discount?: number;
		selectedForStore?: boolean;
		name?: string;
		code?: string;
		partnerDisplayName?: string;
		partnerId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('DiscountCategory'); 

        this.discount = discount;
		this.selectedForStore = selectedForStore;
		this.name = name;
		this.code = code;
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


export class TierSaveBody extends BaseEntity
{
    tierDTOList?: Tier[];
	storeTierDTOList?: StoreTier[];

    constructor(
    {
        tierDTOList,
		storeTierDTOList
    }:{
        tierDTOList?: Tier[];
		storeTierDTOList?: StoreTier[];     
    } = {}
    ) {
        super('TierSaveBody'); 

        this.tierDTOList = tierDTOList;
		this.storeTierDTOList = storeTierDTOList;
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


export class Store extends BaseEntity
{
    name?: string;
	updatePointsInterval?: number;
	loadPurchasesEndpoint?: string;
	loadReversalsEndpoint?: string;
	createUserEndpoint?: string;
	updateUserGroupEndpoint?: string;
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
		loadPurchasesEndpoint,
		loadReversalsEndpoint,
		createUserEndpoint,
		updateUserGroupEndpoint,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		updatePointsInterval?: number;
		loadPurchasesEndpoint?: string;
		loadReversalsEndpoint?: string;
		createUserEndpoint?: string;
		updateUserGroupEndpoint?: string;
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
		this.loadPurchasesEndpoint = loadPurchasesEndpoint;
		this.loadReversalsEndpoint = loadReversalsEndpoint;
		this.createUserEndpoint = createUserEndpoint;
		this.updateUserGroupEndpoint = updateUserGroupEndpoint;
		this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
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


export class StoreTier extends BaseEntity
{
    storeDisplayName?: string;
	storeId?: number;
	tierDisplayName?: string;
	tierId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        storeDisplayName,
		storeId,
		tierDisplayName,
		tierId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        storeDisplayName?: string;
		storeId?: number;
		tierDisplayName?: string;
		tierId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('StoreTier'); 

        this.storeDisplayName = storeDisplayName;
		this.storeId = storeId;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
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
    guid?: any;
	price?: number;
	points?: number;
	userDisplayName?: string;
	userId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        guid,
		price,
		points,
		userDisplayName,
		userId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        guid?: any;
		price?: number;
		points?: number;
		userDisplayName?: string;
		userId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Transaction'); 

        this.guid = guid;
		this.price = price;
		this.points = points;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
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


export class Partner extends BaseEntity
{
    name?: string;
	slug?: string;
	logoImageData?: string;
	logoImage?: string;
	primaryColor?: string;
	productsRecommendationEndpoint?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		slug,
		logoImageData,
		logoImage,
		primaryColor,
		productsRecommendationEndpoint,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		slug?: string;
		logoImageData?: string;
		logoImage?: string;
		primaryColor?: string;
		productsRecommendationEndpoint?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Partner'); 

        this.name = name;
		this.slug = slug;
		this.logoImageData = logoImageData;
		this.logoImage = logoImage;
		this.primaryColor = primaryColor;
		this.productsRecommendationEndpoint = productsRecommendationEndpoint;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
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

