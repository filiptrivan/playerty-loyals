import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";


export class UserExtended extends BaseEntity
{
    email?: string;
	password?: string;
	hasLoggedInWithExternalProvider?: boolean;
	numberOfFailedAttemptsInARow?: number;
	points?: number;
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

