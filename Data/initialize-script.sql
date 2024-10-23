begin tran
   
INSERT INTO Roles (Version, Name, CreatedAt, ModifiedAt, Discriminator) VALUES (1, N'Admin', getdate(), getdate(), 'Role');

insert into Permissions(Name, Description, Code) values(N'Pregled uloga korisnika', null ,  N'ReadRole');
insert into Permissions(Name, Description, Code) values(N'Promena uloga korisnika', null ,  N'EditRole');
insert into Permissions(Name, Description, Code) values(N'Dodavanje uloga korisnika', null ,  N'InsertRole');
insert into Permissions(Name, Description, Code) values(N'Brisanje uloga korisnika', null ,  N'DeleteRole');
insert into Permissions(Name, Description, Code) values(N'Pregled profila korisnika', null ,  N'ReadUserExtended');
insert into Permissions(Name, Description, Code) values(N'Promena profila korisnika', null ,  N'EditUserExtended');
insert into Permissions(Name, Description, Code) values(N'Brisanje profila korisnika', null ,  N'DeleteUserExtended');
insert into Permissions(Name, Description, Code) values(N'Pregled permisija uloga', null ,  N'ReadPermission');
insert into Permissions(Name, Description, Code) values(N'Pregled nivoa odanosti', null ,  N'ReadTier');
insert into Permissions(Name, Description, Code) values(N'Promena nivoa odanosti', null ,  N'EditTier');
insert into Permissions(Name, Description, Code) values(N'Dodavanje nivoa odanosti', null ,  N'InsertTier');
insert into Permissions(Name, Description, Code) values(N'Brisanje nivoa odanosti',null ,  N'DeleteTier');
insert into Permissions(Name, Description, Code) values(N'Pregled transakcija', null ,  N'ReadTransaction');
insert into Permissions(Name, Description, Code) values(N'Pregled proizvoda iz transakcije', null ,  N'ReadTransactionProduct');
insert into Permissions(Name, Description, Code) values(N'Pregled statusa transakcije', null ,  N'ReadTransactionStatus');
insert into Permissions(Name, Description, Code) values(N'Pregled notifikacija', null ,  N'ReadNotification');
insert into Permissions(Name, Description, Code) values(N'Promena notifikacija', null ,  N'EditNotification');
insert into Permissions(Name, Description, Code) values(N'Dodavanje notifikacija', null ,  N'InsertNotification');
insert into Permissions(Name, Description, Code) values(N'Brisanje notifikacija', null ,  N'DeleteNotification');

insert into Genders(Name) values(N'Muški');
insert into Genders(Name) values(N'Ženski');

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

commit