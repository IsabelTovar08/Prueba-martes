﻿using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Business.Interfases;
using Data.Interfases;
using Entity.DTOs.Base;
using Entity.Models.Base;
using Microsoft.Extensions.Logging;
using Utilities.Exeptions;

namespace Business.Classes.Base
{
    public class BaseBusiness<T, D> : ABaseBusiness<T, D> where T : BaseModel where D  : BaseDTO
    {
        protected readonly ICrudBase<T> _data;
        protected readonly ILogger<T> _logger;
        protected readonly IMapper _mapper;
        public BaseBusiness(ICrudBase<T> data, ILogger<T> logger, IMapper mapper) 
        {
            _data = data;
            _mapper = mapper;
            _logger = logger;
        }

        /// <summary>
        /// Crea una nueva entidad.
        /// </summary>
        public override async Task<D> Save(D entity)
        {
            try
            {
                BaseModel newEntity = _mapper.Map<T>(entity);
                newEntity = await _data.SaveAsync((T)newEntity);
                return _mapper.Map<D>(newEntity);
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al crear {typeof(T).Name}");
                throw new ExternalServiceException("Base de datos", $"Error al craer {typeof(T).Name}");
            }
        }

        /// <summary>
        /// Eliminar permanentemente una entidad.
        /// </summary>
        public override async Task<bool> Delete(int id)
        {
            if (id <= 0)
                throw new ValidationException("id", "El id debe ser mayor que cero.");
            try
            {
                var deleted = await _data.DeleteAsync(id);
                if (deleted == null)
                {
                    throw new ExternalServiceException("Base de datos", $"No se pudo eliminar {typeof(T).Name}");
                }
                return deleted;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar {typeof(T).Name} con Id: {id}");
                throw new ExternalServiceException("Base de datos", $"Error al eliminar {typeof(T).Name} con ID: {id}");
            }
        }

        /// <summary>
        /// Obtiene todos los registros.
        /// </summary>
        /// 
        public override async Task<IEnumerable<D>> GetAll()
        {
            try
            {
                IEnumerable<T> list = await _data.GetAllAsync();
                IEnumerable<D> listDto = _mapper.Map<IEnumerable<D>>(list);
                return listDto.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener todos los {typeof(T).Name}");
                throw new ExternalServiceException("Base de datos", $"Error al obtener todos los {typeof(T).Name}", ex);
            }
            
        }

        /// <summary>
        /// Obtiene una entidad por ID.
        /// </summary>
        public override async Task<D?> GetById(int id)
        {
            if (id <= 0)
            {
                throw new ValidationException("Id", "El Id debe ser mayor que cero.");
            }
            try
            {
                T entity = await _data.GetByIdAsync(id);
                D dto = _mapper.Map<D>(entity);
                return dto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener {typeof(T).Name} con Id: {id}");
                throw new ExternalServiceException("Base de Datos", $"Error al obtener {typeof(T).Name}", ex);
            }
        }

        /// <summary>
        /// Gestionar el eliminado lógico en una entidad.
        /// </summary>
        public override async Task<bool> ToggleActiveAsync(int id)
        {
            if (id <= 0)
                throw new ValidationException("id", "El id debe ser mayor que cero.");
            try
            {
                var deleted = await _data.ToggleActiveAsync(id);
                if (deleted == null)
                {
                    throw new ExternalServiceException("Base de datos", $"No se pudo actualizar el estado lógico {typeof(T).Name}");
                }
                return deleted;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar el estado lógico {typeof(T).Name} con Id: {id}");
                throw new ExternalServiceException("Base de datos", $"Error al actualizar el estado lógico {typeof(T).Name} con ID: {id}");
            }
        }

        /// <summary>
        /// Actualiza una nueva entidad.
        /// </summary>
        public override async Task<bool> Update(D entity)
        {
            try
            {
                BaseModel newEntity = _mapper.Map<T>(entity);
                await _data.UpdateAsync((T)newEntity);
                return true;
            }
            catch (ValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al actualizar {typeof(T).Name}");
                throw new ExternalServiceException("Base de datos", $"Error al actualizar {typeof(T).Name}");
            }
        }

    }
}
