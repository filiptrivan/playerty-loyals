using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePointsTaskRevert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_BusinessSystem_BusinessSystemId",
                table: "Transaction");

            migrationBuilder.RenameColumn(
                name: "BusinessSystemId",
                table: "Transaction",
                newName: "BusinessSystemUpdatePointsScheduledTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Transaction_BusinessSystemId",
                table: "Transaction",
                newName: "IX_Transaction_BusinessSystemUpdatePointsScheduledTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_BusinessSystemUpdatePointsScheduledTask_BusinessSystemUpdatePointsScheduledTaskId",
                table: "Transaction",
                column: "BusinessSystemUpdatePointsScheduledTaskId",
                principalTable: "BusinessSystemUpdatePointsScheduledTask",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_BusinessSystemUpdatePointsScheduledTask_BusinessSystemUpdatePointsScheduledTaskId",
                table: "Transaction");

            migrationBuilder.RenameColumn(
                name: "BusinessSystemUpdatePointsScheduledTaskId",
                table: "Transaction",
                newName: "BusinessSystemId");

            migrationBuilder.RenameIndex(
                name: "IX_Transaction_BusinessSystemUpdatePointsScheduledTaskId",
                table: "Transaction",
                newName: "IX_Transaction_BusinessSystemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_BusinessSystem_BusinessSystemId",
                table: "Transaction",
                column: "BusinessSystemId",
                principalTable: "BusinessSystem",
                principalColumn: "Id");
        }
    }
}
