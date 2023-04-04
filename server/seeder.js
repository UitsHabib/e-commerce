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
            where: { email: "mamunkhan069@gmail.com" },
            defaults: {
                firstName: "Mamun",
                lastName: "khan",
                password: "12345678",
            },
        }).then((users) => {
            callback(null, users[0].id);
        });
    }

    function serviceSeeder(userId, callback) {
        const services = [
            {
                name: "User Management",
                description: "Noman",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Service Management",
                description: "Noman",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Permission Management",
                description: "Noman",
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
                description: "Noman",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Customer Permission",
                description: "Admin can manage all services",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Vendor Permission",
                description: "Admin can manage all services",
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

    async.waterfall(
        [
            userSeeder,
            serviceSeeder,
            permissionSeeder,
            permissionServiceSeeder,
            profileSeeder,
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
