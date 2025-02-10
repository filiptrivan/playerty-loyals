using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ETagCache : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Partner",
                type: "rowversion",
                rowVersion: true,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Partner");
        }
    }
}
