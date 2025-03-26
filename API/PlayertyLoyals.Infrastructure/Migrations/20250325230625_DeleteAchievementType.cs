using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeleteAchievementType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achievement_AchievementType_AchievementTypeId",
                table: "Achievement");

            migrationBuilder.DropTable(
                name: "AchievementType");

            migrationBuilder.DropIndex(
                name: "IX_Achievement_AchievementTypeId",
                table: "Achievement");

            migrationBuilder.DropColumn(
                name: "AchievementTypeId",
                table: "Achievement");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AchievementTypeId",
                table: "Achievement",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AchievementType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Achievement_AchievementTypeId",
                table: "Achievement",
                column: "AchievementTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Achievement_AchievementType_AchievementTypeId",
                table: "Achievement",
                column: "AchievementTypeId",
                principalTable: "AchievementType",
                principalColumn: "Id");
        }
    }
}
