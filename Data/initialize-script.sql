begin transaction;
   
INSERT INTO Roles (Version, Name, CreatedAt, ModifiedAt) VALUES (1, N'Admin', getdate(), getdate());

insert into Permissions(Name, Description, Code) values(N'Pregled korisnika', null, N'ReadUserExtended');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih korisnika', null, N'EditUserExtended');
insert into Permissions(Name, Description, Code) values(N'Brisanje korisnika', null, N'DeleteUserExtended');
insert into Permissions(Name, Description, Code) values(N'Pregled notifikacija', null, N'ReadNotification');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih notifikacija', null, N'EditNotification');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih notifikacija', null, N'InsertNotification');
insert into Permissions(Name, Description, Code) values(N'Brisanje notifikacija', null, N'DeleteNotification');
insert into Permissions(Name, Description, Code) values(N'Pregled partnera', null, N'ReadPartner');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih partnera', null, N'EditPartner');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih partnera', null, N'InsertPartner');
insert into Permissions(Name, Description, Code) values(N'Brisanje partnera', null, N'DeletePartner');
insert into Permissions(Name, Description, Code) values(N'Pregled uloga', null, N'ReadRole');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih uloga', null, N'EditRole');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih uloga', null, N'InsertRole');
insert into Permissions(Name, Description, Code) values(N'Brisanje uloga', null, N'DeleteRole');

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
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 9);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 10);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 11);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 12);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 13);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 14);
INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 15);

commit;