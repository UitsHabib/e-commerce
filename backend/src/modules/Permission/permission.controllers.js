// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Permission = require("./permission.model");

async function createPermission(req, res) {
    try {
        const { permissionName, services } = req.body;
        //const email = req.user.email;

        const existPermission = await Permission.findOne({
            where: { permissionName },
        });
        if (existPermission) return res.status(400).send("Already exist");

        const servicesJson = JSON.stringify(services); //use JSON.parse() while parsing

        const permission = await Permission.create({
            permissionName,
            services: servicesJson,
            created_by: "Noman",
            updated_by: "Noman",
        });
        res.status(201).send(permissionName);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getPermission(req, res) {
    try {
        const permission = await Permission.findAll();

        res.status(200).send(permission);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.createPermission = createPermission;
module.exports.getPermission = getPermission;
