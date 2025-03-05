BEGIN TRANSACTION;
DECLARE @var sysname;
SELECT @var = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Transaction]') AND [c].[name] = N'ProductName');
IF @var IS NOT NULL EXEC(N'ALTER TABLE [Transaction] DROP CONSTRAINT [' + @var + '];');
ALTER TABLE [Transaction] ALTER COLUMN [ProductName] nvarchar(500) NULL;

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Transaction]') AND [c].[name] = N'ProductCategoryName');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Transaction] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Transaction] ALTER COLUMN [ProductCategoryName] nvarchar(500) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250305000804_TransactionNullableFields', N'9.0.1');

COMMIT;
GO