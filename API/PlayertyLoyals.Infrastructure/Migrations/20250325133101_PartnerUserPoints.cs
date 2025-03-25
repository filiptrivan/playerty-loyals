using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerUserPoints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TierId",
                table: "PartnerUser",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_TierId",
                table: "PartnerUser",
                column: "TierId");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUser_Tier_TierId",
                table: "PartnerUser",
                column: "TierId",
                principalTable: "Tier",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUser_Tier_TierId",
                table: "PartnerUser");

            migrationBuilder.DropIndex(
                name: "IX_PartnerUser_TierId",
                table: "PartnerUser");

            migrationBuilder.DropColumn(
                name: "TierId",
                table: "PartnerUser");
        }
    }
}
