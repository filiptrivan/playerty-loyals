using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ManualIsRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShouldStartedAt",
                table: "StoreUpdatePointsScheduledTasks",
                newName: "TransactionsTo");

            migrationBuilder.RenameColumn(
                name: "UpdatePointsStartDatetime",
                table: "Stores",
                newName: "UpdatePointsStartDate");

            migrationBuilder.AlterColumn<long>(
                name: "PartnerUserId",
                table: "Transactions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BoughtAt",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ProductCategoryImageUrl",
                table: "Transactions",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductImageUrl",
                table: "Transactions",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoreId",
                table: "Transactions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Tiers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartnerId1",
                table: "Tiers",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "StoreUpdatePointsScheduledTasks",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoreId1",
                table: "StoreUpdatePointsScheduledTasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TransactionsFrom",
                table: "StoreUpdatePointsScheduledTasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "TierId",
                table: "StoreTiers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "StoreTiers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Stores",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Segmentations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SegmentationId",
                table: "SegmentationItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SegmentationId1",
                table: "SegmentationItems",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "PartnerUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "PartnerUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "PartnerRoles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "DiscountCategories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_StoreId",
                table: "Transactions",
                column: "StoreId");

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
                name: "FK_Notifications_Partners_PartnerId1",
                table: "Notifications",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId1",
                table: "PartnerRoles",
                column: "PartnerId1",
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
                name: "FK_SegmentationItems_Segmentations_SegmentationId1",
                table: "SegmentationItems",
                column: "SegmentationId1",
                principalTable: "Segmentations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Stores_StoreId1",
                table: "StoreTiers",
                column: "StoreId1",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTiers_Tiers_TierId1",
                table: "StoreTiers",
                column: "TierId1",
                principalTable: "Tiers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId1",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId1",
                principalTable: "Stores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tiers_Partners_PartnerId1",
                table: "Tiers",
                column: "PartnerId1",
                principalTable: "Partners",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Partners_PartnerId1",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerRoles_Partners_PartnerId1",
                table: "PartnerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Partners_PartnerId1",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerUsers_Users_UserExtendedId",
                table: "PartnerUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SegmentationItems_Segmentations_SegmentationId1",
                table: "SegmentationItems");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Stores_StoreId1",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTiers_Tiers_TierId1",
                table: "StoreTiers");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId1",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiers_Partners_PartnerId1",
                table: "Tiers");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Stores_StoreId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_StoreId",
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
                name: "BoughtAt",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ProductCategoryImageUrl",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ProductImageUrl",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PartnerId1",
                table: "Tiers");

            migrationBuilder.DropColumn(
                name: "StoreId1",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropColumn(
                name: "TransactionsFrom",
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

            migrationBuilder.RenameColumn(
                name: "TransactionsTo",
                table: "StoreUpdatePointsScheduledTasks",
                newName: "ShouldStartedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatePointsStartDate",
                table: "Stores",
                newName: "UpdatePointsStartDatetime");

            migrationBuilder.AlterColumn<long>(
                name: "PartnerUserId",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Tiers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "StoreUpdatePointsScheduledTasks",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "TierId",
                table: "StoreTiers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "StoreTiers",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Stores",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "Segmentations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentationId",
                table: "SegmentationItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "PartnerUsers",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "PartnerUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PartnerId",
                table: "PartnerRoles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "StoreId",
                table: "DiscountCategories",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
