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
    const Permission = require("./src/modules/Permission/permission.model");
    const ServicePermission = require("./src/modules/Permission/service_permission.model");
    const Service = require("./src/modules/service/service.model");
    const Profile = require("./src/modules/profile/profile.model");
    const PermissionProfile = require("./src/modules/profile/permission_profile.model");
    const Category = require("./src/modules/category/category.model");
    const Subcategory = require("./src/modules/subcategory/subcategory.model");
    const Vendor = require("./src/modules/vandor/vendor.model");
    const Brand = require("./src/modules/brand/brand.model");
    const Color = require("./src/modules/color/color.model");
    const Size = require("./src/modules/size/size.model");
    const Product = require("./src/modules/product/product.model");
    

    await sequelize.sync();

    function userSeeder(callback) {
        User.findOrCreate({
            where: { email: "admin@ecommerce.com" },
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

    function categorySeeder(userId, callback) {
        const categories = [
            {
                name: "Men's Fashion",
                description:"T-Shirt, Polo Shirt, Pants",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Women's Fashion",
                description:"Sharee, Lehenga, Scart etc",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Electronics",
                description:"TV, Blender, Mobile etc",
                created_by: userId,
                updated_by: userId,
            },
        ];

        Category.destroy({ truncate: { cascade: true } }).then(() => {
            Category.bulkCreate(categories, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function subcategorySeeder(userId, callback) {

        Promise.all([
            Category.findOne({ where: { name: "Men's Fashion" } }),
            Category.findOne({ where: { name: "Women's Fashion"} }),
        ]).then((values) => {
            const [
                mensFashionCategory,
                womwnsFashionCategory,
            ] = values;

            const subcategories = [
                {
                    category_id: mensFashionCategory.id,
                    name: "T-shirt",
                    description: "Men t-shirt sub-category",
                    image:"shirt.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    category_id: womwnsFashionCategory.id,
                    name: "Sharee",
                    description: "Women saree sub-category",
                    image:"sharee.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
            ];

            Subcategory.destroy({ truncate: { cascade: true } }).then(
                () => {
                    Subcategory.bulkCreate(subcategories, {
                        returning: true,
                        ignoreDuplicates: false,
                    }).then(() => {
                        callback(null, userId);
                    });
                }
            );
        });

    }

    function vendorSeeder(userId, callback) {
        Profile.findOne({ where: { name: "Vendor" } }).then(
            (vendorProfile) => {
                console.log('-------',vendorProfile);
                Vendor.create({
                    name: "Test Vendor",
                    store_name: "Test store",
                    profile_id: vendorProfile.id,
                    logo:"",
                    phone:"01910922069",
                    district:"Dhaka",
                    thana:"Dhaka",
                    address:"Road#6, Block#B, Banasree, Rampura, Dhaka",
                    about_seller:"I am a seller created by super admin",
                    username:"vendor",
                    email:"vendor@ecommerce.com",
                    password:"P@ssword123",
                    status: 1,
                    created_by: userId,
                    updated_by: userId,
                });

                callback(null, userId);
            }
        );



        // const vendors = [
        //     {
        //         name: "Yusuf Ali",
        //         store_name: "Ittadi store",
        //         profile_id:"",
        //         logo:"",
        //         phone:"",
        //         district:"",
        //         thana:"",
        //         address:"",
        //         about_seller:"",
        //         username:"",
        //         email:"",
        //         password:"",
        //         status: 1,
        //         created_by: userId,
        //         updated_by: userId,
        //     },
        //     {
        //         name: "Yusuf Ali",
        //         store_name: "Ittadi store",
        //         profile_id:"",
        //         logo:"",
        //         phone:"",
        //         district:"",
        //         thana:"",
        //         address:"",
        //         about_seller:"",
        //         username:"",
        //         email:"",
        //         password:"",
        //         status: 1,
        //         created_by: userId,
        //         updated_by: userId,
        //     },
        //     {
        //         name: "Yusuf Ali",
        //         store_name: "Ittadi store",
        //         profile_id:"",
        //         logo:"",
        //         phone:"",
        //         district:"",
        //         thana:"",
        //         address:"",
        //         about_seller:"",
        //         username:"",
        //         email:"",
        //         password:"",
        //         status: 1,
        //         created_by: userId,
        //         updated_by: userId,
        //     },
        // ];

        // Vendor.destroy({ truncate: { cascade: true } }).then(() => {
        //     Vendor.bulkCreate(vendors, {
        //         returning: true,
        //         ignoreDuplicates: false,
        //     }).then(() => {
        //         callback(null, userId);
        //     });
        // });
    }

    function brandSeeder(userId, callback) {
        const brands = [
            {
                name: "Easy",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Bay",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Bata",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Brand.destroy({ truncate: { cascade: true } }).then(() => {
            Brand.bulkCreate(brands, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function colorSeeder(userId, callback) {
        const colors = [
            {
                name: "Red",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Blue",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Black",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Color.destroy({ truncate: { cascade: true } }).then(() => {
            Color.bulkCreate(colors, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function sizeSeeder(userId, callback) {
        const sizes = [
            {
                name: "40",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "41",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "42",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Size.destroy({ truncate: { cascade: true } }).then(() => {
            Size.bulkCreate(sizes, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function productSeeder(userId, callback) {

        Promise.all([
            Subcategory.findOne({ where: { name: "T-shirt" } }),
            Subcategory.findOne({ where: { name: "Sharee"} }),
            Brand.findOne({ where: { name: "Easy"} }),
            Color.findOne({ where: { name: "Red"} }),
            Size.findOne({ where: { name: "40"} }),
        ]).then((values) => {
            const [
                tshirtSubcategory,
                shareeSubcategory,
                brand,
                color,
                size,
            ] = values;

            const products = [
                {
                    sub_cat_id: tshirtSubcategory.id,
                    product_code: "4567",
                    name: "casual",
                    description: "Men casual t-shirt",
                    images:"casualshirt.jpg",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    sub_cat_id: shareeSubcategory.id,
                    product_code: "4567",
                    name: "jamdani",
                    description: "women samdani sharee ",
                    images:"jamdanisharee.jpg",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
                    created_by: userId,
                    updated_by: userId,
                },
            ];

            Product.destroy({ truncate: { cascade: true } }).then(
                () => {
                    Product.bulkCreate(products, {
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
            categorySeeder,
            subcategorySeeder,
            vendorSeeder,
            brandSeeder,
            colorSeeder,
            sizeSeeder,
            productSeeder,
        ],
        (err) => {
            if (err) console.error(err);
            else console.log("DB seed completed");
            process.exit();
        }
    );
}

init();
