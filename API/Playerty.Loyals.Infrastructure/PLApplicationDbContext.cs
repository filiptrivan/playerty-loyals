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

        //public DbSet<UserExtended> Users { get; set; }
        //public new DbSet<PermissionExtended> Permissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
