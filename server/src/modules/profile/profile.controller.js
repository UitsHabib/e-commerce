const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("./profile.model");

async function createProfile(req, res) {
    try {
        const { name, description, permission_id } = req.body;

        const existProfile = await Profile.findOne({
            where: { name },
        });
        if (existProfile)
            return res.status(400).send("Already created this profile");

        const profile = await Profile.create({
            profile_name,
            description,
            permission_id: permission_id.join(","),
        });
        res.status(201).send(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getProfiles(req, res) {
    try {
        const profiles = await Profile.findAll();
        res.status(200).send(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getProfile(req, res) {
    try {
        console.log("........get Profile is called..........", req.params.id);
        const profile = await Profile.findOne({
            where: { id: req.params.id },
        });
        if (!profile) return res.status(404).send("Profile not found");
        res.status(200).send(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function updateProfile(req, res) {
    try {
        const { profile_name, description, permission_ids } = req.body;
        const { id } = req.params;

        const profile = await Profile.findOne({ where: { id } });
        if (!profile) return res.status(404).send("Profile not found");

        const profileup = await profile.update({
            profile_name,
            description,
            permission_ids: permission_ids.join(","),
        });

        res.status(200).send(profileup);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function findProfile(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id: id },
        });
        return user;
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteProfile(req, res) {
    try {
        const { id } = req.params;
        console.log(id);

        const profile = await Profile.findOne({ where: { id } });
        if (!profile) return res.status(404).send("Profile not found");

        await profile.destroy();

        res.status(200).send(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.createProfile = createProfile;
module.exports.getProfiles = getProfiles;
module.exports.deleteProfile = deleteProfile;
module.exports.updateProfile = updateProfile;
module.exports.getProfile = getProfile;
module.exports.findProfile = findProfile;
