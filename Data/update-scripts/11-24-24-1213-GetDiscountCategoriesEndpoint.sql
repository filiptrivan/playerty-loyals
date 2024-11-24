BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Stores].[LoadReversalsEndpoint]', N'GetReversalsEndpoint', N'COLUMN';
GO

EXEC sp_rename N'[Stores].[LoadPurchasesEndpoint]', N'GetPurchasesEndpoint', N'COLUMN';
GO

ALTER TABLE [Stores] ADD [GetDiscountCategoriesEndpoint] nvarchar(1000) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241123231051_GetDiscountCategoriesEndpoint', N'8.0.2');
GO

COMMIT;
GO

