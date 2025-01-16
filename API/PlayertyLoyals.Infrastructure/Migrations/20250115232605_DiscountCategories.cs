using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DiscountCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GetDiscountCategoriesEndpoint",
                table: "BusinessSystem",
                newName: "GetDiscountProductGroupsEndpoint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GetDiscountProductGroupsEndpoint",
                table: "BusinessSystem",
                newName: "GetDiscountCategoriesEndpoint");
        }
    }
}
