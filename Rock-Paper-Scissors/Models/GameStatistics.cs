using System;
namespace Rock_Paper_Scissors.Models
{
    public class GameStatistics
    {
        public GameStatistics(string userId, GameOption selectedOptionUser)
        {
            UserId = userId;
            SelectedOptionUser = selectedOptionUser;
            SelectedOptionMachine = (GameOption)new Random().Next(1, 3);
            Win = GetGameResult();
            Tie = SelectedOptionMachine == SelectedOptionUser;
            Created = DateTime.Now;
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public bool Win { get; set; }
        public bool Tie { get; set; }
        public DateTime Created { get; set; }
        public GameOption SelectedOptionUser { get; set; }
        public GameOption SelectedOptionMachine { get; set; }


        private bool GetGameResult()
        {
            return SelectedOptionUser switch
            {
                GameOption.PAPER => SelectedOptionMachine == GameOption.ROCK,
                GameOption.ROCK => SelectedOptionMachine == GameOption.SCISSORS,
                GameOption.SCISSORS => SelectedOptionMachine == GameOption.PAPER,
                _ => false,
            };
        }
    }    

    public enum GameOption
    {
        ROCK = 1,
        SCISSORS =2,
        PAPER =3
    }
}
