using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IsManual : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishedAt",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.AddColumn<bool>(
                name: "IsManual",
                table: "StoreUpdatePointsScheduledTasks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsManual",
                table: "StoreUpdatePointsScheduledTasks");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishedAt",
                table: "StoreUpdatePointsScheduledTasks",
                type: "datetime2",
                nullable: true);
        }
    }
}
