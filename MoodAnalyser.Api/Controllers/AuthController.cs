using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoodAnalyser.Api.DTOs;
using MoodAnalyser.Api.Services;

namespace MoodAnalyser.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var token = _jwtService.GenerateToken(user);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email!
                };

                return Ok(new AuthResponseDto
                {
                    Token = token,
                    User = userDto
                });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Invalid email or password.");

            var token = _jwtService.GenerateToken(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email!
            };

            return Ok(new AuthResponseDto
            {
                Token = token,
                User = userDto
            });
        }
    }
}
