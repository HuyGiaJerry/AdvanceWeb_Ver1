using BE_Fashion.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE_Fashion.Services
{
    public class JwtService : IJwtService
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtService(IConfiguration configuration)
        {
            _secretKey = configuration["Jwt:Key"] ?? throw new ArgumentNullException(nameof(configuration), "Khóa JWT không được null");
            _issuer = configuration["Jwt:Issuer"] ?? throw new ArgumentNullException(nameof(configuration), "Issuer JWT không được null");
            _audience = configuration["Jwt:Audience"] ?? throw new ArgumentNullException(nameof(configuration), "Audience JWT không được null");
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
            throw new NotImplementedException();
        }
    }
}
