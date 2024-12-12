BEGIN TRANSACTION;
GO

ALTER TABLE [Transactions] ADD [Code] nvarchar(20) NOT NULL DEFAULT N'';
GO

ALTER TABLE [Stores] ADD [UpdatePointsScheduledTaskIsPaused] bit NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241212005616_TransactionCode', N'8.0.2');
GO

COMMIT;
GO

