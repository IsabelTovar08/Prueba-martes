using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Classes.Base;
using Entity.Context;
using Entity.Models;
using Microsoft.Extensions.Logging;

namespace Data.Classes.Specifics
{
    public class VehiculoData : BaseData<Vehiculo>
    {
        public VehiculoData(ApplicationDbContext context, ILogger<Vehiculo> logger) : base(context, logger)
        {
        }
    }
}
