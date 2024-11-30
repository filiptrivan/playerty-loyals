BEGIN TRANSACTION;
GO

ALTER TABLE [Partners] ADD [Email] nvarchar(70) NULL;
GO

update Partners set Email = '';
GO

ALTER TABLE [Partners] alter column [Email] nvarchar(70) NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241129234746_PartnerEmail', N'8.0.2');
GO

COMMIT;
GO

