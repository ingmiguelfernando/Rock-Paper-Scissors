using System.Collections.Generic;
using System.Threading.Tasks;
using Rock_Paper_Scissors.Models;

namespace Rock_Paper_Scissors.Data
{

    public interface IGameRepository
    {
        void Add<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<GameStatistics>> GetGameStatistics(string userId);
    }

}
