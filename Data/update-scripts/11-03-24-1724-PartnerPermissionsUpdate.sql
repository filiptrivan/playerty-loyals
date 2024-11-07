BEGIN TRANSACTION;

ALTER TABLE PartnerPermissionPartnerRole
DROP CONSTRAINT FK_PartnerPermissionPartnerRole_PartnerPermissions_PartnerPermissionsId;

go

delete from PartnerPermissions; dbcc checkident (PartnerPermissions, reseed, 0);
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled uloga', null, N'ReadPartnerRole');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena postojećih uloga', null, N'EditPartnerRole');
insert into PartnerPermissions(Name, Description, Code) values(N'Dodavanje novih uloga', null, N'InsertPartnerRole');
insert into PartnerPermissions(Name, Description, Code) values(N'Brisanje uloga', null, N'DeletePartnerRole');
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled korisnika', null, N'ReadPartnerUser');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena postojećih korisnika', null, N'EditPartnerUser');
insert into PartnerPermissions(Name, Description, Code) values(N'Brisanje korisnika', null, N'DeletePartnerUser');
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled notifikacija', null, N'ReadPartnerNotification');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena postojećih notifikacija', null, N'EditPartnerNotification');
insert into PartnerPermissions(Name, Description, Code) values(N'Dodavanje novih notifikacija', null, N'InsertPartnerNotification');
insert into PartnerPermissions(Name, Description, Code) values(N'Brisanje notifikacija', null, N'DeletePartnerNotification');
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled partnera', null, N'ReadPartner');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena partnera', null, N'EditPartner');
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled nivoa odanosti', null, N'ReadTier');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena postojećih nivoa odanosti', null, N'EditTier');
insert into PartnerPermissions(Name, Description, Code) values(N'Dodavanje novih nivoa odanosti', null, N'InsertTier');
insert into PartnerPermissions(Name, Description, Code) values(N'Brisanje nivoa odanosti', null, N'DeleteTier');
insert into PartnerPermissions(Name, Description, Code) values(N'Pregled segmentacija', null, N'ReadSegmentation');
insert into PartnerPermissions(Name, Description, Code) values(N'Promena postojećih segmentacija', null, N'EditSegmentation');
insert into PartnerPermissions(Name, Description, Code) values(N'Dodavanje novih segmentacija', null, N'InsertSegmentation');
insert into PartnerPermissions(Name, Description, Code) values(N'Brisanje segmentacija', null, N'DeleteSegmentation');

go

ALTER TABLE PartnerPermissionPartnerRole
Add CONSTRAINT FK_PartnerPermissionPartnerRole_PartnerPermissions_PartnerPermissionsId FOREIGN KEY (PartnerPermissionsId) REFERENCES PartnerPermissions(Id);

go

COMMIT;