using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Models.Base;

namespace Entity.Models
{
    public class Vehiculo : BaseModel
    {
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Placa { get; set; }

        public List<Reserva> reservas { get; set; }
    }
}
