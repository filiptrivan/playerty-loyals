BEGIN TRANSACTION;

ALTER TABLE [Partner] ADD [PointsDuration] int NULL;
GO
update [Partner] set PointsDuration = 365;
ALTER TABLE [Partner] Alter column [PointsDuration] int NOT NULL;

CREATE TABLE [Achievement] (
    [Id] bigint NOT NULL IDENTITY,
    [Points] int NOT NULL,
    [ExpirationDate] datetime2 NOT NULL,
    [PartnerUserId] bigint NOT NULL,
    [TransactionId] bigint NULL,
    [Version] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Achievement] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Achievement_PartnerUser_PartnerUserId] FOREIGN KEY ([PartnerUserId]) REFERENCES [PartnerUser] ([Id]),
    CONSTRAINT [FK_Achievement_Transaction_TransactionId] FOREIGN KEY ([TransactionId]) REFERENCES [Transaction] ([Id])
);

CREATE INDEX [IX_Achievement_PartnerUserId] ON [Achievement] ([PartnerUserId]);

CREATE INDEX [IX_Achievement_TransactionId] ON [Achievement] ([TransactionId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250323182402_Achievements', N'9.0.1');

COMMIT;
GO

