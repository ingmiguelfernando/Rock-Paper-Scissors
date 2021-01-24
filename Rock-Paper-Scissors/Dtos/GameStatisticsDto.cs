using System;
using Rock_Paper_Scissors.Models;

namespace Rock_Paper_Scissors.Dtos
{
    public class GameStatisticsDto
    {
        public int Id { get; set; }        
        public bool Win { get; set; }
        public bool Tie { get; set; }
        public DateTime Created { get; set; }
        public GameOption SelectedOptionUser { get; set; }
        public GameOption SelectedOptionMachine { get; set; }
    }
}
