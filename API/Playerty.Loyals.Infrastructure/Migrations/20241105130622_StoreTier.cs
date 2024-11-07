using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StoreTier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreDiscountCategory");

            migrationBuilder.DropTable(
                name: "StoreTier");

            migrationBuilder.CreateTable(
                name: "StoreTiers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreId = table.Column<long>(type: "bigint", nullable: true),
                    TierId = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreTiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreTiers_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StoreTiers_Tiers_TierId",
                        column: x => x.TierId,
                        principalTable: "Tiers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StoreTierDiscountCategory",
                columns: table => new
                {
                    StoreTiersId = table.Column<long>(type: "bigint", nullable: false),
                    DiscountCategoriesId = table.Column<long>(type: "bigint", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreTierDiscountCategory", x => new { x.StoreTiersId, x.DiscountCategoriesId });
                    table.ForeignKey(
                        name: "FK_StoreTierDiscountCategory_DiscountCategories_DiscountCategoriesId",
                        column: x => x.DiscountCategoriesId,
                        principalTable: "DiscountCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoreTierDiscountCategory_StoreTiers_StoreTiersId",
                        column: x => x.StoreTiersId,
                        principalTable: "StoreTiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StoreTierDiscountCategory_DiscountCategoriesId",
                table: "StoreTierDiscountCategory",
                column: "DiscountCategoriesId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTiers_StoreId",
                table: "StoreTiers",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTiers_TierId",
                table: "StoreTiers",
                column: "TierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreTierDiscountCategory");

            migrationBuilder.DropTable(
                name: "StoreTiers");

            migrationBuilder.CreateTable(
                name: "StoreDiscountCategory",
                columns: table => new
                {
                    StoresId = table.Column<long>(type: "bigint", nullable: false),
                    DiscountCategoriesId = table.Column<long>(type: "bigint", nullable: false),
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
                name: "IX_StoreTier_TiersId",
                table: "StoreTier",
                column: "TiersId");
        }
    }
}
