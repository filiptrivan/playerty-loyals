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
        public DbSet<RolePartnerUser> RolePartnerUser { get; set; }
        public DbSet<NotificationPartnerUser> NotificationPartnerUser { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Partner>()
                .HasIndex(u => u.Slug)
                .IsUnique();

            modelBuilder.Entity<RolePartnerUser>()
                .HasKey(ru => new { ru.RolesId, ru.PartnerUsersId });

            modelBuilder.Entity<PartnerUser>()
                .HasMany(e => e.Roles)
                .WithMany()
                .UsingEntity<RolePartnerUser>(
                    j => j.HasOne<Role>()
                          .WithMany()
                          .HasForeignKey(ru => ru.RolesId),
                    j => j.HasOne<PartnerUser>()
                          .WithMany()
                          .HasForeignKey(ru => ru.PartnerUsersId)
                );

            modelBuilder.Entity<NotificationPartnerUser>()
                .HasKey(ru => new { ru.NotificationsId, ru.PartnerUsersId });

            modelBuilder.Entity<PartnerUser>()
                .HasMany(e => e.Notifications)
                .WithMany()
                .UsingEntity<NotificationPartnerUser>(
                    j => j.HasOne<Notification>()
                          .WithMany()
                          .HasForeignKey(ru => ru.NotificationsId),
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
