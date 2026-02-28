using Microsoft.EntityFrameworkCore;
using EscuelaAPI.Models;
using System.Collections.Generic;

namespace EscuelaAPI.Data
{
    public class EscuelaContext : DbContext
    {
        public EscuelaContext(DbContextOptions<EscuelaContext> options) : base(options) { }

        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<Profesor> Profesores { get; set; }
    }
}