using Microsoft.EntityFrameworkCore;
using BE_Fashion.Models;
using BE_Fashion.DTOs;

namespace BE_Fashion.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DbtestContext _context;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(DbtestContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<User?> GetByEmailOrPhoneAsync(string? email, string? phoneNumber)
        {
            try
            {
                if (!string.IsNullOrEmpty(email))
                {
                    var userByEmail = await _context.Users.FirstOrDefaultAsync(u =>
                        u.Email != null && u.Email.Trim() == email.Trim());
                    if (userByEmail != null)
                        return userByEmail;
                }

                if (!string.IsNullOrEmpty(phoneNumber))
                {
                    var userByPhone = await _context.Users.FirstOrDefaultAsync(u =>
                        u.PhoneNumber != null && u.PhoneNumber.Trim() == phoneNumber.Trim());
                    if (userByPhone != null)
                        return userByPhone;
                }

                return null;
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to retrieve user by email or phone. Email: {Email}, Phone: {Phone}", email, phoneNumber);
                return null;
            }
        }

        public async Task AddAsync(User entity)
        {
            try
            {
                await _context.Users.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to add user.");
                throw;
            }
        }

        public async Task UpdateAsync(User entity)
        {
            try
            {
                _context.Users.Update(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to update user with ID: {UserId}", entity.UserId);
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to delete user with ID: {UserId}", id);
                throw;
            }
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Users.FindAsync(id);
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to retrieve user by ID: {UserId}", id);
                return null;
            }
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            try
            {
                return await _context.Users
                    .Where(u => u.Role!.Equals("customer"))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to retrieve all users.");
                return Enumerable.Empty<User>();
            }
        }

        public async Task<User?> GetByCredentialsAsync(string login, string password)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u =>
                    (u.Email != null && u.Email.Trim().Equals(login)) ||
                    (u.PhoneNumber != null && u.PhoneNumber.Trim().Equals(login)));

                if (user == null)
                    return null;

                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
                return isPasswordValid ? user : null;
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to authenticate user with login: {Login}", login);
                return null;
            }
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                    return null;

                return await _context.Users.FirstOrDefaultAsync(u =>
                    u.Email != null && u.Email.Trim().Equals(email.Trim()));
            }
            catch (Exception ex)
            {
                // TODO: Log error
                _logger.LogError(ex, "Error occurred while trying to retrieve user by email: {Email}", email);
                return null;
            }
        }
        public async Task<User?> GetByOauthIdAsync(string oauthId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.OauthId == oauthId);
        }

    }
}
