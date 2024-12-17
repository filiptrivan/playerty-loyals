using Microsoft.EntityFrameworkCore;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Infrastructure
{
    public class PLApplicationDbContextGenerated : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {

        public PLApplicationDbContextGenerated(DbContextOptions<PLApplicationDbContext> options)
                : base(options)
        {
        }

        public DbSet<Gender> Genders { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUser> NotificationUser { get; set; } // M2M
        public DbSet<Partner> Partners { get; set; }
        public DbSet<PartnerNotification> PartnerNotifications { get; set; }
        public DbSet<PartnerNotificationPartnerUser> PartnerNotificationPartnerUser { get; set; } // M2M
        public DbSet<PartnerRole> PartnerRoles { get; set; }
        public DbSet<PartnerPermission> PartnerPermissions { get; set; }
        public DbSet<PartnerUser> PartnerUsers { get; set; }
        public DbSet<Segmentation> Segmentations { get; set; }
        public DbSet<SegmentationItem> SegmentationItems { get; set; }
        public DbSet<Tier> Tiers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreTier> StoreTiers { get; set; }
        public DbSet<DiscountCategory> DiscountCategories { get; set; }
        public DbSet<StoreTierDiscountCategory> StoreTierDiscountCategory { get; set; } // M2M
        public DbSet<StoreUpdatePointsScheduledTask> StoreUpdatePointsScheduledTasks { get; set; }
    }
}
