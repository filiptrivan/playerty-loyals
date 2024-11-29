BEGIN TRANSACTION;
GO

ALTER TABLE [Transactions] DROP CONSTRAINT [FK_Transactions_Users_UserId];
GO

DROP TABLE [TransactionProducts];
GO

DROP TABLE [TransactionStatuses];
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Transactions]') AND [c].[name] = N'Guid');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Transactions] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Transactions] DROP COLUMN [Guid];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Stores]') AND [c].[name] = N'GetPurchasesEndpoint');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Stores] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Stores] DROP COLUMN [GetPurchasesEndpoint];
GO

EXEC sp_rename N'[Transactions].[UserId]', N'PartnerUserId', N'COLUMN';
GO

EXEC sp_rename N'[Transactions].[IX_Transactions_UserId]', N'IX_Transactions_PartnerUserId', N'INDEX';
GO

EXEC sp_rename N'[Stores].[GetReversalsEndpoint]', N'GetTransactionsEndpoint', N'COLUMN';
GO

ALTER TABLE [Transactions] ADD [ProductCategoryName] nvarchar(500) NOT NULL;
GO

ALTER TABLE [Transactions] ADD [ProductName] nvarchar(500) NOT NULL;
GO

ALTER TABLE [Stores] ADD [UpdatePointsStartDate] datetime2 NULL;
GO

ALTER TABLE [Partners] ADD [PointsMultiplier] decimal(10,2) NULL;
GO

update Partners set [PointsMultiplier] = 0.00;

ALTER TABLE [Partners] alter column [PointsMultiplier] decimal(10,2) NOT NULL;
GO

CREATE TABLE [StoreUpdatePointsScheduledTasks] (
    [Id] bigint NOT NULL IDENTITY,
    [ShouldStartedAt] datetime2 NOT NULL,
    [FinishedAt] datetime2 NULL,
    [StoreId] bigint NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_StoreUpdatePointsScheduledTasks] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_StoreUpdatePointsScheduledTasks_Stores_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [Stores] ([Id])
);
GO

CREATE INDEX [IX_StoreUpdatePointsScheduledTasks_StoreId] ON [StoreUpdatePointsScheduledTasks] ([StoreId]);
GO

ALTER TABLE [Transactions] ADD CONSTRAINT [FK_Transactions_PartnerUsers_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUsers] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241126203054_StoreUpdatePointsScheduledTasks', N'8.0.2');
GO

COMMIT;
GO

