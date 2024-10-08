using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AlreadyFilledSegmentations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentation",
                columns: table => new
                {
                    AlreadyFilledSegmentationsId = table.Column<int>(nullable: false),
                    PartnerUsersThatHasFilledSegmentationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    // Define the composite primary key
                    table.PrimaryKey("PK_PartnerUserSegmentation", x => new { x.AlreadyFilledSegmentationsId, x.PartnerUsersThatHasFilledSegmentationId });

                    // Foreign key to the PartnerUser table
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_PartnerUser_PartnerUsersThatHasFilledSegmentationId",
                        column: x => x.PartnerUsersThatHasFilledSegmentationId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);

                    // Foreign key to the Segmentation table
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_Segmentation_AlreadyFilledSegmentationsId",
                        column: x => x.AlreadyFilledSegmentationsId,
                        principalTable: "Segmentation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Create an index on PartnerUsersThatHasFilledSegmentationId for performance
            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentation_PartnerUsersThatHasFilledSegmentationId",
                table: "PartnerUserSegmentation",
                column: "PartnerUsersThatHasFilledSegmentationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUserSegmentation_PartnerUser_PartnerUsersThatHasFilledSegmentationId",
                table: "PartnerUserSegmentation");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUserSegmentation_Segmentation_AlreadyFilledSegmentationsId",
                table: "PartnerUserSegmentation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PartnerUserSegmentation",
                table: "PartnerUserSegmentation");

            migrationBuilder.DropIndex(
                name: "IX_PartnerUserSegmentation_PartnerUsersThatHasFilledSegmentationId",
                table: "PartnerUserSegmentation");

            migrationBuilder.RenameColumn(
                name: "PartnerUsersThatHasFilledSegmentationId",
                table: "PartnerUserSegmentation",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AlreadyFilledSegmentationsId",
                table: "PartnerUserSegmentation",
                newName: "Version");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "PartnerUserSegmentation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "PartnerUserSegmentation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsFilledFirstTime",
                table: "PartnerUserSegmentation",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "PartnerUserSegmentation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "PartnerUserId",
                table: "PartnerUserSegmentation",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SegmentationId",
                table: "PartnerUserSegmentation",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PartnerUserSegmentation",
                table: "PartnerUserSegmentation",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentation_PartnerUserId",
                table: "PartnerUserSegmentation",
                column: "PartnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentation_SegmentationId",
                table: "PartnerUserSegmentation",
                column: "SegmentationId");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUserSegmentation_PartnerUser_PartnerUserId",
                table: "PartnerUserSegmentation",
                column: "PartnerUserId",
                principalTable: "PartnerUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUserSegmentation_Segmentation_SegmentationId",
                table: "PartnerUserSegmentation",
                column: "SegmentationId",
                principalTable: "Segmentation",
                principalColumn: "Id");
        }
    }
}
