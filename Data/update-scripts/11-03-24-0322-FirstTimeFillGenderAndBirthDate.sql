BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PartnerUsers]') AND [c].[name] = N'HasFilledBirthDateForTheFirstTime');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [PartnerUsers] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [PartnerUsers] DROP COLUMN [HasFilledBirthDateForTheFirstTime];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PartnerUsers]') AND [c].[name] = N'HasFilledGenderForTheFirstTime');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [PartnerUsers] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [PartnerUsers] DROP COLUMN [HasFilledGenderForTheFirstTime];
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'PointsForTheFirstTimeBirthDateFill');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Partners] DROP COLUMN [PointsForTheFirstTimeBirthDateFill];
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Partners]') AND [c].[name] = N'PointsForTheFirstTimeGenderFill');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Partners] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Partners] DROP COLUMN [PointsForTheFirstTimeGenderFill];
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241103021822_PartnerUserAndPartnerCleanup', N'8.0.2');
GO

COMMIT;
GO
