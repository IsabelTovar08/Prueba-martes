
using AutoMapper;
using Entity.DTOs;
using Entity.Models;

namespace Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            

            //Mapeo de la entidad ModuleForm 
            //CreateMap<ModuleForm, ModuleFormDto>()
            // .ForMember(dest => dest.NameForm, opt => opt.MapFrom(src => src.Form.Name))
            // .ForMember(dest => dest.NameModule, opt => opt.MapFrom(src => src.Module.Name))
            // .ReverseMap();
            //CreateMap<ModuleForm, ModuleFormCreateDto>().ReverseMap();


            //Mapeo de la entidad User
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Cliente, CLienteDTO>().ReverseMap();
            CreateMap<Vehiculo, VehiculoDTO>().ReverseMap();
            CreateMap<Reserva, ReservaDTO>()
                 .ForMember(dest => dest.NombreCompletoCLiente, opt => opt.MapFrom(src => src.cliente.Nombre + " " + src.cliente.Apellido))
                 .ForMember(dest => dest.PlacaVehiculo, opt => opt.MapFrom(src => src.Vehiculo.Placa ))
                 .ForMember(dest => dest.MarcaVehiculo, opt => opt.MapFrom(src => src.Vehiculo.Marca))
                 .ForMember(dest => dest.ModeloVehiculo, opt => opt.MapFrom(src => src.Vehiculo.Modelo))


                .ReverseMap();


            //Mapeo de la entidad UserROl

        }
    }
}
