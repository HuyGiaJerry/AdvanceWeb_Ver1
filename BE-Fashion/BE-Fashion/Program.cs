using BE_Fashion.Mappings;
using BE_Fashion.Models;
using BE_Fashion.Services;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configure Database
builder.Services.AddDbContext<DbtestContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));
// AutoMapper
builder.Services.AddAutoMapper(typeof(UserProfile));


// Add UserRepository to DI container
builder.Services.AddScoped<UserRepository>();

// Register UserService in Dependency Injection DI Container: 
builder.Services.AddScoped<UserService>();

// allow CORS (Cross-Origin Resource Sharing) is a browser security mechanism that allow (or blocks) a website on one domain from accessing resource from another domain.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontEnd",
        policy =>
        {
        //Allows all types of headers from the client to be sent to the server without being blocked.
        // Host: localhost:5000 Content - Type: application / json Authorization: Bearer eyJhbGciOiJIUzI1...User - Agent: Mozilla / 5.0(Windows NT 10.0; Win64; x64)
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// use CORS

app.UseCors("AllowFrontEnd");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
