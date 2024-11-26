BEGIN TRANSACTION;
GO

ALTER TABLE [StoreTiers] ADD [OrderNumber] int NULL;
GO

update StoreTiers set OrderNumber = 0;
go

alter table StoreTiers alter column [OrderNumber] int not null;
go

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241124123248_StoreTierOrderNumber', N'8.0.2');
GO

COMMIT;
GO

