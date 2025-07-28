using Microsoft.AspNetCore.Mvc;
using ProductService.API.DTOs;
using ProductService.Application.Interfaces;
using ProductService.Domain.Entities;
using ProductService.Infrastructure.Data;

namespace ProductService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductDbContext _db;
    private readonly IProductRepository _repo;

    // ✅ Исправлено: второй параметр (_db) был пропущен
    public ProductsController(IProductRepository repo, ProductDbContext db)
    {
        _repo = repo;
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        => Ok(await _repo.GetAllAsync());

    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<Product>> GetById(Guid id)
    {
        var product = await _repo.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] CreateProductDto dto)
    {
        // ✅ Создание Product вручную
        var product = new Product
        {
            Name = dto.Name,
            Brand = dto.Brand,
            Description = dto.Description,
            Price = dto.Price
        };

        // ✅ Сохраняем напрямую в DbContext
        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Product product)
    {
        if (id != product.Id) return BadRequest("Ids mismatch");
        await _repo.UpdateAsync(product);
        return NoContent();
    }

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
