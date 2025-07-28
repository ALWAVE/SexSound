using Microsoft.EntityFrameworkCore;
using ProductService.Application.Interfaces;
using ProductService.Infrastructure.Data;
using ProductService.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// ➕ Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ➕ Add DbContext
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ➕ Add DI
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// ➕ Setup Kestrel (для Docker)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80);
});

var app = builder.Build();

// ✅ Применение миграций (без удаления данных)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ProductDbContext>();

    // Ждём подключения к БД (актуально для Docker)
    var retries = 10;
    while (retries > 0)
    {
        try
        {
            Console.WriteLine("🔄 Applying migrations...");
            db.Database.Migrate(); // применяет миграции
            Console.WriteLine("✅ Migrations applied.");
            break;
        }
        catch (Exception ex)
        {
            retries--;
            Console.WriteLine($"⏳ Waiting for database... ({10 - retries}/10)");
            Console.WriteLine($"⚠️ {ex.Message}");
            Thread.Sleep(2000);
        }
    }
}

// ➕ Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
