using BE_Fashion.DTOs;

namespace BE_Fashion.Repositories
{
    public interface IProductColorRepository
    {
        Task<List<AllColorDto>> GetAllColorsAsync();
        Task<List<SizeDto>> GetAllSizesAsync();
    }
}
