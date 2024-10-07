import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";


export class UserExtended extends BaseEntity
{
    testDisplayName?: string;
	testttttDN?: string;
	email?: string;
	password?: string;
	hasLoggedInWithExternalProvider?: boolean;
	numberOfFailedAttemptsInARow?: number;
	genderDisplayName?: string;
	genderId?: number;
	birthDate?: any;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        testDisplayName,
		testttttDN,
		email,
		password,
		hasLoggedInWithExternalProvider,
		numberOfFailedAttemptsInARow,
		genderDisplayName,
		genderId,
		birthDate,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        testDisplayName?: string;
		testttttDN?: string;
		email?: string;
		password?: string;
		hasLoggedInWithExternalProvider?: boolean;
		numberOfFailedAttemptsInARow?: number;
		genderDisplayName?: string;
		genderId?: number;
		birthDate?: any;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('UserExtended'); 

        this.testDisplayName = testDisplayName;
		this.testttttDN = testttttDN;
		this.email = email;
		this.password = password;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.numberOfFailedAttemptsInARow = numberOfFailedAttemptsInARow;
		this.genderDisplayName = genderDisplayName;
		this.genderId = genderId;
		this.birthDate = birthDate;
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


export class PartnerNotificationSaveBody extends BaseEntity
{
    partnerNotificationDTO?: PartnerNotification;
	isMarkedAsRead?: boolean;
	selectedPartnerUserIds?: number[];

    constructor(
    {
        partnerNotificationDTO,
		isMarkedAsRead,
		selectedPartnerUserIds
    }:{
        partnerNotificationDTO?: PartnerNotification;
		isMarkedAsRead?: boolean;
		selectedPartnerUserIds?: number[];     
    } = {}
    ) {
        super('PartnerNotificationSaveBody'); 

        this.partnerNotificationDTO = partnerNotificationDTO;
		this.isMarkedAsRead = isMarkedAsRead;
		this.selectedPartnerUserIds = selectedPartnerUserIds;
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


export class PartnerUserSaveBody extends BaseEntity
{
    userExtendedDTO?: UserExtended;
	selectedRoleIds?: number[];
	partnerUserDTO?: PartnerUser;
	selectedPartnerRoleIds?: number[];

    constructor(
    {
        userExtendedDTO,
		selectedRoleIds,
		partnerUserDTO,
		selectedPartnerRoleIds
    }:{
        userExtendedDTO?: UserExtended;
		selectedRoleIds?: number[];
		partnerUserDTO?: PartnerUser;
		selectedPartnerRoleIds?: number[];     
    } = {}
    ) {
        super('PartnerUserSaveBody'); 

        this.userExtendedDTO = userExtendedDTO;
		this.selectedRoleIds = selectedRoleIds;
		this.partnerUserDTO = partnerUserDTO;
		this.selectedPartnerRoleIds = selectedPartnerRoleIds;
    }
}


export class Product extends BaseEntity
{
    id?: number;
	name?: string;
	code?: string;
	price?: number;
	brand?: Brand;

    constructor(
    {
        id,
		name,
		code,
		price,
		brand
    }:{
        id?: number;
		name?: string;
		code?: string;
		price?: number;
		brand?: Brand;     
    } = {}
    ) {
        super('Product'); 

        this.id = id;
		this.name = name;
		this.code = code;
		this.price = price;
		this.brand = brand;
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


export class Gender extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	id?: number;

    constructor(
    {
        name,
		nameLatin,
		id
    }:{
        name?: string;
		nameLatin?: string;
		id?: number;     
    } = {}
    ) {
        super('Gender'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.id = id;
    }
}


export class Partner extends BaseEntity
{
    name?: string;
	slug?: string;
	loadPurchasesEndpoint?: string;
	loadReversalsEndpoint?: string;
	updatePointsInterval?: any;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		slug,
		loadPurchasesEndpoint,
		loadReversalsEndpoint,
		updatePointsInterval,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		slug?: string;
		loadPurchasesEndpoint?: string;
		loadReversalsEndpoint?: string;
		updatePointsInterval?: any;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Partner'); 

        this.name = name;
		this.slug = slug;
		this.loadPurchasesEndpoint = loadPurchasesEndpoint;
		this.loadReversalsEndpoint = loadReversalsEndpoint;
		this.updatePointsInterval = updatePointsInterval;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class PartnerNotification extends BaseEntity
{
    partnerDisplayName?: string;
	partnerId?: number;
	title?: string;
	titleLatin?: string;
	description?: string;
	descriptionLatin?: string;
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
		titleLatin,
		description,
		descriptionLatin,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        partnerDisplayName?: string;
		partnerId?: number;
		title?: string;
		titleLatin?: string;
		description?: string;
		descriptionLatin?: string;
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
		this.titleLatin = titleLatin;
		this.description = description;
		this.descriptionLatin = descriptionLatin;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
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


export class PartnerRole extends BaseEntity
{
    partnerDisplayName?: string;
	partnerId?: number;
	name?: string;
	description?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        partnerDisplayName,
		partnerId,
		name,
		description,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        partnerDisplayName?: string;
		partnerId?: number;
		name?: string;
		description?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerRole'); 

        this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.name = name;
		this.description = description;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class PartnerUser extends BaseEntity
{
    partnerDisplayName?: string;
	partnerId?: number;
	points?: number;
	tierDisplayName?: string;
	tierId?: number;
	userDisplayName?: string;
	userId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        partnerDisplayName,
		partnerId,
		points,
		tierDisplayName,
		tierId,
		userDisplayName,
		userId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        partnerDisplayName?: string;
		partnerId?: number;
		points?: number;
		tierDisplayName?: string;
		tierId?: number;
		userDisplayName?: string;
		userId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerUser'); 

        this.partnerDisplayName = partnerDisplayName;
		this.partnerId = partnerId;
		this.points = points;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class PartnerUserSegmentation extends BaseEntity
{
    isFilledFirstTime?: boolean;
	partnerUserDisplayName?: string;
	partnerUserId?: number;
	segmentationDisplayName?: string;
	segmentationId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        isFilledFirstTime,
		partnerUserDisplayName,
		partnerUserId,
		segmentationDisplayName,
		segmentationId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        isFilledFirstTime?: boolean;
		partnerUserDisplayName?: string;
		partnerUserId?: number;
		segmentationDisplayName?: string;
		segmentationId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('PartnerUserSegmentation'); 

        this.isFilledFirstTime = isFilledFirstTime;
		this.partnerUserDisplayName = partnerUserDisplayName;
		this.partnerUserId = partnerUserId;
		this.segmentationDisplayName = segmentationDisplayName;
		this.segmentationId = segmentationId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class Segmentation extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	description?: string;
	descriptionLatin?: string;
	pointsForFirstTimeFill?: number;
	partnerDisplayName?: string;
	partnerId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		nameLatin,
		description,
		descriptionLatin,
		pointsForFirstTimeFill,
		partnerDisplayName,
		partnerId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		nameLatin?: string;
		description?: string;
		descriptionLatin?: string;
		pointsForFirstTimeFill?: number;
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
		this.nameLatin = nameLatin;
		this.description = description;
		this.descriptionLatin = descriptionLatin;
		this.pointsForFirstTimeFill = pointsForFirstTimeFill;
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

    constructor(
    {
        name,
		orderNumber,
		segmentationDisplayName,
		segmentationId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
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


export class Tier extends BaseEntity
{
    name?: string;
	nameLatin?: string;
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
		nameLatin,
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
		nameLatin?: string;
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
		this.nameLatin = nameLatin;
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


export class TransactionStatus extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	code?: string;
	id?: number;

    constructor(
    {
        name,
		nameLatin,
		code,
		id
    }:{
        name?: string;
		nameLatin?: string;
		code?: string;
		id?: number;     
    } = {}
    ) {
        super('TransactionStatus'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.code = code;
		this.id = id;
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

    constructor(
    {
        filters,
        first,
        rows,
        sortField,
        sortOrder,
        multiSortMeta
    }:{
        filters?: Map<string, TableFilterContext[]>;
        first?: number;
        rows?: number;
        sortField?: string;
        sortOrder?: number;
        multiSortMeta?: TableFilterSortMeta[];
    } = {}
    ) {
        super('TableFilter');

        this.filters = filters;
        this.first = first;
        this.rows = rows;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
        this.multiSortMeta = multiSortMeta;
    }
}

