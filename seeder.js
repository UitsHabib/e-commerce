(async function init() {
    try {
        const config = require("./src/config");
        config.initEnvironmentVariables();
        const { sequelize } = require("./src/config/lib/sequelize");
        await sequelize.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
        );
        require("./src/modules/user/user.model");
        const Service = require("./src/modules/service/service.model");

        // Insert some services into the services table
        await Service.bulkCreate([
            {
                name: "Delivery",
                description: "We deliver your products to your doorstep.",
                created_by: "admin",
                updated_by: "admin",
            },
            {
                name: "Returns",
                description: "We accept returns within 30 days of purchase.",
                created_by: "admin",
                updated_by: "admin",
            },
            {
                name: "Customer Support",
                description:
                    "Our customer support team is available 24/7 to assist you.",
                created_by: "admin",
                updated_by: "admin",
            },
        ]);

        await sequelize.sync();
        console.log("DB Seed Completed");
    } catch (err) {
        console.log(err);
    }
})();
