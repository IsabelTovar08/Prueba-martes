using Business.Classes;
using Business.Classes.Base;
using Business.Interfases;
using Business.Services.Auth;
using Business.Services.JWT;
using Data.Classes.Specifics;
using Data.Interfases;
using Entity.DTOs;
using Entity.Models;

namespace Web.Extensions
{
    public static class ServiceExtensionsScoped
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services)
        {
            //User 
            services.AddScoped<UserData>();
            services.AddScoped<ICrudBase<User>, UserData>();
            services.AddScoped<UserBusiness>();
            services.AddScoped<IBaseBusiness<User, UserDTO>, UserBusiness>();

            //Cliente
            services.AddScoped<ClienteData>();
            services.AddScoped<ICrudBase<Cliente>, ClienteData>();
            services.AddScoped<ClienteBusiness>();
            services.AddScoped<IBaseBusiness<Cliente, CLienteDTO>, ClienteBusiness>();

            //Vehiculo
            services.AddScoped<VehiculoData>();
            services.AddScoped<ICrudBase<Vehiculo>, VehiculoData>();
            services.AddScoped<VehiculoBusiness>();
            services.AddScoped<IBaseBusiness<Vehiculo, VehiculoDTO>, VehiculoBusiness>();

            //Reserva
            services.AddScoped<ReservaData>();
            services.AddScoped<ICrudBase<Reserva>, ReservaData>();
            services.AddScoped<ReservaBusiness>();
            services.AddScoped<IBaseBusiness<Reserva, ReservaDTO>, ReservaBusiness>();

            //Auth 
            services.AddScoped<UserService>();

            services.AddScoped<AuthService>();
            services.AddScoped<JwtService>();

          
            return services;
        }
    }
}

