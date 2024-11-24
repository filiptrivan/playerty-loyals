using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class GetDiscountCategoriesEndpoint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LoadReversalsEndpoint",
                table: "Stores",
                newName: "GetReversalsEndpoint");

            migrationBuilder.RenameColumn(
                name: "LoadPurchasesEndpoint",
                table: "Stores",
                newName: "GetPurchasesEndpoint");

            migrationBuilder.AddColumn<string>(
                name: "GetDiscountCategoriesEndpoint",
                table: "Stores",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GetDiscountCategoriesEndpoint",
                table: "Stores");

            migrationBuilder.RenameColumn(
                name: "GetReversalsEndpoint",
                table: "Stores",
                newName: "LoadReversalsEndpoint");

            migrationBuilder.RenameColumn(
                name: "GetPurchasesEndpoint",
                table: "Stores",
                newName: "LoadPurchasesEndpoint");
        }
    }
}
