using Laraue.EfCoreTriggers.Common.Extensions;
using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Partner>()
                .HasIndex(u => u.Slug)
                .IsUnique();

            //modelBuilder.Entity<RolePartnerUser>()
            //    .HasKey(ru => new { ru.RolesId, ru.PartnerUsersId });

            //modelBuilder.Entity<PartnerUser>()
            //    .HasMany(e => e.PartnerRoles)
            //    .WithMany()
            //    .UsingEntity<RolePartnerUser>(
            //        j => j.HasOne<PartnerRole>()
            //              .WithMany()
            //              .HasForeignKey(ru => ru.RolesId),
            //        j => j.HasOne<PartnerUser>()
            //              .WithMany()
            //              .HasForeignKey(ru => ru.PartnerUsersId)
            //    );

            modelBuilder.Entity<PartnerNotificationPartnerUser>()
                .HasKey(ru => new { ru.PartnerNotificationsId, ru.PartnerUsersId });

            modelBuilder.Entity<PartnerUser>()
                .HasMany(e => e.PartnerNotifications)
                .WithMany()
                .UsingEntity<PartnerNotificationPartnerUser>(
                    j => j.HasOne<PartnerNotification>()
                          .WithMany()
                          .HasForeignKey(ru => ru.PartnerNotificationsId),
                    j => j.HasOne<PartnerUser>()
                          .WithMany()
                          .HasForeignKey(ru => ru.PartnerUsersId)
                );

            //modelBuilder.Entity<PartnerUser>()
            //    .HasKey(ru => new { ru.PartnersId, ru.UsersId });
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await AddPartnerUserForEachNewPartner();
            await SaveUserForEachPartnerAndSetDefaultTierForEachUser();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private async Task AddPartnerUserForEachNewPartner()
        {
            IEnumerable<Partner> newPartners = ChangeTracker.Entries<Partner>()
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity);

            if (newPartners.Any())
            {
                foreach (Partner partner in newPartners)
                {
                    foreach (UserExtended user in Users)
                    {
                        await PartnerUser.AddAsync(new PartnerUser
                        {
                            // FT: I don't wan't to store data that i already got in UserExtended, because when i modify some of those fields i should modify all partner users
                            Email = user.Email,
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
            IEnumerable<UserExtended> newUsers = ChangeTracker.Entries<UserExtended>()
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity);

            if (newUsers.Any())
            {
                foreach (UserExtended user in newUsers)
                {
                    foreach (Partner partner in Partners)
                    {
                        await PartnerUser.AddAsync(new PartnerUser
                        {
                            // FT: I don't wan't to store data that i already got in UserExtended, because when i modify some of those fields i should modify all partner users
                            Email = user.Email,
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
