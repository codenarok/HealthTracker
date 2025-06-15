using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MoodAnalyser.Api.Models
{
    public class MoodEntry
    {
        public int Id { get; set; }
        
        [Required]
        [Range(1, 5, ErrorMessage = "Mood rating must be between 1 and 5")]
        public int MoodRating { get; set; }
        
        public string? Notes { get; set; }
        
        [Required]
        public DateTime EntryDate { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        
        // Navigation property
        public IdentityUser User { get; set; } = null!;
    }
}
