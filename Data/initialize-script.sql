begin tran
   
INSERT INTO Roles (Version, Name, CreatedAt, ModifiedAt, Discriminator) VALUES (1, N'Admin', getdate(), getdate(), 'Role');

insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read roles', N'Pregled uloga korisnika', null, null ,  N'ReadRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Edit roles', N'Promena uloga korisnika', null, null ,  N'EditRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Insert roles', N'Dodavanje uloga korisnika', null, null ,  N'InsertRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Delete roles', N'Brisanje uloga korisnika', null, null ,  N'DeleteRole');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read users', N'Pregled profila korisnika', null, null ,  N'ReadUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Edit users', N'Promena profila korisnika', null, null ,  N'EditUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Delete users', N'Brisanje profila korisnika', null, null ,  N'DeleteUserExtended');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read permissions', N'Pregled permisija uloga', null, null ,  N'ReadPermission');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read tiers', N'Pregled nivoa odanosti', null, null ,  N'ReadTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Edit tiers', N'Promena nivoa odanosti', null, null ,  N'EditTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Insert tiers', N'Dodavanje nivoa odanosti', null, null ,  N'InsertTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Delete tiers', N'Brisanje nivoa odanosti', null, null ,  N'DeleteTier');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read transactions', N'Pregled transakcija', null, null ,  N'ReadTransaction');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read transaction products', N'Pregled proizvoda iz transakcije', null, null ,  N'ReadTransactionProduct');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read transaction statuses', N'Pregled statusa transakcije', null, null ,  N'ReadTransactionStatus');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Read notifications', N'Pregled notifikacija', null, null ,  N'ReadNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Edit notifications', N'Promena notifikacija', null, null ,  N'EditNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Insert notifications', N'Dodavanje notifikacija', null, null ,  N'InsertNotification');
insert into Permissions(Name, NameLatin, Description, DescriptionLatin, Code) values(N'Delete notifications', N'Brisanje notifikacija', null, null ,  N'DeleteNotification');

insert into Genders(Name, NameLatin) values(N'Male', N'Muški');
insert into Genders(Name, NameLatin) values(N'Female', N'Ženski');

declare @AfterHash varbinary(500) = HASHBYTES('SHA2_512', 'Test.123')
select @afterhash as varbinaryValue, convert(nvarchar(1000), @afterhash, 2) as nvarcharExcludePrefix
INSERT INTO Users (Email, Password, HasLoggedInWithExternalProvider, NumberOfFailedAttemptsInARow, Version, CreatedAt, ModifiedAt) 
VALUES (N'filiptrivan5@gmail.com', @AfterHash, 0, 0, 1, getdate(), getdate(), null);

INSERT INTO Partners (Name, Version, UpdatePointsInterval, CreatedAt, ModifiedAt, Slug) -- Check why the unique attribute didn't make slug unique
VALUES (N'Prodavnica Alata', 1, 0, getdate(), getdate(), 'prodavnica-alata');

INSERT INTO PartnerUser (UserId, PartnerId, Points, TierId)  -- Maybe add version to the PartnerUser
VALUES (1, 1, 0, null);

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