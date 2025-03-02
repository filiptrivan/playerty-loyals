-- FT: First you need to register the user in the app and add permissions

begin transaction;
   
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
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 12);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 13);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 14);
INSERT INTO RolePermission (RoleId, PermissionId) VALUES (@AdminRoleId, 15);

commit;