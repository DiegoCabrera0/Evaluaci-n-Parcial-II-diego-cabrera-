namespace EscuelaAPI.Models
{
    public class Profesor
    {
        public int ProfesorId { get; set; }
        public required string Nombre { get; set; }
        public required string Apellido { get; set; }
        public required string Especialidad { get; set; }
        public required string Email { get; set; }
    }
}