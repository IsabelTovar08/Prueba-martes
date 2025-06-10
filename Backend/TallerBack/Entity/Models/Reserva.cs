using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Models.Base;

namespace Entity.Models
{
    public class Reserva : BaseModel
    {
        public int ClienteId { get; set; }
        public int VehiculoId { get; set; }

        public DateTime FechaInicioReserva { get; set; }
        public DateTime FechaDeEntrega { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
        public DateTime FechaEntregado { get; set; }

        public Cliente cliente { get; set; }
        public Vehiculo Vehiculo { get; set; }
    }
}
