using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PartnerUserAndPartnerCleanup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasFilledBirthDateForTheFirstTime",
                table: "PartnerUsers");

            migrationBuilder.DropColumn(
                name: "HasFilledGenderForTheFirstTime",
                table: "PartnerUsers");

            migrationBuilder.DropColumn(
                name: "PointsForTheFirstTimeBirthDateFill",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "PointsForTheFirstTimeGenderFill",
                table: "Partners");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasFilledBirthDateForTheFirstTime",
                table: "PartnerUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasFilledGenderForTheFirstTime",
                table: "PartnerUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PointsForTheFirstTimeBirthDateFill",
                table: "Partners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PointsForTheFirstTimeGenderFill",
                table: "Partners",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
