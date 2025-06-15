using System.ComponentModel.DataAnnotations;

namespace MoodAnalyser.Api.DTOs
{
    public class MoodEntryDto
    {
        public int Id { get; set; }
        
        [Required]
        [Range(1, 5, ErrorMessage = "Mood rating must be between 1 and 5")]
        public int MoodRating { get; set; }
        
        public string? Notes { get; set; }
        
        [Required]
        public DateTime EntryDate { get; set; }
    }

    public class CreateMoodEntryDto
    {
        [Required]
        [Range(1, 5, ErrorMessage = "Mood rating must be between 1 and 5")]
        public int MoodRating { get; set; }
        
        public string? Notes { get; set; }
        
        [Required]
        public DateTime EntryDate { get; set; }
    }

    public class MoodAnalysisDto
    {
        public double AverageMoodRating { get; set; }
        public int TotalEntries { get; set; }
        public List<MoodTrendDto> Trends { get; set; } = new List<MoodTrendDto>();
        public Dictionary<int, int> MoodDistribution { get; set; } = new Dictionary<int, int>();
    }

    public class MoodTrendDto
    {
        public DateTime Date { get; set; }
        public int MoodRating { get; set; }
        public string? Notes { get; set; }
    }
}
