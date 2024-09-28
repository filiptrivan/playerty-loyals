begin tran
   
INSERT INTO Roles (Version, Name, CreatedAt, ModifiedAt) VALUES (1, N'Admin', getdate(), getdate());

insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read roles', N'Pregled uloga korisnika', null, null , getdate(), N'ReadRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit roles', N'Promena uloga korisnika', null, null , getdate(), N'EditRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Insert roles', N'Dodavanje uloga korisnika', null, null , getdate(), N'InsertRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete roles', N'Brisanje uloga korisnika', null, null , getdate(), N'DeleteRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read users', N'Pregled profila korisnika', null, null , getdate(), N'ReadUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit users', N'Promena profila korisnika', null, null , getdate(), N'EditUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete users', N'Brisanje profila korisnika', null, null , getdate(), N'DeleteUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read permissions', N'Pregled permisija uloga', null, null , getdate(), N'ReadPermission');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read tiers', N'Pregled nivoa odanosti', null, null , getdate(), N'ReadTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit tiers', N'Promena nivoa odanosti', null, null , getdate(), N'EditTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Insert tiers', N'Dodavanje nivoa odanosti', null, null , getdate(), N'InsertTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete tiers', N'Brisanje nivoa odanosti', null, null , getdate(), N'DeleteTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read transactions', N'Pregled transakcija', null, null , getdate(), N'ReadTransaction');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read transaction products', N'Pregled proizvoda iz transakcije', null, null , getdate(), N'ReadTransactionProduct');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read transaction statuses', N'Pregled statusa transakcije', null, null , getdate(), N'ReadTransactionStatus');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read notifications', N'Pregled notifikacija', null, null , getdate(), N'ReadNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit notifications', N'Promena notifikacija', null, null , getdate(), N'EditNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Insert notifications', N'Dodavanje notifikacija', null, null , getdate(), N'InsertNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete notifications', N'Brisanje notifikacija', null, null , getdate(), N'DeleteNotification');

declare @AfterHash varbinary(500) = HASHBYTES('SHA2_512', 'Test.123')
select @afterhash as varbinaryValue, convert(nvarchar(1000), @afterhash, 2) as nvarcharExcludePrefix

INSERT INTO Users (Email, Password, HasLoggedInWithExternalProvider, NumberOfFailedAttemptsInARow, Version, CreatedAt, ModifiedAt, TierId) 
VALUES (N'filiptrivan5@gmail.com', @AfterHash, 0, 0, 1, getdate(), getdate(), null);

INSERT INTO Partners (Name, Version, UpdatePointsInterval, CreatedAt, ModifiedAt) 
VALUES (N'Stridon Group', 1, 0, getdate(), getdate());

INSERT INTO PartnerUser (UserId, PartnerId, Points, Version, CreatedAt, ModifiedAt, TierId) 
VALUES (1, 2, 0, 1, getdate(), getdate(), null);

DECLARE @AdminRoleId INT;
DECLARE @AdminUserId INT;

SELECT @AdminRoleId = Id FROM Roles WHERE Name = N'Admin';
SELECT @AdminUserId = Id FROM Users WHERE Email = N'filiptrivan5@gmail.com';

INSERT INTO RoleUser (UsersId, RolesId) VALUES (@AdminUserId, @AdminRoleId);

INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 1);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 2);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 3);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 4);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 5);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 6);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 7);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 8);

DECLARE @aafterhash VARBINARY(500);
DECLARE @nvarcharExcludePrefix NVARCHAR(1000);
SET @aafterhash = HASHBYTES('SHA2_256', 'Test.123');
SET @nvarcharExcludePrefix = CONVERT(NVARCHAR(1000), @aafterhash, 2);
UPDATE Users SET Password = @nvarcharExcludePrefix;

commit