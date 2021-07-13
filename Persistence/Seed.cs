using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Activities.Any()) return;
            var Activities = new List<Activity>{
                new Activity 
                {
                    Title ="Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Drink",
                    City = "Tehran",
                    Venue = "Pub",
                    Description = "Sample past Activity 1"
                },
                new Activity 
                {
                    Title ="Past Activity 2",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Harchi",
                    City = "Qom",
                    Venue = "Pub",
                    Description = "Sample past Activity 2"
                },
                new Activity 
                {
                    Title ="Past Activity 3",
                    Date = DateTime.Now.AddMonths(-1),
                    Category = "Beer",
                    City = "Adelaide",
                    Venue = "Belgian bar",
                    Description = "Sample past Activity 3"
                },
                new Activity 
                {
                    Title ="Past Activity 4",
                    Date = DateTime.Now.AddMonths(-8),
                    Category = "Date",
                    City = "Sydney",
                    Venue = "Darling Harbour",
                    Description = "Sample past Activity 4"
                },
                new Activity 
                {
                    Title ="Past Activity 5",
                    Date = DateTime.Now.AddMonths(-5),
                    Category = "Playing",
                    City = "Adelaide",
                    Venue = "City",
                    Description = "Sample past Activity 5"
                },
                new Activity 
                {
                    Title ="post Activity 6",
                    Date = DateTime.Now.AddMonths(5),
                    Category = "Drink",
                    City = "Brisbane",
                    Venue = "Pub",
                    Description = "Sample post Activity 4"
                },
                new Activity 
                {
                    Title ="post Activity 7",
                    Date = DateTime.Now.AddMonths(2),
                    Category = "Drink",
                    City = "Melbourne",
                    Venue = "Pub",
                    Description = "Sample past Activity 7"
                },
                new Activity 
                {
                    Title ="Post Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Category = "Drink",
                    City = "Tehran",
                    Venue = "Pub",
                    Description = "Sample past Activity 9"
                },
                new Activity 
                {
                    Title ="Post Activity 10",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Drink",
                    City = "farahzad",
                    Venue = "Amin",
                    Description = "Sample past Activity 10"
                }
            };
            await context.Activities.AddRangeAsync(Activities);
            await context.SaveChangesAsync();
        }
    }
}