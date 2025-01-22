using Microsoft.EntityFrameworkCore;
using PlayertyLoyals.Business.Entities;
using Spider.Infrastructure;

namespace PlayertyLoyals.Infrastructure
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

    }
}
