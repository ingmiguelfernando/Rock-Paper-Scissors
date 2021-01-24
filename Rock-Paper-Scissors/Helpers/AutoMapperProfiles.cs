using AutoMapper;
using Rock_Paper_Scissors.Dtos;
using Rock_Paper_Scissors.Models;

namespace Rock_Paper_Scissors.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<GameStatistics, GameResultDto>();
            CreateMap<GameStatistics, GameStatisticsDto>();
        }
    }
}
