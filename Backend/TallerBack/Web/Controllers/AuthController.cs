using Business.Classes;
using Business.Services.Auth;
using Business.Services.JWT;
using Entity.DTOs;
using Entity.DTOs.Auth;
using Entity.DTOs.Create;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.ModelSecurity
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly AuthService _authService;

        public AuthController(JwtService jwtService, AuthService userBusiness)
        {
            _jwtService = jwtService;
            _authService = userBusiness;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _authService.LoginAsync(request.Email, request.Password);
            if (user == null)
            {
                return Unauthorized("Credenciales inválidas.");
            }

            var token = _jwtService.GenerateToken(user.Id.ToString(), user.UserName);

            return Ok(new { token });
        }

    }
}
