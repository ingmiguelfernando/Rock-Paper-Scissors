using Rock_Paper_Scissors.Models;

namespace Rock_Paper_Scissors.Dtos
{
    public class GameResultDto
    {
        public bool Win { get; set; }
        public bool Tie { get; set; }        
        public GameOption SelectedOptionMachine { get; set; }
    }
}
