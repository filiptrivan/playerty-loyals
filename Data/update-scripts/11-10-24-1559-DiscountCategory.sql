BEGIN TRANSACTION;
GO

ALTER TABLE [DiscountCategories] DROP CONSTRAINT [FK_DiscountCategories_Partners_PartnerId];
GO

DROP INDEX [IX_DiscountCategories_PartnerId] ON [DiscountCategories];
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DiscountCategories]') AND [c].[name] = N'PartnerId');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [DiscountCategories] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [DiscountCategories] DROP COLUMN [PartnerId];
GO

ALTER TABLE [DiscountCategories] ADD [StoreId] bigint NULL;
GO

CREATE INDEX [IX_DiscountCategories_StoreId] ON [DiscountCategories] ([StoreId]);
GO

ALTER TABLE [DiscountCategories] ADD CONSTRAINT [FK_DiscountCategories_Stores_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [Stores] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241110145555_PartnerToStore', N'8.0.2');
GO

COMMIT;
GO

