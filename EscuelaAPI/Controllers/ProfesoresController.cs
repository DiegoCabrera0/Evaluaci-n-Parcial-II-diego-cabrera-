using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EscuelaAPI.Data;
using EscuelaAPI.Models;

namespace EscuelaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoresController : ControllerBase
    {
        private readonly EscuelaContext _context;

        public ProfesoresController(EscuelaContext context)
        {
            _context = context;
        }

        // GET: api/Profesores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> Get()
        {
            return await _context.Profesores.ToListAsync();
        }

        // GET: api/Profesores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profesor>> Get(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);

            if (profesor == null)
            {
                return NotFound();
            }

            return profesor;
        }

        // POST: api/Profesores
        [HttpPost]
        public async Task<ActionResult<Profesor>> Post(Profesor profesor)
        {
            _context.Profesores.Add(profesor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = profesor.ProfesorId }, profesor);
        }

        // PUT: api/Profesores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Profesor profesor)
        {
            if (id != profesor.ProfesorId)
            {
                return BadRequest();
            }

            _context.Entry(profesor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Profesores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var profesor = await _context.Profesores.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            _context.Profesores.Remove(profesor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfesorExists(int id)
        {
            return _context.Profesores.Any(e => e.ProfesorId == id);
        }
    }
}