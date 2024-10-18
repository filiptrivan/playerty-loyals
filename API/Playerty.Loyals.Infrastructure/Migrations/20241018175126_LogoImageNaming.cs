using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LogoImageNaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogoImageBlobName",
                table: "Partners",
                newName: "LogoImage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogoImage",
                table: "Partners",
                newName: "LogoImageBlobName");
        }
    }
}
