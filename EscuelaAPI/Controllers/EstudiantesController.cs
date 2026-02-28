using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EscuelaAPI.Data;
using EscuelaAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class EstudiantesController : ControllerBase
{
    private readonly EscuelaContext _context;
    public EstudiantesController(EscuelaContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Estudiante>>> Get() => await _context.Estudiantes.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Estudiante>> Get(int id)
    {
        var estudiante = await _context.Estudiantes.FindAsync(id);
        if (estudiante == null) return NotFound();
        return estudiante;
    }

    [HttpPost]
    public async Task<ActionResult<Estudiante>> Post(Estudiante estudiante)
    {
        _context.Estudiantes.Add(estudiante);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = estudiante.EstudianteId }, estudiante);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Estudiante estudiante)
    {
        if (id != estudiante.EstudianteId) return BadRequest();
        _context.Entry(estudiante).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var estudiante = await _context.Estudiantes.FindAsync(id);
        if (estudiante == null) return NotFound();
        _context.Estudiantes.Remove(estudiante);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}