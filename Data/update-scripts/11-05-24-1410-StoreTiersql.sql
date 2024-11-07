BEGIN TRANSACTION;
GO

DROP TABLE [StoreDiscountCategory];
GO

DROP TABLE [StoreTier];
GO

CREATE TABLE [StoreTiers] (
    [Id] bigint NOT NULL IDENTITY,
    [StoreId] bigint NULL,
    [TierId] int NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_StoreTiers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_StoreTiers_Stores_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [Stores] ([Id]),
    CONSTRAINT [FK_StoreTiers_Tiers_TierId] FOREIGN KEY ([TierId]) REFERENCES [Tiers] ([Id])
);
GO

CREATE TABLE [StoreTierDiscountCategory] (
    [StoreTiersId] bigint NOT NULL,
    [DiscountCategoriesId] bigint NOT NULL,
    [Discount] int NOT NULL,
    CONSTRAINT [PK_StoreTierDiscountCategory] PRIMARY KEY ([StoreTiersId], [DiscountCategoriesId]),
    CONSTRAINT [FK_StoreTierDiscountCategory_DiscountCategories_DiscountCategoriesId] FOREIGN KEY ([DiscountCategoriesId]) REFERENCES [DiscountCategories] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_StoreTierDiscountCategory_StoreTiers_StoreTiersId] FOREIGN KEY ([StoreTiersId]) REFERENCES [StoreTiers] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_StoreTierDiscountCategory_DiscountCategoriesId] ON [StoreTierDiscountCategory] ([DiscountCategoriesId]);
GO

CREATE INDEX [IX_StoreTiers_StoreId] ON [StoreTiers] ([StoreId]);
GO

CREATE INDEX [IX_StoreTiers_TierId] ON [StoreTiers] ([TierId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241105130622_StoreTier', N'8.0.2');
GO

COMMIT;
GO

