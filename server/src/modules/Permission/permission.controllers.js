const Permission = require("./permission.model");
const ServicePermission = require("./service_permission.model");
const Service = require("../service/service.model");

// Create permission
async function createPermission(req, res) {
    try {
        const { name, description } = req.body;

        const existPermission = await Permission.findOne({
            where: { name },
        });

        if (existPermission) return res.status(400).send("Already exist");

        const permission = await Permission.create({
            name,
            description,
            created_by: req.user.id,
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
        const permissions = await Permission.findAll({});

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
        const { name, description } = req.body;
        const permission_id = req.params.id;

        const permission = await Permission.findOne({
            where: { id: permission_id },
        });

        if (!permission) return res.status(404).send("Permission not found");

        await Permission.update(
            {
                name,
                description,
                updated_by: req.user.id,
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
