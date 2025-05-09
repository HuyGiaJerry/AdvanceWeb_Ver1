using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Google.Apis.Auth;
using Newtonsoft.Json;

namespace BE_Fashion.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository; 
        private readonly IMapper _mapper;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _config;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthService(
            IUserRepository userRepository, 
            IMapper mapper,
            IJwtTokenService jwtTokenService,
            IConfiguration config,
            IRefreshTokenRepository refreshTokenRepository
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtTokenService = jwtTokenService;
            _config = config;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<(bool IsSuccess, string Message, Auth Auth)> RefreshLoginAsync(string refreshToken)
        {
            // Kiểm tra refresh token trong database
            var storedRefreshToken = await _refreshTokenRepository.GetByTokenAsync(refreshToken);

            if (storedRefreshToken == null || storedRefreshToken.Revoked || storedRefreshToken.ExpiresAt < DateTime.UtcNow)
            {
                return (false, "Invalid or expired refresh token", null!);
            }

            // Lấy user từ refresh token
            var user = await _userRepository.GetByIdAsync(storedRefreshToken.UserId);  // Đảm bảo UserId không phải null

            if (user == null)
            {
                return (false, "User not found", null!);
            }

            //// Tạo mới access token và refresh token
            
            var userDto = _mapper.Map<CreateUser>(user);
            var auth = new Auth
            {
                AccessToken = _jwtTokenService.GenerateAccessToken(userDto),
                RefreshToken = _jwtTokenService.GenerateRefreshToken(),
                FullName = userDto.FullName,
                Role = userDto.Role
            };

            // Cập nhật refresh token hiện có trong database
            storedRefreshToken.Token = auth.RefreshToken;
            storedRefreshToken.ExpiresAt = DateTime.UtcNow.AddDays(7);
            storedRefreshToken.IssuedAt = DateTime.UtcNow;
            storedRefreshToken.Revoked = false;

            await _refreshTokenRepository.UpdateAsync(storedRefreshToken); // Sử dụng UpdateAsync thay vì AddAsync

            return (true, "Token refreshed successfully", auth);
        }

        public async Task<(bool IsSuccess, string Message, Auth Auth)> GoogleLoginWithCodeAsync(string code)
        {
            // Step 1: Đổi code lấy access token
            var client = new HttpClient();
            var values = new Dictionary<string, string>
    {
        { "code", code },
        { "client_id", _config["Google:ClientId"]! },
        { "client_secret", _config["Google:ClientSecret"]! },
        { "redirect_uri", _config["Google:RedirectUri"]! },
        { "grant_type", "authorization_code" }
    };

            var tokenResponse = await client.PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(values));
            if (!tokenResponse.IsSuccessStatusCode)
                return (false, "Failed to get Google token", null!);

            var tokenContent = await tokenResponse.Content.ReadAsStringAsync();
            var tokenObj = JsonConvert.DeserializeObject<dynamic>(tokenContent);
            if (tokenObj?.access_token == null)
            {
                return (false, "Failed to obtain access token from Google", null!);
            }
            var accessToken = (string)tokenObj.access_token;

            // Step 2: Lấy thông tin người dùng từ Google
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
            var userInfoResponse = await client.GetAsync("https://www.googleapis.com/oauth2/v3/userinfo");

            if (!userInfoResponse.IsSuccessStatusCode)
                return (false, "Failed to get user info", null!);

            var userInfoJson = await userInfoResponse.Content.ReadAsStringAsync();
            var googleUser = JsonConvert.DeserializeObject<GoogleUserInfo>(userInfoJson);

            // Kiểm tra Sub và Email có phải null không
            if (googleUser?.Sub == null || googleUser?.Email == null)
            {
                return (false, "Google user information is incomplete", null!);
            }

            // Step 3: Kiểm tra theo OauthId
            var user = await _userRepository.GetByOauthIdAsync(googleUser.Sub);

            if (user == null)
            {
                // Nếu chưa có OauthId, kiểm tra theo Email
                user = await _userRepository.GetByEmailAsync(googleUser.Email);

                if (user == null)
                {
                    // Nếu cũng không có email, tạo mới từ DTO
                    var plainPass = Guid.NewGuid().ToString();
                    var hashPassword = BCrypt.Net.BCrypt.HashPassword(plainPass);
                    var createUserDto = new CreateUser
                    {
                        Email = googleUser.Email,
                        PasswordHash = hashPassword,
                        FullName = googleUser.Name,
                        AvatarUrl = googleUser.Picture,
                        OauthProvider = "google",
                        OauthId = googleUser.Sub,
                        Role = "customer"
                    };

                    user = _mapper.Map<User>(createUserDto);
                    await _userRepository.AddAsync(user);
                }
                else
                {
                    // Nếu có email nhưng chưa có OauthId, cập nhật lại
                    user.OauthProvider = "google";
                    user.OauthId = googleUser.Sub;
                    await _userRepository.UpdateAsync(user);
                }
            }
            
            var userDto = _mapper.Map<CreateUser>(user);
            
            var auth = new Auth
            {
                AccessToken = _jwtTokenService.GenerateAccessToken(userDto),
                RefreshToken = _jwtTokenService.GenerateRefreshToken(),
                FullName = userDto.FullName,
                PhoneNumber = userDto.PhoneNumber,
                AvatarUrl = userDto.AvatarUrl,
                Role = userDto.Role
            };
            // Lưu refresh token vào database
            var refreshToken = new RefreshToken
            {
                UserId = user.UserId,
                Token = auth.RefreshToken,
                Provider = "google",
                IssuedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            await _refreshTokenRepository.AddAsync(refreshToken);


            return (true, "Google login successful", auth);
        }

    }
}