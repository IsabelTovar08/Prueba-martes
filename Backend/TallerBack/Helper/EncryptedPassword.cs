using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Entity.Models;

namespace Helper
{
    public static class EncryptedPassword
    {
        public static string EncryptPassword(string password)
        {
           return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public static bool VerifyPassword(string plainPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
        }
    }
}
