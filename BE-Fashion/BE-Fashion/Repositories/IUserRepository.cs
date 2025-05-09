using BE_Fashion.Models;

namespace BE_Fashion.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailOrPhoneAsync(string? email, string? phoneNumber);
        Task<User?> GetByCredentialsAsync(string login, string password);
        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByIdAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task AddAsync(User entity);
        Task UpdateAsync(User entity);
        Task DeleteAsync(int id);
        Task<User?> GetByOauthIdAsync(string oauthId);

    }
}
