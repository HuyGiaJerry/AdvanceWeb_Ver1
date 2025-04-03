using BE_Fashion.Data;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình kết nối SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ??
        throw new InvalidOperationException("Chuỗi kết nối 'DefaultConnection' không được tìm thấy.")));

// Đăng ký JwtService
builder.Services.AddScoped<IJwtService, JwtService>();

// Xác thực JWT
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("Khóa JWT chưa được cấu hình");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
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
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "https://localhost:5173",
            "http://localhost:7009",
            "https://localhost:7009"  // Swagger origin
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();  // Đảm bảo bật để gửi cookie
    });
});
// Thêm Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.Lax; // Linh hoạt cho development
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // Dùng HTTPS nếu có
}) // Cookie để lưu trạng thái đăng nhập
.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
{
    options.ClientId = "1082077099324-9naa7hjqigq0brkum7gr65nmkdfevte4.apps.googleusercontent.com";
    options.ClientSecret = "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";
    options.CallbackPath = "/signin-google"; // Đường dẫn callback sau khi Google xác thực
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
