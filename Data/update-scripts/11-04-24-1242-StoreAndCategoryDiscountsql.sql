BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'CreateUserEndpoint');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Partners] DROP COLUMN [CreateUserEndpoint];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'LoadPurchasesEndpoint');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Partners] DROP COLUMN [LoadPurchasesEndpoint];
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'LoadReversalsEndpoint');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Partners] DROP COLUMN [LoadReversalsEndpoint];
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'UpdatePointsInterval');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Partners] DROP COLUMN [UpdatePointsInterval];
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'UpdateUserGroupEndpoint');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Partners] DROP COLUMN [UpdateUserGroupEndpoint];
GO

CREATE TABLE [DiscountCategories] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [Code] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_DiscountCategories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Stores] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [UpdatePointsInterval] int NULL,
    [LoadPurchasesEndpoint] nvarchar(1000) NULL,
    [LoadReversalsEndpoint] nvarchar(1000) NULL,
    [CreateUserEndpoint] nvarchar(1000) NULL,
    [UpdateUserGroupEndpoint] nvarchar(1000) NULL,
    [PartnerId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Stores] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Stores_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id])
);
GO

CREATE TABLE [StoreDiscountCategory] (
    [DiscountCategoriesId] bigint NOT NULL,
    [StoresId] bigint NOT NULL,
    [Discount] int NOT NULL,
    CONSTRAINT [PK_StoreDiscountCategory] PRIMARY KEY ([StoresId], [DiscountCategoriesId]),
    CONSTRAINT [FK_StoreDiscountCategory_DiscountCategories_DiscountCategoriesId] FOREIGN KEY ([DiscountCategoriesId]) REFERENCES [DiscountCategories] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_StoreDiscountCategory_Stores_StoresId] FOREIGN KEY ([StoresId]) REFERENCES [Stores] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [StoreTier] (
    [StoresId] bigint NOT NULL,
    [TiersId] int NOT NULL,
    CONSTRAINT [PK_StoreTier] PRIMARY KEY ([StoresId], [TiersId]),
    CONSTRAINT [FK_StoreTier_Stores_StoresId] FOREIGN KEY ([StoresId]) REFERENCES [Stores] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_StoreTier_Tiers_TiersId] FOREIGN KEY ([TiersId]) REFERENCES [Tiers] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_StoreDiscountCategory_DiscountCategoriesId] ON [StoreDiscountCategory] ([DiscountCategoriesId]);
GO

CREATE INDEX [IX_Stores_PartnerId] ON [Stores] ([PartnerId]);
GO

CREATE INDEX [IX_StoreTier_TiersId] ON [StoreTier] ([TiersId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241103233548_StoreDiscountCategory', N'8.0.2');
GO

COMMIT;
GO

