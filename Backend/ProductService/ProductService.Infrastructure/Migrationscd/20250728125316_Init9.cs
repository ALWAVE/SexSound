using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductService.Infrastructure.Migrationscd
{
    /// <inheritdoc />
    public partial class Init9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
