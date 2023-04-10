const path = require("path");
const async = require("async");
const { values } = require("lodash");

async function init() {
    const config = require("./src/config");
    config.initEnvironmentVariables();

    const sequelize = require("./src/config/lib/sequelize");

    await sequelize.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );

    const User = require("./src/modules/user/user.model");
    const Permission = require("./src/modules/permission/permission.model");
    const ServicePermission = require("./src/modules/permission/service_permission.model");
    const Service = require("./src/modules/service/service.model");
    const Profile = require("./src/modules/profile/profile.model");
    const PermissionProfile = require("./src/modules/profile/permission_profile.model");

    await sequelize.sync();

    function userSeeder(callback) {
        User.findOrCreate({
            where: { email: "admin@commerce.com" },
            defaults: {
                firstName: "System",
                lastName: "Admin",
                password: "P@ssword123",
            },
        }).then((users) => {
            callback(null, users[0].id);
        });
    }

    function profileSeeder(userId, callback) {
        const profiles = [
            {
                name: "System Admin",
                description:
                    "This is the default profile for System Admin created by System Admin.",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Customer",
                description:
                    "This is the default profile for customer created by System Admin",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Vendor",
                description:
                    "This is the defalut profile for vendor created by System Admin",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
        ];

        Profile.destroy({ truncate: { cascade: true } }).then(() => {
            Profile.bulkCreate(profiles, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function userUpdateSeeder(userId, callback) {
        User.findOne({ where: { id: userId } }).then((admin) => {
            Profile.findOne({ where: { name: "System Admin" } }).then(
                (systemAdminProfile) => {
                    admin.update({ profile_id: systemAdminProfile.id });

                    callback(null, userId);
                }
            );
        });
    }

    function serviceSeeder(userId, callback) {
        const services = [
            {
                name: "User Management",
                description: "Service created by System Admin",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Service Management",
                description: "Service created by System Admin",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Permission Management",
                description: "Service created by System Admin",
                created_by: userId,
                updated_by: userId,
            },
        ];

        Service.destroy({ truncate: { cascade: true } }).then(() => {
            Service.bulkCreate(services, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function permissionSeeder(userId, callback) {
        const permissions = [
            {
                name: "System Admin Permissions",
                description:
                    "This is the default permission for System Admin created by System Admin",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Customer Permission",
                description:
                    "This is the default permission for customer created by System Admin",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Vendor Permission",
                description:
                    "This is the default permission for vendor created by System Admin",
                type: "standard",
                created_by: userId,
                updated_by: userId,
            },
        ];

        Permission.destroy({ truncate: { cascade: true } }).then(() => {
            Permission.bulkCreate(permissions, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function permissionServiceSeeder(userId, callback) {
        Promise.all([
            Service.findOne({ where: { name: "User Management" } }),
            Service.findOne({ where: { name: "Service Management" } }),
            Service.findOne({ where: { name: "Permission Management" } }),

            Permission.findOne({ where: { name: "System Admin Permissions" } }),
        ]).then((values) => {
            const [
                userManagementService,
                serviceManagementService,
                permissionManagementService,
                systemAdminPermission,
            ] = values;

            const permissionServices = [
                {
                    service_id: userManagementService.id,
                    permission_id: systemAdminPermission.id,
                },
                {
                    service_id: serviceManagementService.id,
                    permission_id: systemAdminPermission.id,
                },
                {
                    service_id: permissionManagementService.id,
                    permission_id: systemAdminPermission.id,
                },
            ];

            ServicePermission.destroy({ truncate: { cascade: true } }).then(
                () => {
                    ServicePermission.bulkCreate(permissionServices, {
                        returning: true,
                        ignoreDuplicates: false,
                    }).then(() => {
                        callback(null, userId);
                    });
                }
            );
        });
    }

    function profilePermissionSeeder(userId, callback) {
        Promise.all([
            Permission.findOne({ where: { name: "System Admin Permissions" } }),
            Permission.findOne({ where: { name: "Customer Permission" } }),
            Permission.findOne({ where: { name: "Vendor Permission" } }),

            Profile.findOne({ where: { name: "System Admin" } }),
        ]).then((values) => {
            const [
                systemAdminPermission,
                customerPermission,
                vendorPermission,
                systemAdminProfile,
            ] = values;

            const profilePermissions = [
                {
                    profile_id: systemAdminProfile.id,
                    permission_id: systemAdminPermission.id,
                },
                {
                    profile_id: systemAdminProfile.id,
                    permission_id: customerPermission.id,
                },
                {
                    profile_id: systemAdminProfile.id,
                    permission_id: vendorPermission.id,
                },
            ];

            PermissionProfile.destroy({ truncate: { cascade: true } }).then(
                () => {
                    PermissionProfile.bulkCreate(profilePermissions, {
                        returning: true,
                        ignoreDuplicates: false,
                    }).then(() => {
                        callback(null, userId);
                    });
                }
            );
        });
    }

    async.waterfall(
        [
            userSeeder,
            profileSeeder,
            userUpdateSeeder,
            serviceSeeder,
            permissionSeeder,
            permissionServiceSeeder,
            profilePermissionSeeder,
        ],
        (err) => {
            if (err) console.error(err);
            else console.log("DB seed completed");
            process.exit();
        }
    );
}

init();
