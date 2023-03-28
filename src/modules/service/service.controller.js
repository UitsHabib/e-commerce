const Service = require('./service.model');


async function getServices(req, res){
    try {
        const services = await Service.findAll();

        res.status(200).send(services);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function getServiceByID(req, res){
    try {
        const { id } = req.params;

        const service = await Service.findOne({
            where: { id }
        });

        if(!service) return res.status(404).send('Service not found!');

        res.status(200).send(service);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

module.exports.getServices = getServices; 
module.exports.getServiceByID = getServiceByID; 