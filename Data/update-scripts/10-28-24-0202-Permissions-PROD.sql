BEGIN TRANSACTION;

ALTER TABLE PermissionRole
DROP CONSTRAINT FK_PermissionRole_Permissions_PermissionsId;

go

delete from PermissionRole where PermissionsId > 15

delete from Permissions; dbcc checkident (Permissions, reseed, 0);
insert into Permissions(Name, Description, Code) values(N'Pregled korisnika', null, N'ReadUserExtended');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih korisnika', null, N'EditUserExtended');
insert into Permissions(Name, Description, Code) values(N'Brisanje korisnika', null, N'DeleteUserExtended');
insert into Permissions(Name, Description, Code) values(N'Pregled notifikacija', null, N'ReadNotification');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih notifikacija', null, N'EditNotification');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih notifikacija', null, N'InsertNotification');
insert into Permissions(Name, Description, Code) values(N'Brisanje notifikacija', null, N'DeleteNotification');
insert into Permissions(Name, Description, Code) values(N'Pregled partnera', null, N'ReadPartner');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih partnera', null, N'EditPartner');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih partnera', null, N'InsertPartner');
insert into Permissions(Name, Description, Code) values(N'Brisanje partnera', null, N'DeletePartner');
insert into Permissions(Name, Description, Code) values(N'Pregled uloga', null, N'ReadRole');
insert into Permissions(Name, Description, Code) values(N'Promena postojećih uloga', null, N'EditRole');
insert into Permissions(Name, Description, Code) values(N'Dodavanje novih uloga', null, N'InsertRole');
insert into Permissions(Name, Description, Code) values(N'Brisanje uloga', null, N'DeleteRole');

go

ALTER TABLE PermissionRole
Add CONSTRAINT FK_PermissionRole_Permissions_PermissionsId FOREIGN KEY (PermissionsId) REFERENCES Permissions(Id);

go

COMMIT;