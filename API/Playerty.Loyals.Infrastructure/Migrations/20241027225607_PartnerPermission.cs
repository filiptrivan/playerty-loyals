using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerPermission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRolePartnerUser_Roles_PartnerRolesId",
                table: "PartnerRolePartnerUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Partners_PartnerId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_PartnerId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "Roles");

            migrationBuilder.CreateTable(
                name: "PartnerPermissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPermissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PartnerRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerRoles_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PartnerPermissionPartnerRole",
                columns: table => new
                {
                    PartnerPermissionsId = table.Column<int>(type: "int", nullable: false),
                    PartnerRolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPermissionPartnerRole", x => new { x.PartnerPermissionsId, x.PartnerRolesId });
                    table.ForeignKey(
                        name: "FK_PartnerPermissionPartnerRole_PartnerPermissions_PartnerPermissionsId",
                        column: x => x.PartnerPermissionsId,
                        principalTable: "PartnerPermissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerPermissionPartnerRole_PartnerRoles_PartnerRolesId",
                        column: x => x.PartnerRolesId,
                        principalTable: "PartnerRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPermissionPartnerRole_PartnerRolesId",
                table: "PartnerPermissionPartnerRole",
                column: "PartnerRolesId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPermissions_Code",
                table: "PartnerPermissions",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRoles_PartnerId",
                table: "PartnerRoles",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRolePartnerUser_PartnerRoles_PartnerRolesId",
                table: "PartnerRolePartnerUser",
                column: "PartnerRolesId",
                principalTable: "PartnerRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRolePartnerUser_PartnerRoles_PartnerRolesId",
                table: "PartnerRolePartnerUser");

            migrationBuilder.DropTable(
                name: "PartnerPermissionPartnerRole");

            migrationBuilder.DropTable(
                name: "PartnerPermissions");

            migrationBuilder.DropTable(
                name: "PartnerRoles");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Roles",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PartnerId",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_PartnerId",
                table: "Roles",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRolePartnerUser_Roles_PartnerRolesId",
                table: "PartnerRolePartnerUser",
                column: "PartnerRolesId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Partners_PartnerId",
                table: "Roles",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");
        }
    }
}
