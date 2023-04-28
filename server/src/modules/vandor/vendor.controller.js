const { send } = require("../../config/lib/email-sevice/email.service");
const Vendor = require("./vendor.model");
const Profile = require( "../profile/profile.model" );

async function createVendor(req, res) {
    try {
        const { name, store_name, phone, district, thana, address, about_seller, username, email, password, status } = req.body;

        const existVendor = await Vendor.findOne({ where: { email } });

        if (existVendor) return res.status(400).send("Already registered!");

        const profile = await Profile.findOne({ where: { name: "Vendor" } });

        const vendor = await Vendor.create({
            profile_id: profile.id,
            name,
            store_name,
            phone,
            district,
            thana,
            address,
            about_seller,
            username,
            email,
            password,
        });

        const options = {
            to: email,
            subject: "Greetings",
        };

        await send(options, "vendor-registration");

        res.status(201).send(vendor);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getVendors(req, res) {
    try {
        const vendors = await Vendor.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(vendors);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getVendorById(req, res) {
    const vendorId = req.params.id;

    const vendor = await Vendor.findOne({
        where: { id: vendorId },
        attributes: { exclude: ["password"] },
    });

    if (!vendor) return res.status(404).send("User not found");

    res.send(vendor);
}

async function updateVendor(req, res) {
    try {
        const { name, store_name, phone, district, thana, address, about_seller } = req.body;
        const { id } = req.params;

        const vendor = await Vendor.findOne({ where: { id } });

        if (!vendor) return res.status(404).send("User not found");

        await vendor.update(
            {
                name,
                store_name,
                phone,
                district,
                thana,
                address,
                about_seller,
            }
        );

        const updatedVendor = await Vendor.findOne({
            where: { id },
            attributes: { exclude: ["password"] },
        });

        res.status(200).send(updatedVendor);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteVendor(req, res) {
    try {
        const { id } = req.params;

        const vendor = await Vendor.findOne({ where: { id } });
        if (!vendor) return res.status(404).send("Vendor not found!");

        await vendor.destroy();

        res.status(200).send(vendor);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.createVendor = createVendor;
module.exports.getVendors = getVendors;
module.exports.getVendorById = getVendorById;
module.exports.updateVendor = updateVendor;
module.exports.deleteVendor = deleteVendor;
