using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly DbtestContext _context;
        private readonly DbSet<User> _userSet;
        private readonly IMapper _mapper;
        public UserRepository(DbtestContext context, IMapper mapper)
        {
            _context = context;
            _userSet = context.Set<User>();
            _mapper = mapper;
        }
        public async Task<User?> GetByEmailOrPhoneAsync(RegisterRequest dto)
        {
            if (dto.Email != null)
            {
                var userByEmail = await _userSet.FirstOrDefaultAsync(u =>
                    u.Email != null && u.Email.Trim() == dto.Email);
                if (userByEmail != null) return userByEmail;
            }

            if (dto.PhoneNumber != null)
            {
                var userByPhone = await _userSet.FirstOrDefaultAsync(u =>
                    u.PhoneNumber != null && u.PhoneNumber.Trim() == dto.PhoneNumber);
                if (userByPhone != null) return userByPhone;
            }

            return null;
        }
        public async Task AddAsync(User entity)
        {
            // add user in database
            await _userSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(User entity)
        {
            _userSet.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var user = await _userSet.FindAsync(id);
            if (user != null)
            {
                _userSet.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<User?> GetByIdAsync(int id)
        {
            try
            {
                return await _userSet.FindAsync(id);
            }
            catch
            {
                return null;
            }
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _userSet.ToListAsync();
        }
        public async Task<User?> GetByCredentialsAsync(LoginRequest dto)
        {
            var user = await _userSet.FirstOrDefaultAsync(u =>
                                        (u.Email != null && u.Email.Trim().Equals(dto.Email)) ||
                                        (u.PhoneNumber != null && u.PhoneNumber.Trim().Equals(dto.PhoneNumber)));
            if (user == null)
                return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            return isPasswordValid ? user : null;
        }
    }
}
