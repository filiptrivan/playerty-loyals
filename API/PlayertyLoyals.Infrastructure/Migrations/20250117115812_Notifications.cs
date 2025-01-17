using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Notifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_Partner_PartnerId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUserPartnerNotification_Notification_PartnerNotificationId",
                table: "PartnerUserPartnerNotification");

            migrationBuilder.DropIndex(
                name: "IX_Notification_PartnerId",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "Notification");

            migrationBuilder.CreateTable(
                name: "PartnerNotification",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    EmailBody = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerNotification_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PartnerNotification_PartnerId",
                table: "PartnerNotification",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUserPartnerNotification_PartnerNotification_PartnerNotificationId",
                table: "PartnerUserPartnerNotification",
                column: "PartnerNotificationId",
                principalTable: "PartnerNotification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUserPartnerNotification_PartnerNotification_PartnerNotificationId",
                table: "PartnerUserPartnerNotification");

            migrationBuilder.DropTable(
                name: "PartnerNotification");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Notification",
                type: "nvarchar(21)",
                maxLength: 21,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PartnerId",
                table: "Notification",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notification_PartnerId",
                table: "Notification",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_Partner_PartnerId",
                table: "Notification",
                column: "PartnerId",
                principalTable: "Partner",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUserPartnerNotification_Notification_PartnerNotificationId",
                table: "PartnerUserPartnerNotification",
                column: "PartnerNotificationId",
                principalTable: "Notification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
