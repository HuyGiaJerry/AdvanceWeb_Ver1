using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IProductColorService
    {
        Task<List<AllColorDto>> GetAllColorsAsync();
        Task<List<SizeDto>> GetAllSizesAsync();
    }
}
