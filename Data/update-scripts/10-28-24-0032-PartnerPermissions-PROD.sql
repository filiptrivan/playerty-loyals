BEGIN TRANSACTION;
GO

ALTER TABLE [PartnerRolePartnerUser] DROP CONSTRAINT [FK_PartnerRolePartnerUser_Roles_PartnerRolesId];
GO

ALTER TABLE [Roles] DROP CONSTRAINT [FK_Roles_Partners_PartnerId];
GO

DROP INDEX [IX_Roles_PartnerId] ON [Roles];
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Roles]') AND [c].[name] = N'Discriminator');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Roles] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Roles] DROP COLUMN [Discriminator];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Roles]') AND [c].[name] = N'PartnerId');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Roles] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Roles] DROP COLUMN [PartnerId];
GO

CREATE TABLE [PartnerPermissions] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_PartnerPermissions] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [PartnerRoles] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_PartnerRoles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PartnerRoles_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [PartnerPermissionPartnerRole] (
    [PartnerPermissionsId] int NOT NULL,
    [PartnerRolesId] int NOT NULL,
    CONSTRAINT [PK_PartnerPermissionPartnerRole] PRIMARY KEY ([PartnerPermissionsId], [PartnerRolesId]),
    CONSTRAINT [FK_PartnerPermissionPartnerRole_PartnerPermissions_PartnerPermissionsId] FOREIGN KEY ([PartnerPermissionsId]) REFERENCES [PartnerPermissions] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerPermissionPartnerRole_PartnerRoles_PartnerRolesId] FOREIGN KEY ([PartnerRolesId]) REFERENCES [PartnerRoles] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_PartnerPermissionPartnerRole_PartnerRolesId] ON [PartnerPermissionPartnerRole] ([PartnerRolesId]);
GO

CREATE UNIQUE INDEX [IX_PartnerPermissions_Code] ON [PartnerPermissions] ([Code]);
GO

CREATE INDEX [IX_PartnerRoles_PartnerId] ON [PartnerRoles] ([PartnerId]);
GO

ALTER TABLE [PartnerRolePartnerUser] ADD CONSTRAINT [FK_PartnerRolePartnerUser_PartnerRoles_PartnerRolesId] FOREIGN KEY ([PartnerRolesId]) REFERENCES [PartnerRoles] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241027225607_PartnerPermission', N'8.0.2');
GO

COMMIT;
GO