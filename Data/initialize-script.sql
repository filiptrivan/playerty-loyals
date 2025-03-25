-- FT: First you need to register the user in the app

begin transaction;
   
insert into Permission(Name, Description, Code) values(N'Pregled korisnika', null, N'ReadUserExtended');
insert into Permission(Name, Description, Code) values(N'Promena postojećih korisnika', null, N'UpdateUserExtended');
insert into Permission(Name, Description, Code) values(N'Brisanje korisnika', null, N'DeleteUserExtended');
insert into Permission(Name, Description, Code) values(N'Pregled notifikacija', null, N'ReadNotification');
insert into Permission(Name, Description, Code) values(N'Promena postojećih notifikacija', null, N'UpdateNotification');
insert into Permission(Name, Description, Code) values(N'Dodavanje novih notifikacija', null, N'InsertNotification');
insert into Permission(Name, Description, Code) values(N'Brisanje notifikacija', null, N'DeleteNotification');
insert into Permission(Name, Description, Code) values(N'Pregled uloga', null, N'ReadRole');
insert into Permission(Name, Description, Code) values(N'Promena postojećih uloga', null, N'UpdateRole');
insert into Permission(Name, Description, Code) values(N'Dodavanje novih uloga', null, N'InsertRole');
insert into Permission(Name, Description, Code) values(N'Brisanje uloga', null, N'DeleteRole');

INSERT INTO Role (Version, Name, CreatedAt, ModifiedAt) VALUES (1, N'Admin', getdate(), getdate());

DECLARE @AdminRoleId INT;
DECLARE @AdminUserId INT;
SELECT @AdminRoleId = Id FROM Role WHERE Name = N'Admin';
SELECT @AdminUserId = Id FROM [User] WHERE Id = 1;

INSERT INTO UserRole (UserId, RoleId) VALUES (@AdminUserId, @AdminRoleId);

INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 1);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 2);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 3);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 4);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 5);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 6);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 7);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 8);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 9);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 10);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 11);

commit;