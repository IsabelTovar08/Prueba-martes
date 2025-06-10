using Business.Interfases;
using Entity.DTOs;
using Entity.Models;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class ClienteController : GenericController<Cliente, CLienteDTO>
    {
        public ClienteController(IBaseBusiness<Cliente, CLienteDTO> business, ILogger<ClienteController> logger) : base(business, logger)
        {
        }
    }
}
