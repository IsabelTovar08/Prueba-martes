using AutoMapper;
using Business.Classes.Base;
using Business.Services.Auth;
using Data.Classes.Specifics;
using Data.Interfases;
using Entity.DTOs;
using Entity.Models;
using Microsoft.Extensions.Logging;
using Utilities.Exeptions;

namespace Business.Classes
{
    public class UserBusiness : BaseBusiness<User, UserDTO>
    {
        private readonly UserService _userService;
        public readonly UserData _userData;

        // Constructor para inyectar dependencias
        public UserBusiness(ICrudBase<User> data, ILogger<User> logger, IMapper mapper, UserData userData,UserService userService)
            : base(data, logger, mapper)
        {
            _userData = userData;
            _userService = userService;
        }

        // Validación del DTO
        protected void Validate(UserDTO userDTO)
        {
            var errors = new List<string>();

            if (userDTO == null)
            {
                throw new ValidationException("El Usuario no puede ser nulo.");
            }
            if (string.IsNullOrWhiteSpace(userDTO.UserName))
                errors.Add("El Nombre del Usuario es obligatorio.");
            if (string.IsNullOrWhiteSpace(userDTO.Password))
                errors.Add("La contraseña del Usuario es obligatoria.");

            // Si hay errores, lanzar excepción
            if (errors.Any())
            {
                throw new ValidationException(string.Join(" | ", errors));
            }


        }
        /// <summary>
        /// Crea una nueva entidad.
        /// </summary>
        public override async Task<UserDTO> Save(UserDTO userDTO)
        {
            try
            {
                Validate(userDTO);
                await EnsureEmailIsUnique(userDTO.UserName);

                var user = _mapper.Map<User>(userDTO);
                user.Password = HashPassword(userDTO.Password);

                var created = await _data.SaveAsync(user);
                return _mapper.Map<UserDTO>(created);
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear el usuario.");
                throw new ExternalServiceException("Base de datos", "No se pudo crear el usuario.");
            }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        private async Task EnsureEmailIsUnique(string email)
        {
            if (await _userData.FindByEmail(email) != null)
            {
                throw new ValidationException("Ya existe una cuenta asociada a este Nombre de Usuario.");
            }
        }

    }
}
