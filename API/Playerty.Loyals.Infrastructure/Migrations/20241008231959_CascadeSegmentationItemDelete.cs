using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CascadeSegmentationItemDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItem_Segmentation_SegmentationId",
                table: "SegmentationItem");

            migrationBuilder.AddForeignKey(
                name: "FK_SegmentationItem_Segmentation_SegmentationId",
                table: "SegmentationItem",
                column: "SegmentationId",
                principalTable: "Segmentation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItem_Segmentation_SegmentationId",
                table: "SegmentationItem");

            migrationBuilder.AddForeignKey(
                name: "FK_SegmentationItem_Segmentation_SegmentationId",
                table: "SegmentationItem",
                column: "SegmentationId",
                principalTable: "Segmentation",
                principalColumn: "Id");
        }
    }
}
