using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NotificationToBusiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentationId",
                table: "SegmentationItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentationId",
                table: "SegmentationItem",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "IsMarkedAsRead",
                table: "NotificationUser",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "NameLatin",
                table: "Genders",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(70)",
                oldMaxLength: 70);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Genders",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(70)",
                oldMaxLength: 70);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");
        }
    }
}
