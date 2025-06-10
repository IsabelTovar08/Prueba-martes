using Business.Interfases;
using Entity.DTOs;
using Entity.Models;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class ReservaController : GenericController<Reserva, ReservaDTO>
    {
        public ReservaController(IBaseBusiness<Reserva, ReservaDTO> business, ILogger<ReservaController> logger) : base(business, logger)
        {
        }
    }
}
