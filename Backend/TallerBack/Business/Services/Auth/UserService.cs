using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Context;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using static Helper.EncryptedPassword;

namespace Business.Services.Auth
{
        public class UserService
        {
            private readonly ApplicationDbContext _context;
            private readonly ILogger<UserService> _logger;
            public UserService(ApplicationDbContext context, ILogger<UserService> logger)
            {
                _context = context;
                _logger = logger;
            }


            public async Task<User?> ValidateUserAsync(string email, string password)
            {
                var user = await _context.Set<User>()
                    .FirstOrDefaultAsync(u => u.UserName == email && u.IsDeleted == false);

                if (user == null)
                    return null;

                bool isValid = VerifyPassword(password, user.Password); ;
                return isValid ? user : null;
            }

        
    }
}
