const Service = require('./service.model');

async function createService(req, res){
    try {
        const { name, description } = req.body;
        const created_by = updated_by = req.user.id;
        
        const isExists = await Service.findOne({ where: { name } });

        if(isExists) return res.status(400).send("Service already exists!");

        const service = await Service.create({
            name,
            description, 
            created_by,
            updated_by
        })

        res.status(200).send(service);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
}

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


async function updateService(req, res) {  
    try {
        const { name, description } = req.body;
        const updated_by = req.user.id;
        const service_id = req.params.id;

        console.log("hi", service_id);
        const service = await Service.findOne({ where: { id: service_id } });

        if(!service) return res.status(404).send("Servie not found!");

        await service.update({ name, description, updated_by });

        const updatedService = await Service.findOne({ id: service_id });
        
        res.status(200).send(updatedService);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!")
    }
}

async function deleteService(req, res) {  
    try {
        const service = await Service.findOne({ where: { id: req.params.id } });

        if(!service) return res.status(404).send("Service not found!");

        await service.destroy();

        res.status(200).send(service);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!")
    }
}

module.exports.createService = createService;
module.exports.getServices = getServices; 
module.exports.getServiceByID = getServiceByID; 
module.exports.updateService = updateService;
module.exports.deleteService = deleteService;