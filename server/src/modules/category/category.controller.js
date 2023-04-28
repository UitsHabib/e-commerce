const Category = require( './category.model' );


async function getCategories(req, res){
    try {
        const categories = await Category.findAll();

        res.status(200).send(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function createCategory(req, res){
    try {
        const { name, description } = req.body;

        const existCategory = await Category.findOne({ where: { name } });
        if (existCategory) return res.status(400).send("Already exist");

        const category = await Category.create({
            name,
            description,
            created_by: req.user.id,
        });

        res.status(201).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getCategroyByID(req, res){
    try {
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });

        if(!category) return res.status(404).send('Category not found!');

        res.status(200).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function updateCategory(req, res) {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });
        if (!category) return res.status(404).send("Category not found");

        const updateCategory = await category.update({
            name,
            description,
            updated_by: req.user.id,
        });

        res.status(200).send(updateCategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });
        if (!category) return res.status(404).send("Category not found!");

        await category.destroy();

        res.status(200).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.getCategories = getCategories; 
module.exports.getCategroyByID = getCategroyByID; 
module.exports.createCategory = createCategory; 
module.exports.updateCategory = updateCategory; 
module.exports.deleteCategory = deleteCategory; 