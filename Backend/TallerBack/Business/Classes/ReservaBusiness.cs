using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Business.Classes.Base;
using Data.Interfases;
using Entity.DTOs;
using Entity.Models;
using Microsoft.Extensions.Logging;

namespace Business.Classes
{
    public class ReservaBusiness : BaseBusiness<Reserva, ReservaDTO>
    {
        public ReservaBusiness(ICrudBase<Reserva> data, ILogger<Reserva> logger, IMapper mapper) : base(data, logger, mapper)
        {
        }
    }
}
