using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Users_Gender_GenderId",
            //    table: "Users");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_Gender",
            //    table: "Gender");

            //migrationBuilder.RenameTable(
            //    name: "Gender",
            //    newName: "Genders");

            migrationBuilder.AlterColumn<bool>(
                name: "IsMarkedAsRead",
                table: "PartnerNotificationPartnerUser",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            //migrationBuilder.AddPrimaryKey(
            //    name: "PK_Genders",
            //    table: "Genders",
            //    column: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Users_Genders_GenderId",
            //    table: "Users",
            //    column: "GenderId",
            //    principalTable: "Genders",
            //    principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Genders_GenderId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genders",
                table: "Genders");

            migrationBuilder.RenameTable(
                name: "Genders",
                newName: "Gender");

            migrationBuilder.AlterColumn<bool>(
                name: "IsMarkedAsRead",
                table: "PartnerNotificationPartnerUser",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gender",
                table: "Gender",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Gender_GenderId",
                table: "Users",
                column: "GenderId",
                principalTable: "Gender",
                principalColumn: "Id");
        }
    }
}
