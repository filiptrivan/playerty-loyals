using Laraue.EfCoreTriggers.Common.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Hosting;
using Playerty.Loyals.Business.Entities;
using Playerty.Loyals.Business.Services;
using Playerty.Loyals.Shared.Terms;
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
    public partial class PLApplicationDbContext : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NotificationUser>()
                .HasKey(ru => new { ru.NotificationsId, ru.UsersId });

            modelBuilder.Entity<UserExtended>()
                .HasMany(e => e.Notifications)
                .WithMany(e => e.Users)
                .UsingEntity<NotificationUser>(
                    j => j.HasOne<Notification>()
                          .WithMany()
                          .HasForeignKey(ru => ru.NotificationsId),
                    j => j.HasOne<UserExtended>()
                          .WithMany()
                          .HasForeignKey(ru => ru.UsersId)
                );

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

            modelBuilder.Entity<StoreTierDiscountCategory>()
                .HasKey(ru => new { ru.StoreTiersId, ru.DiscountCategoriesId });

            modelBuilder.Entity<StoreTier>()
                .HasMany(e => e.StoreTierDiscountCategories)
                .WithOne(e => e.StoreTier)
                .HasForeignKey(e => e.StoreTiersId);

            modelBuilder.Entity<DiscountCategory>()
                .HasMany(e => e.StoreTierDiscountCategories)
                .WithOne(e => e.DiscountCategory)
                .HasForeignKey(e => e.DiscountCategoriesId);

            modelBuilder.Entity<Tier>()
                .HasMany(e => e.PartnerUsers)
                .WithOne(e => e.Tier)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Gender>()
                .HasMany(e => e.Users)
                .WithOne(e => e.Gender)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // FT: Need to call these methods here, because of abstraction with security package
            //await AddPartnerUserForEachNewPartner();
            //await SaveUserCurrentPartnerAndSetDefaultTierForEachUser();
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
                        PartnerUser partnerUser = new PartnerUser
                        {
                            User = user,
                            Partner = partner,
                            Points = 0,
                            Tier = null // FT: There is no tier if partner is newly made
                        };

                        await Set<PartnerUser>().AddAsync(partnerUser);
                    }
                }
            }
        }

        private async Task SaveUserCurrentPartnerAndSetDefaultTierForEachUser()
        {
            List<UserExtended> newUsers = ChangeTracker.Entries<UserExtended>() // https://stackoverflow.com/questions/4867602/entity-framework-there-is-already-an-open-datareader-associated-with-this-comma
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity)
                .ToList();

            if (newUsers.Count != 0)
            {
                Partner currentPartner = null; // await _partnerUserAuthenticationService.GetCurrentPartner();

                foreach (UserExtended user in newUsers)
                {
                    PartnerUser partnerUser = new PartnerUser
                    {
                        User = user,
                        Partner = currentPartner,
                        Points = 0,
                        Tier = currentPartner.Tiers.OrderBy(t => t.ValidTo).FirstOrDefault() // FT: If exists, saving the lowest tier, else null.
                    };

                    await Set<PartnerUser>().AddAsync(partnerUser);
                }
            }
        }


    }
}
