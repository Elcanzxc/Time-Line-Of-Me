using Microsoft.EntityFrameworkCore;
using Time_Line_Of_Me.Application.Services;
using Time_Line_Of_Me.DataAccess;
using Time_Line_Of_Me.DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();



builder.Services.AddDbContext<TimeLineOfMeDbContext>(
    options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("TimeLineOfMeDatabase");
        options.UseSqlServer(connectionString);
    });


builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IBooksRepository, BooksRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5174") // Адрес вашего фронтенда
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers();

var app = builder.Build();



app.UseCors("AllowSpecificOrigin");
app.UseRouting();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "api");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

/*
app.Use(async (context, next) =>
{
    // IP адрес клиента
    var remoteIp = context.Connection.RemoteIpAddress;

    // Порт клиента
    var remotePort = context.Connection.RemotePort;

    // IP адрес сервера
    var localIp = context.Connection.LocalIpAddress;

    // Порт сервера
    var localPort = context.Connection.LocalPort;

    // User Agent (браузер)
    var userAgent = context.Request.Headers["User-Agent"].ToString();

    // HTTP метод
    var method = context.Request.Method;

    Console.WriteLine($"Клиент: {remoteIp}:{remotePort}");
    Console.WriteLine($"Сервер: {localIp}:{localPort}");
    Console.WriteLine($"User-Agent: {userAgent}");
    Console.WriteLine($"Метод: {method}");
    Console.WriteLine("---");

    await next();
});
*/


app.Run();
