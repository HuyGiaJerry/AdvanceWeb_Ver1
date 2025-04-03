using System;
using System.Security.Cryptography;
using System.Text;
namespace BE_Fashion.Helpers
{
    public class PasswordHelper
    {
        // generate salt random
        public static string CreateSalt(int length = 16)
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] saltBytes = new byte[length];
                rng.GetBytes(saltBytes);
                return Convert.ToBase64String(saltBytes); // convert salt string base64
            }
        }
        // Hash pass with salt
        public static string HashPasswordWithSalt(string password, string? salt)
        {
            using (var sha256  = SHA256.Create())
            {
                // Password salting
                var combineBytes = Encoding.UTF8.GetBytes(password + salt);
                var hashedBytes = sha256.ComputeHash(combineBytes);
                return Convert.ToBase64String(hashedBytes); // return the hashed password 
            }
        }
        // Check password
        public static bool VerifyPassword(string inputPassword, string storeHash, string storedSalt)
        {
            // Re-hash the entered password with salt stored in the database
            var inputHash = HashPasswordWithSalt(inputPassword, storedSalt);
            return inputHash == storeHash;
        }

    }
}
