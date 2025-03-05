BEGIN TRANSACTION;
ALTER TABLE [Transaction] DROP CONSTRAINT [FK_Transaction_BusinessSystem_BusinessSystemId];

EXEC sp_rename N'[Transaction].[BusinessSystemId]', N'BusinessSystemUpdatePointsScheduledTaskId', 'COLUMN';

EXEC sp_rename N'[Transaction].[IX_Transaction_BusinessSystemId]', N'IX_Transaction_BusinessSystemUpdatePointsScheduledTaskId', 'INDEX';

ALTER TABLE [Transaction] ADD CONSTRAINT [FK_Transaction_BusinessSystemUpdatePointsScheduledTask_BusinessSystemUpdatePointsScheduledTaskId] FOREIGN KEY ([BusinessSystemUpdatePointsScheduledTaskId]) REFERENCES [BusinessSystemUpdatePointsScheduledTask] ([Id]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250304170000_UpdatePointsTaskRevert', N'9.0.1');

COMMIT;
GO

