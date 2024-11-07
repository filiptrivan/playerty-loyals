BEGIN TRANSACTION;
GO

ALTER TABLE [DiscountCategories] ADD [PartnerId] int NULL;
GO

CREATE INDEX [IX_DiscountCategories_PartnerId] ON [DiscountCategories] ([PartnerId]);
GO

ALTER TABLE [DiscountCategories] ADD CONSTRAINT [FK_DiscountCategories_Partners_PartnerId] FOREIGN KEY ([PartnerId]) REFERENCES [Partners] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241104014015_DiscountCategoryPartnerForeignKey', N'8.0.2');
GO

COMMIT;
GO

