using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StoreDiscountCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateUserEndpoint",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "LoadPurchasesEndpoint",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "LoadReversalsEndpoint",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "UpdatePointsInterval",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "UpdateUserGroupEndpoint",
                table: "Partners");

            migrationBuilder.CreateTable(
                name: "DiscountCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UpdatePointsInterval = table.Column<int>(type: "int", nullable: true),
                    LoadPurchasesEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    LoadReversalsEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreateUserEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdateUserGroupEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stores_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StoreDiscountCategory",
                columns: table => new
                {
                    DiscountCategoriesId = table.Column<long>(type: "bigint", nullable: false),
                    StoresId = table.Column<long>(type: "bigint", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreDiscountCategory", x => new { x.StoresId, x.DiscountCategoriesId });
                    table.ForeignKey(
                        name: "FK_StoreDiscountCategory_DiscountCategories_DiscountCategoriesId",
                        column: x => x.DiscountCategoriesId,
                        principalTable: "DiscountCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoreDiscountCategory_Stores_StoresId",
                        column: x => x.StoresId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreTier",
                columns: table => new
                {
                    StoresId = table.Column<long>(type: "bigint", nullable: false),
                    TiersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreTier", x => new { x.StoresId, x.TiersId });
                    table.ForeignKey(
                        name: "FK_StoreTier_Stores_StoresId",
                        column: x => x.StoresId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoreTier_Tiers_TiersId",
                        column: x => x.TiersId,
                        principalTable: "Tiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StoreDiscountCategory_DiscountCategoriesId",
                table: "StoreDiscountCategory",
                column: "DiscountCategoriesId");

            migrationBuilder.CreateIndex(
                name: "IX_Stores_PartnerId",
                table: "Stores",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTier_TiersId",
                table: "StoreTier",
                column: "TiersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreDiscountCategory");

            migrationBuilder.DropTable(
                name: "StoreTier");

            migrationBuilder.DropTable(
                name: "DiscountCategories");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.AddColumn<string>(
                name: "CreateUserEndpoint",
                table: "Partners",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoadPurchasesEndpoint",
                table: "Partners",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoadReversalsEndpoint",
                table: "Partners",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UpdatePointsInterval",
                table: "Partners",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateUserGroupEndpoint",
                table: "Partners",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }
    }
}
