using System;
using Rock_Paper_Scissors.Models;
using Xunit;

namespace UnitTests
{
    public class GameStatisticsTest
    {
        [Fact]
        public void Get_Game_Results()
        {
            var game = new GameStatistics("usr-1", GameOption.PAPER);
            var machineOption = game.SelectedOptionMachine;

            if(machineOption == GameOption.PAPER)
            {
                Assert.True(game.Tie);
            }

            if (machineOption == GameOption.ROCK)
            {
                Assert.True(game.Win);
            }

            if (machineOption == GameOption.SCISSORS)
            {
                Assert.False(game.Win);
            }

        }
    }
}
