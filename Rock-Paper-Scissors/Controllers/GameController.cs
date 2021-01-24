using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Rock_Paper_Scissors.Data;
using Rock_Paper_Scissors.Dtos;
using Rock_Paper_Scissors.Models;

namespace Rock_Paper_Scissors.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {        
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;


        public GameController(IGameRepository gameRepository, IMapper mapper)
        {           
            _gameRepository = gameRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Post(int SelectedOptionUser)
        {
            if(SelectedOptionUser < 1 || SelectedOptionUser > 3)
            {
                return BadRequest("Option not supported.");
            }

            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var gameResults = new GameStatistics(currentUserId, (GameOption)SelectedOptionUser);

            _gameRepository.Add(gameResults);
            await _gameRepository.SaveAll();
            return Ok(_mapper.Map<GameResultDto>(gameResults));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var gameStatistics = await _gameRepository.GetGameStatistics(currentUserId);
            return Ok(_mapper.Map <IEnumerable<GameStatisticsDto>>(gameStatistics));
        }
    }
}
