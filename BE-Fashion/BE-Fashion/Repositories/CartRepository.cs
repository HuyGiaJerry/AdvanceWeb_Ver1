//using BE_Fashion.Models;

//namespace BE_Fashion.Repositories
//{
//    public class CartRepository : IRepository<CartItem>
//    {
//        private DbtestContext _context;
//        public CartRepository(DbtestContext context)
//        {
//            _context = context;
//        }

//        public async Task<CartItem?> GetByIdAsync(int id)
//        {
//            try
//            {
//                return await _context.CartItems.FindAsync(id);
//            }
//            catch
//            {
//                return null;
//            }
//        }
//        public Task<IEnumerable<CartItem>> GetAllAsync(int pageNumber, int pageSize)
//        {

//        }
//        Task AddAsync(T entity);
//        Task UpdateAsync(T entity);
//        Task DeleteAsync(int id);
//    }
//}
