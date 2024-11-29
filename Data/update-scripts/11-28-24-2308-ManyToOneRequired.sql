BEGIN TRANSACTION;
GO

EXEC sp_rename N'[StoreUpdatePointsScheduledTasks].[ShouldStartedAt]', N'TransactionsTo', N'COLUMN';
GO

ALTER TABLE [Transactions] ADD [BoughtAt] datetime2 NULL;
GO

update Transactions set [BoughtAt] = '0001-01-01T00:00:00.0000000';

ALTER TABLE [Transactions] alter column [BoughtAt] datetime2 NOT NULL;
GO

ALTER TABLE [Transactions] ADD [ProductCategoryImageUrl] nvarchar(1000) NULL;
GO

ALTER TABLE [Transactions] ADD [ProductImageUrl] nvarchar(1000) NULL;
GO

ALTER TABLE [Transactions] ADD [StoreId] bigint NULL;
GO

update Transactions set [StoreId] = 1;

ALTER TABLE [Transactions] alter column [StoreId] bigint NOT NULL;
GO

ALTER TABLE [StoreUpdatePointsScheduledTasks] ADD [TransactionsFrom] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
GO

ALTER TABLE [PartnerUsers] ADD [UserExtendedId] bigint NULL;
GO

CREATE INDEX [IX_Transactions_StoreId] ON [Transactions] ([StoreId]);
GO

CREATE INDEX [IX_PartnerUsers_UserExtendedId] ON [PartnerUsers] ([UserExtendedId]);
GO

ALTER TABLE [PartnerUsers] ADD CONSTRAINT [FK_PartnerUsers_Users_UserExtendedId] FOREIGN KEY ([UserExtendedId]) REFERENCES [Users] ([Id]);
GO

ALTER TABLE [Transactions] ADD CONSTRAINT [FK_Transactions_Stores_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [Stores] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241128215333_ManualIsRequired', N'8.0.2');
GO

COMMIT;
GO

