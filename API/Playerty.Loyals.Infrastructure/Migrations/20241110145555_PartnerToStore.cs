using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerToStore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<long>(
                name: "StoreId",
                table: "DiscountCategories",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DiscountCategories_StoreId",
                table: "DiscountCategories",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories");

            migrationBuilder.DropIndex(
                name: "IX_DiscountCategories_StoreId",
                table: "DiscountCategories");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "DiscountCategories");

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
    }
}
