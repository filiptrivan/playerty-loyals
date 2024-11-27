using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StoreUpdatePointsScheduledTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Users_UserId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "TransactionProducts");

            migrationBuilder.DropTable(
                name: "TransactionStatuses");

            migrationBuilder.DropColumn(
                name: "Guid",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "GetPurchasesEndpoint",
                table: "Stores");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transactions",
                newName: "PartnerUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                newName: "IX_Transactions_PartnerUserId");

            migrationBuilder.RenameColumn(
                name: "GetReversalsEndpoint",
                table: "Stores",
                newName: "GetTransactionsEndpoint");

            migrationBuilder.AddColumn<string>(
                name: "ProductCategoryName",
                table: "Transactions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "Transactions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatePointsStartDatetime",
                table: "Stores",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PointsMultiplier",
                table: "Partners",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "StoreUpdatePointsScheduledTasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShouldStartedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinishedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StoreId = table.Column<long>(type: "bigint", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreUpdatePointsScheduledTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreUpdatePointsScheduledTasks_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StoreUpdatePointsScheduledTasks_StoreId",
                table: "StoreUpdatePointsScheduledTasks",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions",
                column: "PartnerUserId",
                principalTable: "PartnerUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_PartnerUsers_PartnerUserId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.DropColumn(
                name: "ProductCategoryName",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "UpdatePointsStartDatetime",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "PointsMultiplier",
                table: "Partners");

            migrationBuilder.RenameColumn(
                name: "PartnerUserId",
                table: "Transactions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PartnerUserId",
                table: "Transactions",
                newName: "IX_Transactions_UserId");

            migrationBuilder.RenameColumn(
                name: "GetTransactionsEndpoint",
                table: "Stores",
                newName: "GetReversalsEndpoint");

            migrationBuilder.AddColumn<Guid>(
                name: "Guid",
                table: "Transactions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "GetPurchasesEndpoint",
                table: "Stores",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TransactionProducts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionId = table.Column<long>(type: "bigint", nullable: true),
                    ProductId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionProducts_Transactions_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TransactionStatuses",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TransactionId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionStatuses_Transactions_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionProducts_TransactionId",
                table: "TransactionProducts",
                column: "TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionStatuses_TransactionId",
                table: "TransactionStatuses",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Users_UserId",
                table: "Transactions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
