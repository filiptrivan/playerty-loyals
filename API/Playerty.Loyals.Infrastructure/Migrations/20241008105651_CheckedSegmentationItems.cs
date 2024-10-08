using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CheckedSegmentationItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentationItem",
                columns: table => new
                {
                    CheckedSegmentationItemsId = table.Column<long>(type: "bigint", nullable: false),
                    PartnerUsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserSegmentationItem", x => new { x.CheckedSegmentationItemsId, x.PartnerUsersId });
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_PartnerUser_PartnerUsersId",
                        column: x => x.PartnerUsersId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_SegmentationItem_CheckedSegmentationItemsId",
                        column: x => x.CheckedSegmentationItemsId,
                        principalTable: "SegmentationItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentationItem_PartnerUsersId",
                table: "PartnerUserSegmentationItem",
                column: "PartnerUsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Partners_PartnerId",
                table: "Roles");

            migrationBuilder.DropForeignKey(
                name: "FK_Segmentation_Partners_PartnerId",
                table: "Segmentation");

            migrationBuilder.DropTable(
                name: "PartnerUserSegmentationItem");

            migrationBuilder.DropIndex(
                name: "IX_Segmentation_PartnerId",
                table: "Segmentation");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "SegmentationItem");

            migrationBuilder.DropColumn(
                name: "DescriptionLatin",
                table: "Segmentation");

            migrationBuilder.DropColumn(
                name: "NameLatin",
                table: "Segmentation");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "Segmentation");

            migrationBuilder.DropColumn(
                name: "EmailBody",
                table: "Notifications");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SegmentationItem",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Segmentation",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Segmentation",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(400)",
                oldMaxLength: 400,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TitleLatin",
                table: "Notifications",
                type: "nvarchar(60)",
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Notifications",
                type: "nvarchar(60)",
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "DescriptionLatin",
                table: "Notifications",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(400)",
                oldMaxLength: 400);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Notifications",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(400)",
                oldMaxLength: 400);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Partners_PartnerId",
                table: "Roles",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");
        }
    }
}
