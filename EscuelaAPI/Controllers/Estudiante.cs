namespace EscuelaAPI.Models
{
    public class Estudiante
    {
        public int EstudianteId { get; set; }
        public required string Nombre { get; set; } 
        public required string Apellido { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public required string Grado { get; set; }
    }
}