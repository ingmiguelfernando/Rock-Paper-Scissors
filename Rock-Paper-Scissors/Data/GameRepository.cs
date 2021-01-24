using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Rock_Paper_Scissors.Models;
using Microsoft.EntityFrameworkCore;

namespace Rock_Paper_Scissors.Data
{
    public class GameRepository : IGameRepository
    {
        private readonly ApplicationDbContext _context;

        public GameRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<GameStatistics>> GetGameStatistics(string userId)
        {
            return await _context.GameStatistics.Where(u => u.UserId.Equals(userId)).ToListAsync();            
        }
    }
}
