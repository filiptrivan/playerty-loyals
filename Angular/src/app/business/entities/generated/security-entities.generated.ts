import { BaseEntity } from "../../../core/entities/base-entity";
import { TableFilterContext } from "src/app/core/entities/table-filter-context";
import { TableFilterSortMeta } from "src/app/core/entities/table-filter-sort-meta";
import { RegistrationVerificationResultStatusCodes } from "../../enums/generated/security-enums.generated";
export class ExternalProvider extends BaseEntity
{
    idToken?: string;
	browserId?: string;

    constructor(
    {
        idToken,
		browserId
    }:{
        idToken?: string;
		browserId?: string;     
    } = {}
    ) {
        super('ExternalProvider'); 

        this.idToken = idToken;
		this.browserId = browserId;
    }
}

export class RefreshTokenRequest extends BaseEntity
{
    refreshToken?: string;
	browserId?: string;

    constructor(
    {
        refreshToken,
		browserId
    }:{
        refreshToken?: string;
		browserId?: string;     
    } = {}
    ) {
        super('RefreshTokenRequest'); 

        this.refreshToken = refreshToken;
		this.browserId = browserId;
    }
}

export class VerificationTokenRequest extends BaseEntity
{
    verificationCode?: string;
	browserId?: string;
	email?: string;

    constructor(
    {
        verificationCode,
		browserId,
		email
    }:{
        verificationCode?: string;
		browserId?: string;
		email?: string;     
    } = {}
    ) {
        super('VerificationTokenRequest'); 

        this.verificationCode = verificationCode;
		this.browserId = browserId;
		this.email = email;
    }
}

export class User extends BaseEntity
{
    email?: string;
	password?: string;
	hasLoggedInWithExternalProvider?: boolean;
	numberOfFailedAttemptsInARow?: number;
	isVerified?: boolean;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	testColumnForGrid?: string;
	roles?: Role[];

    constructor(
    {
        email,
		password,
		hasLoggedInWithExternalProvider,
		numberOfFailedAttemptsInARow,
		isVerified,
		version,
		id,
		createdAt,
		modifiedAt,
		testColumnForGrid,
		roles
    }:{
        email?: string;
		password?: string;
		hasLoggedInWithExternalProvider?: boolean;
		numberOfFailedAttemptsInARow?: number;
		isVerified?: boolean;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		testColumnForGrid?: string;
		roles?: Role[];     
    } = {}
    ) {
        super('User'); 

        this.email = email;
		this.password = password;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.numberOfFailedAttemptsInARow = numberOfFailedAttemptsInARow;
		this.isVerified = isVerified;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.testColumnForGrid = testColumnForGrid;
		this.roles = roles;
    }
}

export class Permission extends BaseEntity
{
    name?: string;
	description?: string;
	id?: number;
	createdAt?: Date;

    constructor(
    {
        name,
		description,
		id,
		createdAt
    }:{
        name?: string;
		description?: string;
		id?: number;
		createdAt?: Date;     
    } = {}
    ) {
        super('Permission'); 

        this.name = name;
		this.description = description;
		this.id = id;
		this.createdAt = createdAt;
    }
}

export class Role extends BaseEntity
{
    name?: string;
	description?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Role'); 

        this.name = name;
		this.description = description;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}

export class RefreshToken extends BaseEntity
{
    email?: string;
	ipAddress?: string;
	browserId?: string;
	tokenString?: string;
	expireAt?: Date;

    constructor(
    {
        email,
		ipAddress,
		browserId,
		tokenString,
		expireAt
    }:{
        email?: string;
		ipAddress?: string;
		browserId?: string;
		tokenString?: string;
		expireAt?: Date;     
    } = {}
    ) {
        super('RefreshToken'); 

        this.email = email;
		this.ipAddress = ipAddress;
		this.browserId = browserId;
		this.tokenString = tokenString;
		this.expireAt = expireAt;
    }
}

export class ForgotPasswordVerificationToken extends BaseEntity
{
    email?: string;
	userId?: number;
	newPassword?: string;
	browserId?: string;
	expireAt?: Date;

    constructor(
    {
        email,
		userId,
		newPassword,
		browserId,
		expireAt
    }:{
        email?: string;
		userId?: number;
		newPassword?: string;
		browserId?: string;
		expireAt?: Date;     
    } = {}
    ) {
        super('ForgotPasswordVerificationToken'); 

        this.email = email;
		this.userId = userId;
		this.newPassword = newPassword;
		this.browserId = browserId;
		this.expireAt = expireAt;
    }
}

export class RegistrationVerificationResult extends BaseEntity
{
    status?: RegistrationVerificationResultStatusCodes;
	message?: string;

    constructor(
    {
        status,
		message
    }:{
        status?: RegistrationVerificationResultStatusCodes;
		message?: string;     
    } = {}
    ) {
        super('RegistrationVerificationResult'); 

        this.status = status;
		this.message = message;
    }
}

export class RegistrationVerificationToken extends BaseEntity
{
    email?: string;
	password?: string;
	browserId?: string;
	expireAt?: Date;

    constructor(
    {
        email,
		password,
		browserId,
		expireAt
    }:{
        email?: string;
		password?: string;
		browserId?: string;
		expireAt?: Date;     
    } = {}
    ) {
        super('RegistrationVerificationToken'); 

        this.email = email;
		this.password = password;
		this.browserId = browserId;
		this.expireAt = expireAt;
    }
}

export class Registration extends BaseEntity
{
    email?: string;
	password?: string;
	browserId?: string;

    constructor(
    {
        email,
		password,
		browserId
    }:{
        email?: string;
		password?: string;
		browserId?: string;     
    } = {}
    ) {
        super('Registration'); 

        this.email = email;
		this.password = password;
		this.browserId = browserId;
    }
}

export class Login extends BaseEntity
{
    email?: string;
	password?: string;
	browserId?: string;

    constructor(
    {
        email,
		password,
		browserId
    }:{
        email?: string;
		password?: string;
		browserId?: string;     
    } = {}
    ) {
        super('Login'); 

        this.email = email;
		this.password = password;
		this.browserId = browserId;
    }
}

export class LoginVerificationToken extends BaseEntity
{
    email?: string;
	userId?: number;
	browserId?: string;
	expireAt?: Date;

    constructor(
    {
        email,
		userId,
		browserId,
		expireAt
    }:{
        email?: string;
		userId?: number;
		browserId?: string;
		expireAt?: Date;     
    } = {}
    ) {
        super('LoginVerificationToken'); 

        this.email = email;
		this.userId = userId;
		this.browserId = browserId;
		this.expireAt = expireAt;
    }
}

export class ForgotPassword extends BaseEntity
{
    email?: string;
	newPassword?: string;
	browserId?: string;

    constructor(
    {
        email,
		newPassword,
		browserId
    }:{
        email?: string;
		newPassword?: string;
		browserId?: string;     
    } = {}
    ) {
        super('ForgotPassword'); 

        this.email = email;
		this.newPassword = newPassword;
		this.browserId = browserId;
    }
}

export class LoginResult extends BaseEntity
{
    userId?: number;
	email?: string;
	accessToken?: string;
	refreshToken?: string;

    constructor(
    {
        userId,
		email,
		accessToken,
		refreshToken
    }:{
        userId?: number;
		email?: string;
		accessToken?: string;
		refreshToken?: string;     
    } = {}
    ) {
        super('LoginResult'); 

        this.userId = userId;
		this.email = email;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
    }
}

export class JwtAuthResult extends BaseEntity
{
    userId?: number;
	userEmail?: string;
	accessToken?: string;
	token?: RefreshToken;

    constructor(
    {
        userId,
		userEmail,
		accessToken,
		token
    }:{
        userId?: number;
		userEmail?: string;
		accessToken?: string;
		token?: RefreshToken;     
    } = {}
    ) {
        super('JwtAuthResult'); 

        this.userId = userId;
		this.userEmail = userEmail;
		this.accessToken = accessToken;
		this.token = token;
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

