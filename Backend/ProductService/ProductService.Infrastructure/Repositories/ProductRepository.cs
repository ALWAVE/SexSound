using Microsoft.EntityFrameworkCore;
using ProductService.Application.Interfaces;
using ProductService.Domain.Entities;
using ProductService.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductDbContext _context;
        public ProductRepository(ProductDbContext context)
        {
            _context = context;
        }   

        public async Task<IEnumerable<Product>> GetAllAsync() => await _context.Products.ToListAsync();
        public async Task<Product?> GetByIdAsync(Guid id) => await _context.Products.FindAsync(id);
        public async Task AddAsync(Product product)
        {
            if (product.Id == Guid.Empty)
                product.Id = Guid.NewGuid();

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
