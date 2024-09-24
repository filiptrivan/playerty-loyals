using Laraue.EfCoreTriggers.Common.Extensions;
using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Infrastructure.Data;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Reflection.Emit;
using System.Security;

namespace Playerty.Loyals.Infrastructure
{
    public class PLApplicationDbContext : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {
        public PLApplicationDbContext(DbContextOptions<PLApplicationDbContext> options)
                : base(options)
        {
        }

        public DbSet<Tier> Tiers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionStatus> TransactionStatuses { get; set; }
        public DbSet<TransactionProduct> TransactionProduct { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Notification>()
            //    .HasMany(n => n.Users)         
            //    .WithMany(u => u.Notifications)
            //    .UsingEntity<Dictionary<string, object>>(
            //        "NotificationUser",          
            //        join => join.HasOne<UserExtended>()   
            //            .WithMany()
            //            .HasForeignKey("UsersId") 
            //            .OnDelete(DeleteBehavior.Cascade),
            //        join => join.HasOne<Notification>() 
            //            .WithMany()
            //            .HasForeignKey("NotificationsId")
            //            .OnDelete(DeleteBehavior.Cascade)
            //    );
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await SetDefaultTierForNewUsers();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private async Task SetDefaultTierForNewUsers()
        {
            IEnumerable<UserExtended> newUsers = ChangeTracker.Entries<UserExtended>()
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity);

            Tier? lowestTier = await Tiers.OrderBy(t => t.ValidTo).FirstOrDefaultAsync();

            foreach (UserExtended user in newUsers)
            {
                if (lowestTier != null)
                {
                    user.Tier = lowestTier;
                }
            }
        }
    }
}
