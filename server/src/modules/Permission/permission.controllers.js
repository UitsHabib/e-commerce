const Permission = require("./permission.model");
const ServicePermission = require("./service_permission.model");
const Service = require("../service/service.model");

async function createPermission(req, res) {
    try {
        const { name, description, serviceIDs } = req.body;

        const existPermission = await Permission.findOne({
            where: { name },
        });

        if (existPermission) return res.status(400).send("Already exist");

        const services = await Service.findAll({
            where: {
                id: serviceIDs,
            },
        });

        if (!services || services.length === 0) {
            return res.status(404).send("Service not found");
        }

        const permission = await Permission.create({
            name,
            description,
            created_by: req.user.id,
        });

        const servicePermissions = services.map((service) => ({
            service_id: service.id,
            permission_id: permission.id,
        }));

        await ServicePermission.bulkCreate(servicePermissions);

        res.status(201).send(permission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getPermissions(req, res) {
    try {
        const permissions = await Permission.findAll({
            include: [
                {
                    model: ServicePermission,
                    as: "permissionServices",
                    include: [
                        {
                            model: Service,
                            as: "service",
                        },
                    ],
                },
            ],
        });

        res.status(200).send(permissions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

//Get a single permission
async function getPermission(req, res) {
    try {
        const permission_id = req.params.id;

        const permission = await Permission.findOne({
            where: { id: permission_id },
        });

        if (!permission) return res.status(404).send("Permission not found");

        res.status(200).send(permission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

// Update a permission
async function updatePermission(req, res) {
    try {
        const { id } = req.params;
        const { name, description, serviceIDs } = req.body;

        const permission = await Permission.findOne({ where: { id } });

        if (!permission) {
            return res.status(404).send("Permission not found");
        }

        permission.name = name || permission.name;
        permission.description = description || permission.description;

        await permission.save();

        if (serviceIDs && serviceIDs.length > 0) {
            const services = await ServicePermission.findAll({
                where: { permission_id: id },
            });

            await Promise.all(services.map((service) => service.destroy()));

            const selectedServices = await Service.findAll({
                where: { id: serviceIDs },
            });
            const servicePermissions = selectedServices.map((service) => ({
                service_id: service.id,
                permission_id: permission.id,
            }));

            await ServicePermission.bulkCreate(servicePermissions);
        }

        res.status(200).send(permission); // Send the updated permission object as the response body
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error"); // Send a 500 response in case of any errors
    }
}

//delete permission
async function deletePermission(req, res) {
    try {
        const permission_id = req.params.id;

        const permission = await Permission.findOne({
            where: { id: permission_id },
        });

        if (!permission) return res.status(404).send("Permission not found");
        await permission.destroy();

        res.status(200).send(permission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.createPermission = createPermission;
module.exports.getPermissions = getPermissions;
module.exports.getPermission = getPermission;
module.exports.updatePermission = updatePermission;
module.exports.deletePermission = deletePermission;
