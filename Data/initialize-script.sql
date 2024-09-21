IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = N'Admin')
BEGIN
    INSERT INTO Roles (Version, Name, CreatedAt, ModifiedAt) VALUES (1, N'Admin', getdate(), getdate());
END;

IF NOT EXISTS (SELECT 1 FROM Permissions WHERE Code = N'EditRole')
BEGIN
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read roles', N'Vidi uloge', null, null , getdate(), N'ReadRole');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit roles', N'Promeni uloge', null, null , getdate(), N'EditRole');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Insert roles', N'Dodaj uloge', null, null , getdate(), N'InsertRole');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete roles', N'Obriši uloge', null, null , getdate(), N'DeleteRole');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Read users', N'Vidi korisnike', null, null , getdate(), N'ReadUserExtended');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Edit users', N'Promeni korisnike', null, null , getdate(), N'EditUserExtended');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Insert users', N'Dodaj korisnike', null, null , getdate(), N'InsertUserExtended');
	insert into Permissions(Name, NameLatin, Description, DescriptionLatin, CreatedAt, Code) values(N'Delete users', N'Obriši korisnike', null, null , getdate(), N'DeleteUserExtended');
END;

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = N'filiptrivan5@gmail.com')
BEGIN
    INSERT INTO Users (Email, Password, HasLoggedInWithExternalProvider, NumberOfFailedAttemptsInARow, Points, Version, CreatedAt, ModifiedAt, TierId) 
    VALUES (N'filiptrivan5@gmail.com', HASHBYTES('SHA2_256', N'Test.123'), 0, 0, 0, 1, getdate(), getdate(), null);
END;

DECLARE @AdminRoleId INT;
DECLARE @AdminUserId INT;

SELECT @AdminRoleId = Id FROM Roles WHERE Name = N'Admin';
SELECT @AdminUserId = Id FROM Users WHERE Email = N'filiptrivan5@gmail.com';

IF NOT EXISTS (SELECT 1 FROM RoleUser WHERE UsersId = @AdminUserId AND RolesId = @AdminRoleId)
BEGIN
    INSERT INTO RoleUser (UsersId, RolesId) VALUES (@AdminUserId, @AdminRoleId);
END;


IF NOT EXISTS (SELECT 1 FROM PermissionRole WHERE RolesId = @AdminRoleId AND PermissionsId = 1)
BEGIN
    INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 1);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 2);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 3);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 4);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 5);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 6);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 7);
	INSERT INTO PermissionRole (RolesId, PermissionsId) VALUES (@AdminRoleId, 8);
END;