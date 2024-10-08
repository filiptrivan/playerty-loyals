using Laraue.EfCoreTriggers.Common.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Infrastructure.Data;
using Soft.Generator.Security.Entities;
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
        public DbSet<Partner> Partners { get; set; }
        public DbSet<PartnerUser> PartnerUser { get; set; }
        public DbSet<PartnerNotificationPartnerUser> PartnerNotificationPartnerUser { get; set; }
        public DbSet<PartnerNotification> PartnerNotifications { get; set; }
        public DbSet<PartnerRole> PartnerRoles { get; set; }
        public DbSet<Gender> Genders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Partner>()
                .HasIndex(u => u.Slug)
                .IsUnique();

            modelBuilder.Entity<PartnerNotificationPartnerUser>()
                .HasKey(ru => new { ru.PartnerNotificationsId, ru.PartnerUsersId });

            modelBuilder.Entity<PartnerUser>()
                .HasMany(e => e.PartnerNotifications)
                .WithMany(e => e.PartnerUsers)
                .UsingEntity<PartnerNotificationPartnerUser>(
                    j => j.HasOne<PartnerNotification>()
                          .WithMany()
                          .HasForeignKey(ru => ru.PartnerNotificationsId),
                    j => j.HasOne<PartnerUser>()
                          .WithMany()
                          .HasForeignKey(ru => ru.PartnerUsersId)
                );

        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // FT: Need to call these methods here, because of abstraction with security package
            await AddPartnerUserForEachNewPartner();
            await SaveUserForEachPartnerAndSetDefaultTierForEachUser();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private async Task AddPartnerUserForEachNewPartner()
        {
            List<Partner> newPartners = ChangeTracker.Entries<Partner>() // https://stackoverflow.com/questions/4867602/entity-framework-there-is-already-an-open-datareader-associated-with-this-comma
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity)
                .ToList();

            if (newPartners.Count != 0)
            {
                List<UserExtended> users = await Users.ToListAsync();

                foreach (Partner partner in newPartners)
                {
                    foreach (UserExtended user in users)
                    {
                        await Set<PartnerUser>().AddAsync(new PartnerUser
                        {
                            User = user,
                            Partner = partner,
                            Points = 0,
                            Tier = null // FT: There is no tier if partner is newly made
                        });
                    }
                }
            }
        }

        private async Task SaveUserForEachPartnerAndSetDefaultTierForEachUser()
        {
            List<UserExtended> newUsers = ChangeTracker.Entries<UserExtended>() // https://stackoverflow.com/questions/4867602/entity-framework-there-is-already-an-open-datareader-associated-with-this-comma
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity)
                .ToList();

            if (newUsers.Count != 0)
            {
                List<Partner> partners = await Partners.ToListAsync();

                foreach (UserExtended user in newUsers)
                {
                    foreach (Partner partner in partners)
                    {
                        await Set<PartnerUser>().AddAsync(new PartnerUser
                        {
                            User = user,
                            Partner = partner,
                            Points = 0,
                            Tier = partner.Tiers.OrderBy(t => t.ValidTo).FirstOrDefault() // FT: If exists, saving the lowest tier, else null.
                        });
                    }
                }
            }
        }


    }
}
