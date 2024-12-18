using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playerty.Loyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gender",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gender", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Partner",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LogoImage = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    PrimaryColor = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: true),
                    ProductsRecommendationEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PointsMultiplier = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PartnerPermission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPermission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    HasLoggedInWithExternalProvider = table.Column<bool>(type: "bit", nullable: false),
                    NumberOfFailedAttemptsInARow = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GenderId = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Gender_GenderId",
                        column: x => x.GenderId,
                        principalTable: "Gender",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusinessSystem",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UpdatePointsInterval = table.Column<int>(type: "int", nullable: true),
                    UpdatePointsStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GetTransactionsEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GetDiscountCategoriesEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreateUserEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdateUserGroupEndpoint = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdatePointsScheduledTaskIsPaused = table.Column<bool>(type: "bit", nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessSystem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessSystem_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    EmailBody = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    PartnerId1 = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notification_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notification_Partner_PartnerId1",
                        column: x => x.PartnerId1,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PartnerRole",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    PartnerId1 = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerRole_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerRole_Partner_PartnerId1",
                        column: x => x.PartnerId1,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Segmentation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    PointsForTheFirstTimeFill = table.Column<int>(type: "int", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Segmentation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Segmentation_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tier",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    ValidFrom = table.Column<int>(type: "int", nullable: false),
                    ValidTo = table.Column<int>(type: "int", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    PartnerId1 = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tier_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tier_Partner_PartnerId1",
                        column: x => x.PartnerId1,
                        principalTable: "Partner",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PermissionRole",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "int", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionRole", x => new { x.PermissionsId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_PermissionRole_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionRole_Roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleUser",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUser", x => new { x.RoleId, x.UserId });
                    table.ForeignKey(
                        name: "FK_RoleUser_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusinessSystemUpdatePointsScheduledTask",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionsFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionsTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsManual = table.Column<bool>(type: "bit", nullable: false),
                    BusinessSystemId = table.Column<long>(type: "bigint", nullable: false),
                    BusinessSystemId1 = table.Column<long>(type: "bigint", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessSystemUpdatePointsScheduledTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessSystemUpdatePointsScheduledTask_BusinessSystem_BusinessSystemId",
                        column: x => x.BusinessSystemId,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusinessSystemUpdatePointsScheduledTask_BusinessSystem_BusinessSystemId1",
                        column: x => x.BusinessSystemId1,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DiscountProductGroup",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BusinessSystemId = table.Column<long>(type: "bigint", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountProductGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscountProductGroup_BusinessSystem_BusinessSystemId",
                        column: x => x.BusinessSystemId,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NotificationUserExtended",
                columns: table => new
                {
                    NotificationsId = table.Column<long>(type: "bigint", nullable: false),
                    UsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationUserExtended", x => new { x.NotificationsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_NotificationUserExtended_Notification_NotificationsId",
                        column: x => x.NotificationsId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificationUserExtended_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerPermissionPartnerRole",
                columns: table => new
                {
                    PartnerPermissionsId = table.Column<int>(type: "int", nullable: false),
                    PartnerRolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPermissionPartnerRole", x => new { x.PartnerPermissionsId, x.PartnerRolesId });
                    table.ForeignKey(
                        name: "FK_PartnerPermissionPartnerRole_PartnerPermission_PartnerPermissionsId",
                        column: x => x.PartnerPermissionsId,
                        principalTable: "PartnerPermission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerPermissionPartnerRole_PartnerRole_PartnerRolesId",
                        column: x => x.PartnerRolesId,
                        principalTable: "PartnerRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SegmentationItem",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    SegmentationId = table.Column<int>(type: "int", nullable: false),
                    SegmentationId1 = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SegmentationItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SegmentationItem_Segmentation_SegmentationId",
                        column: x => x.SegmentationId,
                        principalTable: "Segmentation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SegmentationItem_Segmentation_SegmentationId1",
                        column: x => x.SegmentationId1,
                        principalTable: "Segmentation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusinessSystemTier",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    BusinessSystemId = table.Column<long>(type: "bigint", nullable: false),
                    TierId = table.Column<int>(type: "int", nullable: false),
                    BusinessSystemId1 = table.Column<long>(type: "bigint", nullable: true),
                    TierId1 = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessSystemTier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessSystemTier_BusinessSystem_BusinessSystemId",
                        column: x => x.BusinessSystemId,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusinessSystemTier_BusinessSystem_BusinessSystemId1",
                        column: x => x.BusinessSystemId1,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusinessSystemTier_Tier_TierId",
                        column: x => x.TierId,
                        principalTable: "Tier",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusinessSystemTier_Tier_TierId1",
                        column: x => x.TierId1,
                        principalTable: "Tier",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PartnerUser",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Points = table.Column<int>(type: "int", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    TierId = table.Column<int>(type: "int", nullable: true),
                    PartnerId1 = table.Column<int>(type: "int", nullable: true),
                    UserExtendedId = table.Column<long>(type: "bigint", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerUser_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerUser_Partner_PartnerId1",
                        column: x => x.PartnerId1,
                        principalTable: "Partner",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerUser_Tier_TierId",
                        column: x => x.TierId,
                        principalTable: "Tier",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerUser_Users_UserExtendedId",
                        column: x => x.UserExtendedId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusinessSystemTierDiscountProductGroup",
                columns: table => new
                {
                    BusinessSystemTierId = table.Column<long>(type: "bigint", nullable: false),
                    DiscountProductGroupId = table.Column<long>(type: "bigint", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    BusinessSystemTierId1 = table.Column<long>(type: "bigint", nullable: true),
                    DiscountProductGroupId1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessSystemTierDiscountProductGroup", x => new { x.BusinessSystemTierId, x.DiscountProductGroupId });
                    table.ForeignKey(
                        name: "FK_BusinessSystemTierDiscountProductGroup_BusinessSystemTier_BusinessSystemTierId",
                        column: x => x.BusinessSystemTierId,
                        principalTable: "BusinessSystemTier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusinessSystemTierDiscountProductGroup_BusinessSystemTier_BusinessSystemTierId1",
                        column: x => x.BusinessSystemTierId1,
                        principalTable: "BusinessSystemTier",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusinessSystemTierDiscountProductGroup_DiscountProductGroup_DiscountProductGroupId",
                        column: x => x.DiscountProductGroupId,
                        principalTable: "DiscountProductGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusinessSystemTierDiscountProductGroup_DiscountProductGroup_DiscountProductGroupId1",
                        column: x => x.DiscountProductGroupId1,
                        principalTable: "DiscountProductGroup",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PartnerNotificationPartnerUser",
                columns: table => new
                {
                    PartnerNotificationsId = table.Column<long>(type: "bigint", nullable: false),
                    PartnerUsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerNotificationPartnerUser", x => new { x.PartnerNotificationsId, x.PartnerUsersId });
                    table.ForeignKey(
                        name: "FK_PartnerNotificationPartnerUser_Notification_PartnerNotificationsId",
                        column: x => x.PartnerNotificationsId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerNotificationPartnerUser_PartnerUser_PartnerUsersId",
                        column: x => x.PartnerUsersId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerRolePartnerUser",
                columns: table => new
                {
                    PartnerRolesId = table.Column<int>(type: "int", nullable: false),
                    PartnerUsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerRolePartnerUser", x => new { x.PartnerRolesId, x.PartnerUsersId });
                    table.ForeignKey(
                        name: "FK_PartnerRolePartnerUser_PartnerRole_PartnerRolesId",
                        column: x => x.PartnerRolesId,
                        principalTable: "PartnerRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerRolePartnerUser_PartnerUser_PartnerUsersId",
                        column: x => x.PartnerUsersId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentation",
                columns: table => new
                {
                    AlreadyFilledSegmentationsId = table.Column<int>(type: "int", nullable: false),
                    PartnerUsersThatHasFilledSegmentationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserSegmentation", x => new { x.AlreadyFilledSegmentationsId, x.PartnerUsersThatHasFilledSegmentationId });
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_PartnerUser_PartnerUsersThatHasFilledSegmentationId",
                        column: x => x.PartnerUsersThatHasFilledSegmentationId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_Segmentation_AlreadyFilledSegmentationsId",
                        column: x => x.AlreadyFilledSegmentationsId,
                        principalTable: "Segmentation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentationItem",
                columns: table => new
                {
                    CheckedSegmentationItemsId = table.Column<long>(type: "bigint", nullable: false),
                    PartnerUsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserSegmentationItem", x => new { x.CheckedSegmentationItemsId, x.PartnerUsersId });
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_PartnerUser_PartnerUsersId",
                        column: x => x.PartnerUsersId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_SegmentationItem_CheckedSegmentationItemsId",
                        column: x => x.CheckedSegmentationItemsId,
                        principalTable: "SegmentationItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystem_PartnerId",
                table: "BusinessSystem",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTier_BusinessSystemId",
                table: "BusinessSystemTier",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTier_BusinessSystemId1",
                table: "BusinessSystemTier",
                column: "BusinessSystemId1");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTier_TierId",
                table: "BusinessSystemTier",
                column: "TierId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTier_TierId1",
                table: "BusinessSystemTier",
                column: "TierId1");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTierDiscountProductGroup_BusinessSystemTierId1",
                table: "BusinessSystemTierDiscountProductGroup",
                column: "BusinessSystemTierId1");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTierDiscountProductGroup_DiscountProductGroupId",
                table: "BusinessSystemTierDiscountProductGroup",
                column: "DiscountProductGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTierDiscountProductGroup_DiscountProductGroupId1",
                table: "BusinessSystemTierDiscountProductGroup",
                column: "DiscountProductGroupId1");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemUpdatePointsScheduledTask_BusinessSystemId",
                table: "BusinessSystemUpdatePointsScheduledTask",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemUpdatePointsScheduledTask_BusinessSystemId1",
                table: "BusinessSystemUpdatePointsScheduledTask",
                column: "BusinessSystemId1");

            migrationBuilder.CreateIndex(
                name: "IX_DiscountProductGroup_BusinessSystemId",
                table: "DiscountProductGroup",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_PartnerId",
                table: "Notification",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_PartnerId1",
                table: "Notification",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationUserExtended_UsersId",
                table: "NotificationUserExtended",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Partner_Slug",
                table: "Partner",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerNotificationPartnerUser_PartnerUsersId",
                table: "PartnerNotificationPartnerUser",
                column: "PartnerUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPermission_Code",
                table: "PartnerPermission",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPermissionPartnerRole_PartnerRolesId",
                table: "PartnerPermissionPartnerRole",
                column: "PartnerRolesId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRole_PartnerId",
                table: "PartnerRole",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRole_PartnerId1",
                table: "PartnerRole",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRolePartnerUser_PartnerUsersId",
                table: "PartnerRolePartnerUser",
                column: "PartnerUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_PartnerId",
                table: "PartnerUser",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_PartnerId1",
                table: "PartnerUser",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_TierId",
                table: "PartnerUser",
                column: "TierId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_UserExtendedId",
                table: "PartnerUser",
                column: "UserExtendedId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_UserId",
                table: "PartnerUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentation_PartnerUsersThatHasFilledSegmentationId",
                table: "PartnerUserSegmentation",
                column: "PartnerUsersThatHasFilledSegmentationId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentationItem_PartnerUsersId",
                table: "PartnerUserSegmentationItem",
                column: "PartnerUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionRole_RolesId",
                table: "PermissionRole",
                column: "RolesId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_Code",
                table: "Permissions",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoleUser_UserId",
                table: "RoleUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Segmentation_PartnerId",
                table: "Segmentation",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentationItem_SegmentationId",
                table: "SegmentationItem",
                column: "SegmentationId");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentationItem_SegmentationId1",
                table: "SegmentationItem",
                column: "SegmentationId1");

            migrationBuilder.CreateIndex(
                name: "IX_Tier_PartnerId",
                table: "Tier",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Tier_PartnerId1",
                table: "Tier",
                column: "PartnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_GenderId",
                table: "Users",
                column: "GenderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessSystemTierDiscountProductGroup");

            migrationBuilder.DropTable(
                name: "BusinessSystemUpdatePointsScheduledTask");

            migrationBuilder.DropTable(
                name: "NotificationUserExtended");

            migrationBuilder.DropTable(
                name: "PartnerNotificationPartnerUser");

            migrationBuilder.DropTable(
                name: "PartnerPermissionPartnerRole");

            migrationBuilder.DropTable(
                name: "PartnerRolePartnerUser");

            migrationBuilder.DropTable(
                name: "PartnerUserSegmentation");

            migrationBuilder.DropTable(
                name: "PartnerUserSegmentationItem");

            migrationBuilder.DropTable(
                name: "PermissionRole");

            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "BusinessSystemTier");

            migrationBuilder.DropTable(
                name: "DiscountProductGroup");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "PartnerPermission");

            migrationBuilder.DropTable(
                name: "PartnerRole");

            migrationBuilder.DropTable(
                name: "PartnerUser");

            migrationBuilder.DropTable(
                name: "SegmentationItem");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "BusinessSystem");

            migrationBuilder.DropTable(
                name: "Tier");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Segmentation");

            migrationBuilder.DropTable(
                name: "Gender");

            migrationBuilder.DropTable(
                name: "Partner");
        }
    }
}
