using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Partners_Slug",
                table: "Partners");

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Partners",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateUserEndpoint",
                table: "Partners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrimaryColor",
                table: "Partners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductsRecommendationEndpoint",
                table: "Partners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateUserGroupEndpoint",
                table: "Partners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Partners_Slug",
                table: "Partners",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Partners_Slug",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "CreateUserEndpoint",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "PrimaryColor",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "ProductsRecommendationEndpoint",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "UpdateUserGroupEndpoint",
                table: "Partners");

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Partners",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.CreateIndex(
                name: "IX_Partners_Slug",
                table: "Partners",
                column: "Slug",
                unique: true,
                filter: "[Slug] IS NOT NULL");
        }
    }
}
