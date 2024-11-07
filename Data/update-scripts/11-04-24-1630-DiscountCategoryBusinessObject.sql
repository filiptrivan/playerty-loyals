BEGIN TRANSACTION;
GO

ALTER TABLE [DiscountCategories] ADD [CreatedAt] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
GO

ALTER TABLE [DiscountCategories] ADD [ModifiedAt] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
GO

ALTER TABLE [DiscountCategories] ADD [Version] int NOT NULL DEFAULT 0;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241104152756_DiscountCategoryBusinessObject', N'8.0.2');
GO

COMMIT;
GO

