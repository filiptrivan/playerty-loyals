using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Infrastructure;
using System.Data;

namespace Playerty.Loyals.Infrastructure
{
    public partial class PlayertyApplicationDbContext : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {
        public PlayertyApplicationDbContext(DbContextOptions<PlayertyApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
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
