using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoodAnalyser.Api.Models;

namespace MoodAnalyser.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<MoodEntry> MoodEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the MoodEntry entity
            modelBuilder.Entity<MoodEntry>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.MoodRating)
                    .IsRequired()
                    .HasAnnotation("Range", new[] { 1, 5 });
                
                entity.Property(e => e.EntryDate)
                    .IsRequired();
                
                entity.Property(e => e.UserId)
                    .IsRequired();

                entity.Property(e => e.Notes)
                    .HasMaxLength(1000);

                // Configure the relationship with IdentityUser
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                // Create index on UserId and EntryDate for better query performance
                entity.HasIndex(e => new { e.UserId, e.EntryDate })
                    .IsUnique(); // Ensure one entry per user per date
            });
        }
    }
}
