namespace BE_Fashion.Repositories
{
    // T is parameter in Generic. When you create a generic class or interface, you don't want to work with just one fixed data type(like int, string, double,...)
    // instead, you want to define a flexible data type that can be reused for different types
    // where T : class is a constraint that allows you to restrict the data types that the type parameter T can accept. Specifically, T must be a reference type,
    // meaning it has to be a class and cannot be a value type like int, double, or bool.
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync(int pageNumber,int pageSize);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
