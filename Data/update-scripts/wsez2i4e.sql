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
GO

CREATE TABLE [Genders] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(70) NOT NULL,
    CONSTRAINT [PK_Genders] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Partners] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Slug] nvarchar(100) NOT NULL,
    [UpdatePointsInterval] int NULL,
    [LogoImage] nvarchar(1024) NULL,
    [PrimaryColor] nvarchar(7) NULL,
    [PointsForTheFirstTimeGenderFill] int NOT NULL,
    [PointsForTheFirstTimeBirthDateFill] int NOT NULL,
    [LoadPurchasesEndpoint] nvarchar(1000) NULL,
    [LoadReversalsEndpoint] nvarchar(1000) NULL,
    [CreateUserEndpoint] nvarchar(1000) NULL,
    [UpdateUserGroupEndpoint] nvarchar(1000) NULL,
    [ProductsRecommendationEndpoint] nvarchar(1000) NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Partners] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Permissions] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_Permissions] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Users] (
    [Id] bigint NOT NULL IDENTITY,
    [Email] nvarchar(70) NOT NULL,
    [Password] nvarchar(80) NULL,
    [HasLoggedInWithExternalProvider] bit NOT NULL,
    [NumberOfFailedAttemptsInARow] int NOT NULL,
    [BirthDate] datetime2 NULL,
    [GenderId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Users_Genders_GenderId] FOREIGN KEY ([GenderId]) REFERENCES [Genders] ([Id]) ON DELETE SET NULL
);
GO

CREATE TABLE [Notifications] (
    [Id] bigint NOT NULL IDENTITY,
    [Title] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NOT NULL,
    [EmailBody] nvarchar(1000) NULL,
    [Discriminator] nvarchar(21) NOT NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Notifications] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Notifications_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [Roles] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [Discriminator] nvarchar(13) NOT NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Roles_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [Segmentations] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Description] nvarchar(400) NULL,
    [PointsForTheFirstTimeFill] int NOT NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Segmentations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Segmentations_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [Tiers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Description] nvarchar(400) NULL,
    [ValidFrom] int NOT NULL,
    [ValidTo] int NOT NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Tiers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Tiers_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [Transactions] (
    [Id] bigint NOT NULL IDENTITY,
    [Guid] uniqueidentifier NOT NULL,
    [Price] decimal(16,2) NOT NULL,
    [Points] int NOT NULL,
    [UserId] bigint NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Transactions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Transactions_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
);
GO

CREATE TABLE [NotificationUser] (
    [NotificationsId] bigint NOT NULL,
    [UsersId] bigint NOT NULL,
    [IsMarkedAsRead] bit NOT NULL,
    CONSTRAINT [PK_NotificationUser] PRIMARY KEY ([NotificationsId], [UsersId]),
    CONSTRAINT [FK_NotificationUser_Notifications_NotificationsId] FOREIGN KEY ([NotificationsId]) REFERENCES [Notifications] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_NotificationUser_Users_UsersId] FOREIGN KEY ([UsersId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [PermissionRole] (
    [PermissionsId] int NOT NULL,
    [RolesId] int NOT NULL,
    CONSTRAINT [PK_PermissionRole] PRIMARY KEY ([PermissionsId], [RolesId]),
    CONSTRAINT [FK_PermissionRole_Permissions_PermissionsId] FOREIGN KEY ([PermissionsId]) REFERENCES [Permissions] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PermissionRole_Roles_RolesId] FOREIGN KEY ([RolesId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [RoleUser] (
    [RolesId] int NOT NULL,
    [UsersId] bigint NOT NULL,
    CONSTRAINT [PK_RoleUser] PRIMARY KEY ([RolesId], [UsersId]),
    CONSTRAINT [FK_RoleUser_Roles_RolesId] FOREIGN KEY ([RolesId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_RoleUser_Users_UsersId] FOREIGN KEY ([UsersId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [SegmentationItems] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [OrderNumber] int NOT NULL,
    [SegmentationId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_SegmentationItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SegmentationItems_Segmentations_SegmentationId] FOREIGN KEY ([SegmentationId]) REFERENCES [Segmentations] ([Id])
);
GO

CREATE TABLE [PartnerUsers] (
    [Id] bigint NOT NULL IDENTITY,
    [Points] int NOT NULL,
    [HasFilledGenderForTheFirstTime] bit NOT NULL,
    [HasFilledBirthDateForTheFirstTime] bit NOT NULL,
    [PartnerId] int NULL,
    [UserId] bigint NULL,
    [TierId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_PartnerUsers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PartnerUsers_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id]),
    CONSTRAINT [FK_PartnerUsers_Tiers_TierId] FOREIGN KEY ([TierId]) REFERENCES [Tiers] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_PartnerUsers_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
);
GO

CREATE TABLE [TransactionProducts] (
    [Id] bigint NOT NULL IDENTITY,
    [ProductId] bigint NOT NULL,
    [TransactionId] bigint NULL,
    CONSTRAINT [PK_TransactionProducts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TransactionProducts_Transactions_TransactionId] FOREIGN KEY ([TransactionId]) REFERENCES [Transactions] ([Id])
);
GO

CREATE TABLE [TransactionStatuses] (
    [Id] tinyint NOT NULL,
    [Name] nvarchar(255) NOT NULL,
    [Code] nvarchar(255) NOT NULL,
    [TransactionId] bigint NULL,
    CONSTRAINT [PK_TransactionStatuses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TransactionStatuses_Transactions_TransactionId] FOREIGN KEY ([TransactionId]) REFERENCES [Transactions] ([Id])
);
GO

CREATE TABLE [PartnerNotificationPartnerUser] (
    [PartnerNotificationsId] bigint NOT NULL,
    [PartnerUsersId] bigint NOT NULL,
    [IsMarkedAsRead] bit NOT NULL,
    CONSTRAINT [PK_PartnerNotificationPartnerUser] PRIMARY KEY ([PartnerNotificationsId], [PartnerUsersId]),
    CONSTRAINT [FK_PartnerNotificationPartnerUser_Notifications_PartnerNotificationsId] FOREIGN KEY ([PartnerNotificationsId]) REFERENCES [Notifications] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerNotificationPartnerUser_PartnerUsers_PartnerUsersId] FOREIGN KEY ([PartnerUsersId]) REFERENCES [PartnerUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [PartnerRolePartnerUser] (
    [PartnerRolesId] int NOT NULL,
    [PartnerUsersId] bigint NOT NULL,
    CONSTRAINT [PK_PartnerRolePartnerUser] PRIMARY KEY ([PartnerRolesId], [PartnerUsersId]),
    CONSTRAINT [FK_PartnerRolePartnerUser_PartnerUsers_PartnerUsersId] FOREIGN KEY ([PartnerUsersId]) REFERENCES [PartnerUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerRolePartnerUser_Roles_PartnerRolesId] FOREIGN KEY ([PartnerRolesId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [PartnerUserSegmentation] (
    [AlreadyFilledSegmentationsId] int NOT NULL,
    [PartnerUsersThatHasFilledSegmentationId] bigint NOT NULL,
    CONSTRAINT [PK_PartnerUserSegmentation] PRIMARY KEY ([AlreadyFilledSegmentationsId], [PartnerUsersThatHasFilledSegmentationId]),
    CONSTRAINT [FK_PartnerUserSegmentation_PartnerUsers_PartnerUsersThatHasFilledSegmentationId] FOREIGN KEY ([PartnerUsersThatHasFilledSegmentationId]) REFERENCES [PartnerUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserSegmentation_Segmentations_AlreadyFilledSegmentationsId] FOREIGN KEY ([AlreadyFilledSegmentationsId]) REFERENCES [Segmentations] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [PartnerUserSegmentationItem] (
    [CheckedSegmentationItemsId] bigint NOT NULL,
    [PartnerUsersId] bigint NOT NULL,
    CONSTRAINT [PK_PartnerUserSegmentationItem] PRIMARY KEY ([CheckedSegmentationItemsId], [PartnerUsersId]),
    CONSTRAINT [FK_PartnerUserSegmentationItem_PartnerUsers_PartnerUsersId] FOREIGN KEY ([PartnerUsersId]) REFERENCES [PartnerUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PartnerUserSegmentationItem_SegmentationItems_CheckedSegmentationItemsId] FOREIGN KEY ([CheckedSegmentationItemsId]) REFERENCES [SegmentationItems] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Notifications_PartnerId] ON [Notifications] ([PartnerId]);
GO

CREATE INDEX [IX_NotificationUser_UsersId] ON [NotificationUser] ([UsersId]);
GO

CREATE INDEX [IX_PartnerNotificationPartnerUser_PartnerUsersId] ON [PartnerNotificationPartnerUser] ([PartnerUsersId]);
GO

CREATE INDEX [IX_PartnerRolePartnerUser_PartnerUsersId] ON [PartnerRolePartnerUser] ([PartnerUsersId]);
GO

CREATE UNIQUE INDEX [IX_Partners_Slug] ON [Partners] ([Slug]);
GO

CREATE INDEX [IX_PartnerUsers_PartnerId] ON [PartnerUsers] ([PartnerId]);
GO

CREATE INDEX [IX_PartnerUsers_TierId] ON [PartnerUsers] ([TierId]);
GO

CREATE INDEX [IX_PartnerUsers_UserId] ON [PartnerUsers] ([UserId]);
GO

CREATE INDEX [IX_PartnerUserSegmentation_PartnerUsersThatHasFilledSegmentationId] ON [PartnerUserSegmentation] ([PartnerUsersThatHasFilledSegmentationId]);
GO

CREATE INDEX [IX_PartnerUserSegmentationItem_PartnerUsersId] ON [PartnerUserSegmentationItem] ([PartnerUsersId]);
GO

CREATE INDEX [IX_PermissionRole_RolesId] ON [PermissionRole] ([RolesId]);
GO

CREATE UNIQUE INDEX [IX_Permissions_Code] ON [Permissions] ([Code]);
GO

CREATE INDEX [IX_Roles_PartnerId] ON [Roles] ([PartnerId]);
GO

CREATE INDEX [IX_RoleUser_UsersId] ON [RoleUser] ([UsersId]);
GO

CREATE INDEX [IX_SegmentationItems_SegmentationId] ON [SegmentationItems] ([SegmentationId]);
GO

CREATE INDEX [IX_Segmentations_PartnerId] ON [Segmentations] ([PartnerId]);
GO

CREATE INDEX [IX_Tiers_PartnerId] ON [Tiers] ([PartnerId]);
GO

CREATE INDEX [IX_TransactionProducts_TransactionId] ON [TransactionProducts] ([TransactionId]);
GO

CREATE INDEX [IX_Transactions_UserId] ON [Transactions] ([UserId]);
GO

CREATE INDEX [IX_TransactionStatuses_TransactionId] ON [TransactionStatuses] ([TransactionId]);
GO

CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);
GO

CREATE INDEX [IX_Users_GenderId] ON [Users] ([GenderId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241024230548_Init', N'8.0.2');
GO

COMMIT;
GO

