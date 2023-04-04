const Permission = require("./permission.model");
const ServicePermission = require("./service_permission.model");
const Service = require("../service/service.model");

// Create permission
async function createPermission(req, res) {
    try {
        const { permissionName, services } = req.body;
        const created_by = req.user.id;

        const existPermission = await Permission.findOne({
            where: { permissionName },
        });

        if (existPermission) return res.status(400).send("Already exist");

        const servicesJson = JSON.stringify(services); //use JSON.parse() while parsing

        const permission = await Permission.create({
            permissionName,
            services: servicesJson,
            created_by,
        });
        res.status(201).send(permission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

// Get all permissions
async function getPermissions(req, res) {
    try {
        const permissions = await Permission.findAll({
            include: [
                {
                    model: ServicePermission,
                    as: "servicePermissions",
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
        const { permissionName, services } = req.body;
        const Updated_by = req.user.lastName;
        const permission_id = req.params.id;

        const permission = await Permission.findOne({
            where: { id: permission_id },
        });

        if (!permission) return res.status(404).send("Permission not found");

        const servicesJson = JSON.stringify(services); //use JSON.parse() while parsing

        await Permission.update(
            {
                permissionName,
                services: servicesJson,
                updated_by: Updated_by,
            },
            { where: { id: permission_id } }
        );

        const updatedPermission = await Permission.findOne({
            where: { id: permission_id },
        });
        res.status(200).send(updatedPermission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
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

        res.status(200).send(await Permission.findAll());
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
