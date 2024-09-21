import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";


export class TransactionStatus extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	code?: string;
	id?: number;
	createdAt?: Date;

    constructor(
    {
        name,
		nameLatin,
		code,
		id,
		createdAt
    }:{
        name?: string;
		nameLatin?: string;
		code?: string;
		id?: number;
		createdAt?: Date;     
    } = {}
    ) {
        super('TransactionStatus'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.code = code;
		this.id = id;
		this.createdAt = createdAt;
    }
}


export class Tier extends BaseEntity
{
    name?: string;
	nameLatin?: string;
	discount?: number;
	validFrom?: number;
	validTo?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		nameLatin,
		discount,
		validFrom,
		validTo,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		nameLatin?: string;
		discount?: number;
		validFrom?: number;
		validTo?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Tier'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.discount = discount;
		this.validFrom = validFrom;
		this.validTo = validTo;
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
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		nameLatin,
		code,
		pointsMultiplier,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		nameLatin?: string;
		code?: string;
		pointsMultiplier?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Brand'); 

        this.name = name;
		this.nameLatin = nameLatin;
		this.code = code;
		this.pointsMultiplier = pointsMultiplier;
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
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        guid,
		price,
		points,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        guid?: any;
		price?: number;
		points?: number;
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
	points?: number;
	tierDisplayName?: string;
	tierId?: number;
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
		points,
		tierDisplayName,
		tierId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		password?: string;
		hasLoggedInWithExternalProvider?: boolean;
		numberOfFailedAttemptsInARow?: number;
		points?: number;
		tierDisplayName?: string;
		tierId?: number;
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
		this.points = points;
		this.tierDisplayName = tierDisplayName;
		this.tierId = tierId;
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

