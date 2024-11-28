BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreUpdatePointsScheduledTasks]') AND [c].[name] = N'FinishedAt');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [StoreUpdatePointsScheduledTasks] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [StoreUpdatePointsScheduledTasks] DROP COLUMN [FinishedAt];
GO

ALTER TABLE [StoreUpdatePointsScheduledTasks] ADD [IsManual] bit NULL;
GO

update StoreUpdatePointsScheduledTasks set IsManual = 0;

ALTER TABLE [StoreUpdatePointsScheduledTasks] ALTER COLUMN [IsManual] bit NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241127234552_IsManual', N'8.0.2');
GO

COMMIT;
GO

