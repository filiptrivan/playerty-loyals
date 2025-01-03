using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayertyLoyals.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
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
                name: "Permission",
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
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
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
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScheduledTaskType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduledTaskType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
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
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Gender_GenderId",
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
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.RoleId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
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
                name: "UserNotification",
                columns: table => new
                {
                    NotificationId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    IsMarkedAsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotification", x => new { x.NotificationId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserNotification_Notification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserNotification_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerRolePartnerPermission",
                columns: table => new
                {
                    PartnerRoleId = table.Column<int>(type: "int", nullable: false),
                    PartnerPermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerRolePartnerPermission", x => new { x.PartnerRoleId, x.PartnerPermissionId });
                    table.ForeignKey(
                        name: "FK_PartnerRolePartnerPermission_PartnerPermission_PartnerPermissionId",
                        column: x => x.PartnerPermissionId,
                        principalTable: "PartnerPermission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerRolePartnerPermission_PartnerRole_PartnerRoleId",
                        column: x => x.PartnerRoleId,
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
                        name: "FK_BusinessSystemTier_Tier_TierId",
                        column: x => x.TierId,
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
                        name: "FK_PartnerUser_Tier_TierId",
                        column: x => x.TierId,
                        principalTable: "Tier",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PartnerUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusinessSystemTierDiscountProductGroup",
                columns: table => new
                {
                    BusinessSystemTierId = table.Column<long>(type: "bigint", nullable: false),
                    DiscountProductGroupId = table.Column<long>(type: "bigint", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_BusinessSystemTierDiscountProductGroup_DiscountProductGroup_DiscountProductGroupId",
                        column: x => x.DiscountProductGroupId,
                        principalTable: "DiscountProductGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserPartnerNotification",
                columns: table => new
                {
                    PartnerNotificationId = table.Column<long>(type: "bigint", nullable: false),
                    PartnerUserId = table.Column<long>(type: "bigint", nullable: false),
                    IsMarkedAsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserPartnerNotification", x => new { x.PartnerNotificationId, x.PartnerUserId });
                    table.ForeignKey(
                        name: "FK_PartnerUserPartnerNotification_Notification_PartnerNotificationId",
                        column: x => x.PartnerNotificationId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserPartnerNotification_PartnerUser_PartnerUserId",
                        column: x => x.PartnerUserId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserPartnerRole",
                columns: table => new
                {
                    PartnerRoleId = table.Column<int>(type: "int", nullable: false),
                    PartnerUserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserPartnerRole", x => new { x.PartnerRoleId, x.PartnerUserId });
                    table.ForeignKey(
                        name: "FK_PartnerUserPartnerRole_PartnerRole_PartnerRoleId",
                        column: x => x.PartnerRoleId,
                        principalTable: "PartnerRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserPartnerRole_PartnerUser_PartnerUserId",
                        column: x => x.PartnerUserId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentation",
                columns: table => new
                {
                    PartnerUserThatHasFilledSegmentationId = table.Column<long>(type: "bigint", nullable: false),
                    AlreadyFilledSegmentationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserSegmentation", x => new { x.PartnerUserThatHasFilledSegmentationId, x.AlreadyFilledSegmentationId });
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_PartnerUser_PartnerUserThatHasFilledSegmentationId",
                        column: x => x.PartnerUserThatHasFilledSegmentationId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentation_Segmentation_AlreadyFilledSegmentationId",
                        column: x => x.AlreadyFilledSegmentationId,
                        principalTable: "Segmentation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartnerUserSegmentationItem",
                columns: table => new
                {
                    PartnerUserId = table.Column<long>(type: "bigint", nullable: false),
                    CheckedSegmentationItemId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerUserSegmentationItem", x => new { x.PartnerUserId, x.CheckedSegmentationItemId });
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_PartnerUser_PartnerUserId",
                        column: x => x.PartnerUserId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartnerUserSegmentationItem_SegmentationItem_CheckedSegmentationItemId",
                        column: x => x.CheckedSegmentationItemId,
                        principalTable: "SegmentationItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transaction",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ProductImageUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ProductCategoryName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ProductCategoryImageUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(16,2)", precision: 16, scale: 2, nullable: false),
                    BoughtAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false),
                    PartnerUserId = table.Column<long>(type: "bigint", nullable: false),
                    BusinessSystemId = table.Column<long>(type: "bigint", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transaction_BusinessSystem_BusinessSystemId",
                        column: x => x.BusinessSystemId,
                        principalTable: "BusinessSystem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transaction_PartnerUser_PartnerUserId",
                        column: x => x.PartnerUserId,
                        principalTable: "PartnerUser",
                        principalColumn: "Id");
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
                name: "IX_BusinessSystemTier_TierId",
                table: "BusinessSystemTier",
                column: "TierId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemTierDiscountProductGroup_DiscountProductGroupId",
                table: "BusinessSystemTierDiscountProductGroup",
                column: "DiscountProductGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSystemUpdatePointsScheduledTask_BusinessSystemId",
                table: "BusinessSystemUpdatePointsScheduledTask",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscountProductGroup_BusinessSystemId",
                table: "DiscountProductGroup",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_PartnerId",
                table: "Notification",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Partner_Slug",
                table: "Partner",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPermission_Code",
                table: "PartnerPermission",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRole_PartnerId",
                table: "PartnerRole",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerRolePartnerPermission_PartnerPermissionId",
                table: "PartnerRolePartnerPermission",
                column: "PartnerPermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_PartnerId",
                table: "PartnerUser",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_TierId",
                table: "PartnerUser",
                column: "TierId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUser_UserId",
                table: "PartnerUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserPartnerNotification_PartnerUserId",
                table: "PartnerUserPartnerNotification",
                column: "PartnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserPartnerRole_PartnerUserId",
                table: "PartnerUserPartnerRole",
                column: "PartnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentation_AlreadyFilledSegmentationId",
                table: "PartnerUserSegmentation",
                column: "AlreadyFilledSegmentationId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerUserSegmentationItem_CheckedSegmentationItemId",
                table: "PartnerUserSegmentationItem",
                column: "CheckedSegmentationItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Permission_Code",
                table: "Permission",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Segmentation_PartnerId",
                table: "Segmentation",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentationItem_SegmentationId",
                table: "SegmentationItem",
                column: "SegmentationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tier_PartnerId",
                table: "Tier",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_BusinessSystemId",
                table: "Transaction",
                column: "BusinessSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_PartnerUserId",
                table: "Transaction",
                column: "PartnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_GenderId",
                table: "User",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotification_UserId",
                table: "UserNotification",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                table: "UserRole",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessSystemTierDiscountProductGroup");

            migrationBuilder.DropTable(
                name: "BusinessSystemUpdatePointsScheduledTask");

            migrationBuilder.DropTable(
                name: "PartnerRolePartnerPermission");

            migrationBuilder.DropTable(
                name: "PartnerUserPartnerNotification");

            migrationBuilder.DropTable(
                name: "PartnerUserPartnerRole");

            migrationBuilder.DropTable(
                name: "PartnerUserSegmentation");

            migrationBuilder.DropTable(
                name: "PartnerUserSegmentationItem");

            migrationBuilder.DropTable(
                name: "RolePermission");

            migrationBuilder.DropTable(
                name: "ScheduledTaskType");

            migrationBuilder.DropTable(
                name: "Transaction");

            migrationBuilder.DropTable(
                name: "UserNotification");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "BusinessSystemTier");

            migrationBuilder.DropTable(
                name: "DiscountProductGroup");

            migrationBuilder.DropTable(
                name: "PartnerPermission");

            migrationBuilder.DropTable(
                name: "PartnerRole");

            migrationBuilder.DropTable(
                name: "SegmentationItem");

            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "PartnerUser");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "BusinessSystem");

            migrationBuilder.DropTable(
                name: "Segmentation");

            migrationBuilder.DropTable(
                name: "Tier");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Partner");

            migrationBuilder.DropTable(
                name: "Gender");
        }
    }
}
