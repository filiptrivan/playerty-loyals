using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DiscountCategoryPartnerForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PartnerId",
                table: "DiscountCategories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DiscountCategories_PartnerId",
                table: "DiscountCategories",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountCategories_Partners_PartnerId",
                table: "DiscountCategories",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountCategories_Partners_PartnerId",
                table: "DiscountCategories");

            migrationBuilder.DropIndex(
                name: "IX_DiscountCategories_PartnerId",
                table: "DiscountCategories");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "DiscountCategories");
        }
    }
}
