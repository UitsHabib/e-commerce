const Service = require("./service.model");

async function getServices(req, res) {
    try {
        const services = await Service.findAll();
        res.status(200).send(services);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

// Get Single Service by ID
async function getService(req, res) {
    try {
        const service = await Service.findByPk(req.params.id);

        if (!service) return res.status(404).send("Not Found");

        res.status(200).send(service);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.getServices = getServices;
module.exports.getService = getService;
