using BE_Fashion.Mappings;
using BE_Fashion.Models;
using BE_Fashion.Services;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var redisConnectionString = builder.Configuration.GetValue<string>("Redis:ConnectionString");

if (string.IsNullOrEmpty(redisConnectionString))
{
    throw new InvalidOperationException("Redis connection string is not configured.");
}

builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; // Or Ignore
        options.JsonSerializerOptions.WriteIndented = true;
    });
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
//builder.Services.AddScoped<IUserRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<ProductRepository>();

// Register UserService in Dependency Injection DI Container: 
builder.Services.AddHttpClient();
builder.Services.AddLogging();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<AuthService>();
//builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddAutoMapper(typeof(ProductProfile));


// Jwt
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT key is not configured.");
}
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();


// allow CORS (Cross-Origin Resource Sharing) is a browser security mechanism that allow (or blocks) a website on one domain from accessing resource from another domain.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontEnd",
        policy =>
        {
        //Allows all types of headers from the client to be sent to the server without being blocked.
        // Host: localhost:5000 Content - Type: application / json Authorization: Bearer eyJhbGciOiJIUzI1...User - Agent: Mozilla / 5.0(Windows NT 10.0; Win64; x64)
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
});


var app = builder.Build();

// Allow access static files in wwwroot
app.UseStaticFiles();

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
