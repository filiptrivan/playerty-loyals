using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ManyToOneRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId1",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId",
                table: "PartnerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId1",
                table: "PartnerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId1",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Users_UserExtendedId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Users_UserId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId",
                table: "SegmentationItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId1",
                table: "SegmentationItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Segmentations_Partners_PartnerId",
                table: "Segmentations");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_Partners_PartnerId",
                table: "Stores");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Stores_StoreId",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Stores_StoreId1",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Tiers_TierId",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Tiers_TierId1",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId1",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiers_Partners_PartnerId",
                table: "Tiers");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiers_Partners_PartnerId1",
                table: "Tiers");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Tiers_PartnerId1",
                table: "Tiers");

            migrationBuilder.DropIndex(
                name: "IX_StoreUpdatePointsScheduledTasks_StoreId1",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropIndex(
                name: "IX_StoreTiers_StoreId1",
                table: "StoreTiers");

            migrationBuilder.DropIndex(
                name: "IX_StoreTiers_TierId1",
                table: "StoreTiers");

            migrationBuilder.DropIndex(
                name: "IX_SegmentationItems_SegmentationId1",
                table: "SegmentationItems");

            migrationBuilder.DropIndex(
                name: "IX_PartnerUsers_PartnerId1",
                table: "PartnerUsers");

            migrationBuilder.DropIndex(
                name: "IX_PartnerUsers_UserExtendedId",
                table: "PartnerUsers");

            migrationBuilder.DropIndex(
                name: "IX_PartnerRoles_PartnerId1",
                table: "PartnerRoles");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_PartnerId1",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "PartnerId1",
                table: "Tiers");

            migrationBuilder.DropColumn(
                name: "StoreId1",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropColumn(
                name: "StoreId1",
                table: "StoreTiers");

            migrationBuilder.DropColumn(
                name: "TierId1",
                table: "StoreTiers");

            migrationBuilder.DropColumn(
                name: "SegmentationId1",
                table: "SegmentationItems");

            migrationBuilder.DropColumn(
                name: "PartnerId1",
                table: "PartnerUsers");

            migrationBuilder.DropColumn(
                name: "UserExtendedId",
                table: "PartnerUsers");

            migrationBuilder.DropColumn(
                name: "PartnerId1",
                table: "PartnerRoles");

            migrationBuilder.DropColumn(
                name: "PartnerId1",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId",
                table: "PartnerRoles",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId",
                table: "PartnerUsers",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Users_UserId",
                table: "PartnerUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId",
                table: "SegmentationItems",
                column: "SegmentationId",
                principalTable: "Segmentations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Segmentations_Partners_PartnerId",
                table: "Segmentations",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_Partners_PartnerId",
                table: "Stores",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Stores_StoreId",
                table: "StoreTiers",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Tiers_TierId",
                table: "StoreTiers",
                column: "TierId",
                principalTable: "Tiers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tiers_Partners_PartnerId",
                table: "Tiers",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions",
                column: "PartnerUserId",
                principalTable: "PartnerUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId",
                table: "PartnerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Users_UserId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId",
                table: "SegmentationItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Segmentations_Partners_PartnerId",
                table: "Segmentations");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_Partners_PartnerId",
                table: "Stores");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Stores_StoreId",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Tiers_TierId",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiers_Partners_PartnerId",
                table: "Tiers");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions");

            migrationBuilder.AddColumn<int>(
                name: "PartnerId1",
                table: "Tiers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoreId1",
                table: "StoreUpdatePointsScheduledTasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoreId1",
                table: "StoreTiers",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TierId1",
                table: "StoreTiers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SegmentationId1",
                table: "SegmentationItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartnerId1",
                table: "PartnerUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserExtendedId",
                table: "PartnerUsers",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartnerId1",
                table: "PartnerRoles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartnerId1",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tiers_PartnerId1",
                table: "Tiers",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_StoreUpdatePointsScheduledTasks_StoreId1",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId1");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTiers_StoreId1",
                table: "StoreTiers",
                column: "StoreId1");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTiers_TierId1",
                table: "StoreTiers",
                column: "TierId1");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentationItems_SegmentationId1",
                table: "SegmentationItems",
                column: "SegmentationId1");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUsers_PartnerId1",
                table: "PartnerUsers",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUsers_UserExtendedId",
                table: "PartnerUsers",
                column: "UserExtendedId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRoles_PartnerId1",
                table: "PartnerRoles",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_PartnerId1",
                table: "Notifications",
                column: "PartnerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountCategories_Stores_StoreId",
                table: "DiscountCategories",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Partners_PartnerId",
                table: "Notifications",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Partners_PartnerId1",
                table: "Notifications",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId",
                table: "PartnerRoles",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId1",
                table: "PartnerRoles",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId",
                table: "PartnerUsers",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId1",
                table: "PartnerUsers",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Users_UserExtendedId",
                table: "PartnerUsers",
                column: "UserExtendedId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerUsers_Users_UserId",
                table: "PartnerUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId",
                table: "SegmentationItems",
                column: "SegmentationId",
                principalTable: "Segmentations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId1",
                table: "SegmentationItems",
                column: "SegmentationId1",
                principalTable: "Segmentations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Segmentations_Partners_PartnerId",
                table: "Segmentations",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_Partners_PartnerId",
                table: "Stores",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Stores_StoreId",
                table: "StoreTiers",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Stores_StoreId1",
                table: "StoreTiers",
                column: "StoreId1",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Tiers_TierId",
                table: "StoreTiers",
                column: "TierId",
                principalTable: "Tiers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Tiers_TierId1",
                table: "StoreTiers",
                column: "TierId1",
                principalTable: "Tiers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId1",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId1",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tiers_Partners_PartnerId",
                table: "Tiers",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tiers_Partners_PartnerId1",
                table: "Tiers",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions",
                column: "PartnerUserId",
                principalTable: "PartnerUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");
        }
    }
}
