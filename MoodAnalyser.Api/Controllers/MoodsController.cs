using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoodAnalyser.Api.Data;
using MoodAnalyser.Api.DTOs;
using MoodAnalyser.Api.Models;
using System.Security.Claims;

namespace MoodAnalyser.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MoodsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoodsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMoodEntries()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var moodEntries = await _context.MoodEntries
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.EntryDate)
                .Select(m => new MoodEntryDto
                {
                    Id = m.Id,
                    MoodRating = m.MoodRating,
                    Notes = m.Notes,
                    EntryDate = m.EntryDate
                })
                .ToListAsync();

            return Ok(moodEntries);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMoodEntry([FromBody] CreateMoodEntryDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            // Check if entry already exists for this date
            var existingEntry = await _context.MoodEntries
                .FirstOrDefaultAsync(m => m.UserId == userId && m.EntryDate.Date == model.EntryDate.Date);

            if (existingEntry != null)
                return BadRequest("A mood entry already exists for this date.");

            var moodEntry = new MoodEntry
            {
                MoodRating = model.MoodRating,
                Notes = model.Notes,
                EntryDate = model.EntryDate,
                UserId = userId
            };

            _context.MoodEntries.Add(moodEntry);
            await _context.SaveChangesAsync();

            var moodEntryDto = new MoodEntryDto
            {
                Id = moodEntry.Id,
                MoodRating = moodEntry.MoodRating,
                Notes = moodEntry.Notes,
                EntryDate = moodEntry.EntryDate
            };

            return CreatedAtAction(nameof(GetMoodEntries), new { id = moodEntry.Id }, moodEntryDto);
        }

        [HttpGet("analysis")]
        public async Task<IActionResult> GetMoodAnalysis()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var moodEntries = await _context.MoodEntries
                .Where(m => m.UserId == userId)
                .OrderBy(m => m.EntryDate)
                .ToListAsync();

            if (!moodEntries.Any())
                return Ok(new MoodAnalysisDto());

            var analysis = new MoodAnalysisDto
            {
                TotalEntries = moodEntries.Count,
                AverageMoodRating = moodEntries.Average(m => m.MoodRating),
                Trends = moodEntries.Select(m => new MoodTrendDto
                {
                    Date = m.EntryDate,
                    MoodRating = m.MoodRating,
                    Notes = m.Notes
                }).ToList(),
                MoodDistribution = moodEntries
                    .GroupBy(m => m.MoodRating)
                    .ToDictionary(g => g.Key, g => g.Count())
            };

            return Ok(analysis);
        }
    }
}
