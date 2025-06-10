using Business.Interfases;
using Entity.DTOs;
using Entity.Models;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class VehiculoController : GenericController<Vehiculo, VehiculoDTO>
    {
        public VehiculoController(IBaseBusiness<Vehiculo, VehiculoDTO> business, ILogger<VehiculoController> logger) : base(business, logger)
        {
        }
    }
}
