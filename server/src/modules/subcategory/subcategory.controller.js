const Subcategory = require( './subcategory.model' );


async function getSubcategories(req, res){
    try {
        const subcategories = await Subcategory.findAll();

        res.status(200).send(subcategories);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function createSubcategory(req, res){
    try {
        const { name, description, category_id } = req.body;

        const existSubcategory = await Subcategory.findOne({ where: { name } });
        if (existSubcategory) return res.status(400).send("Already exist");

        const subcategory = await Subcategory.create({
            name,
            description,
            category_id,
            created_by: req.user.id,
        });

        res.status(201).send(subcategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getSubcategroyByID(req, res){
    try {
        const { id } = req.params;

        const subcategory = await Subcategory.findOne({ where: { id } });

        if(!subcategory) return res.status(404).send('Subcategory not found!');

        res.status(200).send(subcategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function updateSubcategory(req, res) {
    try {
        const { name, description, category_id } = req.body;
        const { id } = req.params;

        const subcategory = await Subcategory.findOne({ where: { id } });
        if (!subcategory) return res.status(404).send("Subcategory not found");

        const updateSubcategory = await subcategory.update({
            name,
            description,
            category_id,
            updated_by: req.user.id,
        });

        res.status(200).send(updateSubcategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteSubcategory(req, res) {
    try {
        const { id } = req.params;

        const subcategory = await Subcategory.findOne({ where: { id } });
        if (!subcategory) return res.status(404).send("Subcategory not found!");

        await subcategory.destroy();

        res.status(200).send(subcategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.getSubcategories = getSubcategories; 
module.exports.getSubcategroyByID = getSubcategroyByID; 
module.exports.createSubcategory = createSubcategory; 
module.exports.updateSubcategory = updateSubcategory; 
module.exports.deleteSubcategory = deleteSubcategory; 