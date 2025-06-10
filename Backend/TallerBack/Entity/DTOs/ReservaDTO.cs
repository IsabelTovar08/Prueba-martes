using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.DTOs.Base;

namespace Entity.DTOs
{
    public class ReservaDTO : BaseDTO
    {
        public int ClienteId { get; set; }
        public string NombreCompletoCLiente { get; set; }

        public int VehiculoId { get; set; }
        public string MarcaVehiculo { get; set; }
        public string ModeloVehiculo { get; set; }
        public string PlacaVehiculo { get; set; }


        public DateTime FechaReserva { get; set; }
        public DateTime FechaEntrega { get; set; }

        public DateTime Date { get; set; }
        public DateTime FechaEntregado { get; set; }


    }
}
