using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Extensions;
using Soft.Generator.Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Playerty.Loyals.Business.Services
{
    public class NotificationService
    {
        private readonly IApplicationDbContext _context;

        public NotificationService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendNotification(UserExtended user, string notificationTitle, string notificationDescription)
        {
            await _context.WithTransactionAsync(async () =>
            {
                Notification notification = new Notification
                {
                    Title = notificationTitle,
                    Description = notificationDescription,
                };

                user.Notifications.Add(notification);

                await _context.SaveChangesAsync();
            });
        }

        public async Task SendPartnerNotification(PartnerUser partnerUser, string notificationTitle, string notificationDescription)
        {
            await _context.WithTransactionAsync(async () =>
            {
                PartnerNotification partnerNotification = new PartnerNotification
                {
                    Title = notificationTitle,
                    Description = notificationDescription,
                    Partner = partnerUser.Partner,
                };

                partnerUser.PartnerNotifications.Add(partnerNotification);

                await _context.SaveChangesAsync();
            });
        }
    }
}
