using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Classes.Base;
using Entity.Context;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Data.Classes.Specifics
{
    public class ReservaData : BaseData<Reserva>
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<Reserva> _logger;

        public ReservaData(ApplicationDbContext context, ILogger<Reserva> logger) : base(context, logger)
        {
            _context = context;
            _logger = logger;
        }

        public override async Task<IEnumerable<Reserva>> GetAllAsync()
        {
            try
            {
                var reservas = await _context.Set<Reserva>()
                    .Include(r => r.cliente)
                    .Include(r => r.Vehiculo)
                    .ToListAsync();

                return reservas;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener las reservas");
                throw;
            }
        }
    }

}
