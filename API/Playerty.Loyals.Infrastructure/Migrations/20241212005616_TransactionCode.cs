using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TransactionCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Transactions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "UpdatePointsScheduledTaskIsPaused",
                table: "Stores",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "UpdatePointsScheduledTaskIsPaused",
                table: "Stores");
        }
    }
}
