IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Gender] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(70) NOT NULL,
    CONSTRAINT [PK_Gender] PRIMARY KEY ([Id])
);

CREATE TABLE [Notification] (
    [Id] bigint NOT NULL IDENTITY,
    [Title] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NOT NULL,
    [EmailBody] nvarchar(1000) NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Notification] PRIMARY KEY ([Id])
);

CREATE TABLE [Partner] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Email] nvarchar(70) NOT NULL,
    [Slug] nvarchar(100) NOT NULL,
    [LogoImage] nvarchar(1024) NULL,
    [PrimaryColor] nvarchar(7) NULL,
    [ProductsRecommendationEndpoint] nvarchar(1000) NULL,
    [PointsMultiplier] decimal(10,2) NOT NULL,
    [CacheVersion] rowversion NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Partner] PRIMARY KEY ([Id])
);

CREATE TABLE [PartnerPermission] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_PartnerPermission] PRIMARY KEY ([Id])
);

CREATE TABLE [Permission] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_Permission] PRIMARY KEY ([Id])
);

CREATE TABLE [Role] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
);

CREATE TABLE [ScheduledTaskType] (
    [Id] int NOT NULL IDENTITY,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_ScheduledTaskType] PRIMARY KEY ([Id])
);

CREATE TABLE [User] (
    [Id] bigint NOT NULL IDENTITY,
    [Email] nvarchar(70) NOT NULL,
    [HasLoggedInWithExternalProvider] bit NULL,
    [IsDisabled] bit NULL,
    [BirthDate] datetime2 NULL,
    [GenderId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_User_Gender_GenderId] FOREIGN KEY ([GenderId]) REFERENCES [Gender] ([Id]) ON DELETE SET NULL
);

CREATE TABLE [BusinessSystem] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [GetTransactionsEndpoint] nvarchar(1000) NULL,
    [GetDiscountProductGroupsEndpoint] nvarchar(1000) NULL,
    [CreateUserEndpoint] nvarchar(1000) NULL,
    [UpdateUserGroupEndpoint] nvarchar(1000) NULL,
    [UpdatePointsInterval] int NULL,
    [UpdatePointsStartDate] datetime2 NULL,
    [UpdatePointsScheduledTaskIsPaused] bit NULL,
    [PartnerId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_BusinessSystem] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BusinessSystem_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id])
);

CREATE TABLE [PartnerNotification] (
    [Id] bigint NOT NULL IDENTITY,
    [Title] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NOT NULL,
    [EmailBody] nvarchar(1000) NULL,
    [PartnerId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_PartnerNotification] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PartnerNotification_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id])
);

CREATE TABLE [PartnerRole] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [PartnerId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_PartnerRole] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PartnerRole_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id])
);

CREATE TABLE [Segmentation] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [PointsForTheFirstTimeFill] int NOT NULL,
    [PartnerId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Segmentation] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Segmentation_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id])
);

CREATE TABLE [Tier] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [ValidFrom] int NOT NULL,
    [ValidTo] int NOT NULL,
    [PartnerId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Tier] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Tier_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id])
);

CREATE TABLE [RolePermission] (
    [RoleId] int NOT NULL,
    [PermissionId] int NOT NULL,
    CONSTRAINT [PK_RolePermission] PRIMARY KEY ([RoleId], [PermissionId]),
    CONSTRAINT [FK_RolePermission_Permission_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [Permission] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_RolePermission_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [UserNotification] (
    [NotificationId] bigint NOT NULL,
    [UserId] bigint NOT NULL,
    [IsMarkedAsRead] bit NOT NULL,
    CONSTRAINT [PK_UserNotification] PRIMARY KEY ([NotificationId], [UserId]),
    CONSTRAINT [FK_UserNotification_Notification_NotificationId] FOREIGN KEY ([NotificationId]) REFERENCES [Notification] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserNotification_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [UserRole] (
    [RoleId] int NOT NULL,
    [UserId] bigint NOT NULL,
    CONSTRAINT [PK_UserRole] PRIMARY KEY ([RoleId], [UserId]),
    CONSTRAINT [FK_UserRole_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRole_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [BusinessSystemUpdatePointsScheduledTask] (
    [Id] bigint NOT NULL IDENTITY,
    [TransactionsFrom] datetime2 NULL,
    [TransactionsTo] datetime2 NULL,
    [IsManual] bit NOT NULL,
    [BusinessSystemId] bigint NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_BusinessSystemUpdatePointsScheduledTask] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BusinessSystemUpdatePointsScheduledTask_BusinessSystem_BusinessSystemId] FOREIGN KEY ([BusinessSystemId]) REFERENCES [BusinessSystem] ([Id])
);

CREATE TABLE [DiscountProductGroup] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Code] nvarchar(100) NOT NULL,
    [OrderNumber] int NOT NULL,
    [BusinessSystemId] bigint NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_DiscountProductGroup] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DiscountProductGroup_BusinessSystem_BusinessSystemId] FOREIGN KEY ([BusinessSystemId]) REFERENCES [BusinessSystem] ([Id])
);

CREATE TABLE [PartnerRolePartnerPermission] (
    [PartnerRoleId] int NOT NULL,
    [PartnerPermissionId] int NOT NULL,
    CONSTRAINT [PK_PartnerRolePartnerPermission] PRIMARY KEY ([PartnerRoleId], [PartnerPermissionId]),
    CONSTRAINT [FK_PartnerRolePartnerPermission_PartnerPermission_PartnerPermissionId] FOREIGN KEY ([PartnerPermissionId]) REFERENCES [PartnerPermission] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerRolePartnerPermission_PartnerRole_PartnerRoleId] FOREIGN KEY ([PartnerRoleId]) REFERENCES [PartnerRole] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [SegmentationItem] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [OrderNumber] int NOT NULL,
    [SegmentationId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_SegmentationItem] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SegmentationItem_Segmentation_SegmentationId] FOREIGN KEY ([SegmentationId]) REFERENCES [Segmentation] ([Id])
);

CREATE TABLE [BusinessSystemTier] (
    [Id] bigint NOT NULL IDENTITY,
    [OrderNumber] int NOT NULL,
    [BusinessSystemId] bigint NOT NULL,
    [TierId] int NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_BusinessSystemTier] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BusinessSystemTier_BusinessSystem_BusinessSystemId] FOREIGN KEY ([BusinessSystemId]) REFERENCES [BusinessSystem] ([Id]),
    CONSTRAINT [FK_BusinessSystemTier_Tier_TierId] FOREIGN KEY ([TierId]) REFERENCES [Tier] ([Id])
);

CREATE TABLE [PartnerUser] (
    [Id] bigint NOT NULL IDENTITY,
    [Points] int NOT NULL,
    [PartnerId] int NOT NULL,
    [UserId] bigint NOT NULL,
    [TierId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_PartnerUser] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PartnerUser_Partner_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partner] ([Id]),
    CONSTRAINT [FK_PartnerUser_Tier_TierId] FOREIGN KEY ([TierId]) REFERENCES [Tier] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_PartnerUser_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
);

CREATE TABLE [BusinessSystemTierDiscountProductGroup] (
    [BusinessSystemTierId] bigint NOT NULL,
    [DiscountProductGroupId] bigint NOT NULL,
    [Discount] int NOT NULL,
    CONSTRAINT [PK_BusinessSystemTierDiscountProductGroup] PRIMARY KEY ([BusinessSystemTierId], [DiscountProductGroupId]),
    CONSTRAINT [FK_BusinessSystemTierDiscountProductGroup_BusinessSystemTier_BusinessSystemTierId] FOREIGN KEY ([BusinessSystemTierId]) REFERENCES [BusinessSystemTier] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_BusinessSystemTierDiscountProductGroup_DiscountProductGroup_DiscountProductGroupId] FOREIGN KEY ([DiscountProductGroupId]) REFERENCES [DiscountProductGroup] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [PartnerUserPartnerNotification] (
    [PartnerNotificationId] bigint NOT NULL,
    [PartnerUserId] bigint NOT NULL,
    [IsMarkedAsRead] bit NOT NULL,
    CONSTRAINT [PK_PartnerUserPartnerNotification] PRIMARY KEY ([PartnerNotificationId], [PartnerUserId]),
    CONSTRAINT [FK_PartnerUserPartnerNotification_PartnerNotification_PartnerNotificationId] FOREIGN KEY ([PartnerNotificationId]) REFERENCES [PartnerNotification] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserPartnerNotification_PartnerUser_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUser] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [PartnerUserPartnerRole] (
    [PartnerRoleId] int NOT NULL,
    [PartnerUserId] bigint NOT NULL,
    CONSTRAINT [PK_PartnerUserPartnerRole] PRIMARY KEY ([PartnerRoleId], [PartnerUserId]),
    CONSTRAINT [FK_PartnerUserPartnerRole_PartnerRole_PartnerRoleId] FOREIGN KEY ([PartnerRoleId]) REFERENCES [PartnerRole] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserPartnerRole_PartnerUser_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUser] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [PartnerUserSegmentation] (
    [PartnerUserThatHasFilledSegmentationId] bigint NOT NULL,
    [AlreadyFilledSegmentationId] int NOT NULL,
    CONSTRAINT [PK_PartnerUserSegmentation] PRIMARY KEY ([PartnerUserThatHasFilledSegmentationId], [AlreadyFilledSegmentationId]),
    CONSTRAINT [FK_PartnerUserSegmentation_PartnerUser_PartnerUserThatHasFilledSegmentationId] FOREIGN KEY ([PartnerUserThatHasFilledSegmentationId]) REFERENCES [PartnerUser] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserSegmentation_Segmentation_AlreadyFilledSegmentationId] FOREIGN KEY ([AlreadyFilledSegmentationId]) REFERENCES [Segmentation] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [PartnerUserSegmentationItem] (
    [PartnerUserId] bigint NOT NULL,
    [CheckedSegmentationItemId] bigint NOT NULL,
    CONSTRAINT [PK_PartnerUserSegmentationItem] PRIMARY KEY ([PartnerUserId], [CheckedSegmentationItemId]),
    CONSTRAINT [FK_PartnerUserSegmentationItem_PartnerUser_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUser] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserSegmentationItem_SegmentationItem_CheckedSegmentationItemId] FOREIGN KEY ([CheckedSegmentationItemId]) REFERENCES [SegmentationItem] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Transaction] (
    [Id] bigint NOT NULL IDENTITY,
    [ProductName] nvarchar(500) NOT NULL,
    [Code] nvarchar(20) NOT NULL,
    [ProductImageUrl] nvarchar(1000) NULL,
    [ProductCategoryName] nvarchar(500) NOT NULL,
    [ProductCategoryImageUrl] nvarchar(1000) NULL,
    [Price] decimal(16,2) NOT NULL,
    [BoughtAt] datetime2 NOT NULL,
    [Points] int NOT NULL,
    [PartnerUserId] bigint NOT NULL,
    [BusinessSystemId] bigint NOT NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Transaction] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Transaction_BusinessSystem_BusinessSystemId] FOREIGN KEY ([BusinessSystemId]) REFERENCES [BusinessSystem] ([Id]),
    CONSTRAINT [FK_Transaction_PartnerUser_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUser] ([Id])
);

CREATE INDEX [IX_BusinessSystem_PartnerId] ON [BusinessSystem] ([PartnerId]);

CREATE INDEX [IX_BusinessSystemTier_BusinessSystemId] ON [BusinessSystemTier] ([BusinessSystemId]);

CREATE INDEX [IX_BusinessSystemTier_TierId] ON [BusinessSystemTier] ([TierId]);

CREATE INDEX [IX_BusinessSystemTierDiscountProductGroup_DiscountProductGroupId] ON [BusinessSystemTierDiscountProductGroup] ([DiscountProductGroupId]);

CREATE INDEX [IX_BusinessSystemUpdatePointsScheduledTask_BusinessSystemId] ON [BusinessSystemUpdatePointsScheduledTask] ([BusinessSystemId]);

CREATE INDEX [IX_DiscountProductGroup_BusinessSystemId] ON [DiscountProductGroup] ([BusinessSystemId]);

CREATE UNIQUE INDEX [IX_Partner_Slug] ON [Partner] ([Slug]);

CREATE INDEX [IX_PartnerNotification_PartnerId] ON [PartnerNotification] ([PartnerId]);

CREATE UNIQUE INDEX [IX_PartnerPermission_Code] ON [PartnerPermission] ([Code]);

CREATE INDEX [IX_PartnerRole_PartnerId] ON [PartnerRole] ([PartnerId]);

CREATE INDEX [IX_PartnerRolePartnerPermission_PartnerPermissionId] ON [PartnerRolePartnerPermission] ([PartnerPermissionId]);

CREATE INDEX [IX_PartnerUser_PartnerId] ON [PartnerUser] ([PartnerId]);

CREATE INDEX [IX_PartnerUser_TierId] ON [PartnerUser] ([TierId]);

CREATE INDEX [IX_PartnerUser_UserId] ON [PartnerUser] ([UserId]);

CREATE INDEX [IX_PartnerUserPartnerNotification_PartnerUserId] ON [PartnerUserPartnerNotification] ([PartnerUserId]);

CREATE INDEX [IX_PartnerUserPartnerRole_PartnerUserId] ON [PartnerUserPartnerRole] ([PartnerUserId]);

CREATE INDEX [IX_PartnerUserSegmentation_AlreadyFilledSegmentationId] ON [PartnerUserSegmentation] ([AlreadyFilledSegmentationId]);

CREATE INDEX [IX_PartnerUserSegmentationItem_CheckedSegmentationItemId] ON [PartnerUserSegmentationItem] ([CheckedSegmentationItemId]);

CREATE UNIQUE INDEX [IX_Permission_Code] ON [Permission] ([Code]);

CREATE INDEX [IX_RolePermission_PermissionId] ON [RolePermission] ([PermissionId]);

CREATE INDEX [IX_Segmentation_PartnerId] ON [Segmentation] ([PartnerId]);

CREATE INDEX [IX_SegmentationItem_SegmentationId] ON [SegmentationItem] ([SegmentationId]);

CREATE INDEX [IX_Tier_PartnerId] ON [Tier] ([PartnerId]);

CREATE INDEX [IX_Transaction_BusinessSystemId] ON [Transaction] ([BusinessSystemId]);

CREATE INDEX [IX_Transaction_PartnerUserId] ON [Transaction] ([PartnerUserId]);

CREATE UNIQUE INDEX [IX_User_Email] ON [User] ([Email]);

CREATE INDEX [IX_User_GenderId] ON [User] ([GenderId]);

CREATE INDEX [IX_UserNotification_UserId] ON [UserNotification] ([UserId]);

CREATE INDEX [IX_UserRole_UserId] ON [UserRole] ([UserId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250301193123_Init', N'9.0.1');

COMMIT;
GO

