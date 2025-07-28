using Microsoft.EntityFrameworkCore;
using ProductService.Infrastructure.Data;
using ProductService.Infrastructure.Repositories;
using ProductService.Domain.Entities;
namespace ProductService.Tests
{
    public class UnitTest1
    {
        [Fact]
        public async Task AddAsync_ShouldAddProduct()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ProductDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDB")
                .Options;

            using var context = new ProductDbContext(options);
            var repo = new ProductRepository(context);

            var product = new Product { Name = "Test", Price = 100 };

            // Act
            await repo.AddAsync(product);
            var result = await context.Products.FirstOrDefaultAsync();

            // Assert
            Assert.Equal("Test", result.Name);
        }
    }
}