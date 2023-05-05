const Profile = require("./profile.model");
const PermissionProfile = require("./permission_profile.model");
const Permission = require("../Permission/permission.model");
const ServicePermission = require("../Permission/service_permission.model");
const Service = require("../service/service.model");

async function createProfile(req, res) {
    try {
        const { name, description, permissionIds } = req.body;
        console.log("permissions id--------", permissionIds);

        const existingProfile = await Profile.findOne({
            where: { name },
        });
        if (existingProfile) {
            return res.status(400).send("Profile already exists");
        }

        const permissions = await Permission.findAll({
            where: {
                id: permissionIds,
            },
        });

        if (!permissions || permissions.length === 0) {
            return res.status(404).send("Permission(s) not found");
        }

        const createdProfile = await Profile.create({
            name,
            description,
            created_by: req.user.id,
        });

        const permissionProfiles = permissions.map((permission) => ({
            permission_id: permission.id,
            profile_id: createdProfile.id,
        }));

        await PermissionProfile.bulkCreate(permissionProfiles);

        res.status(201).send(createdProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

async function getProfiles(req, res) {
    try {
        const profiles = await Profile.findAll({
            include: [
                {
                    model: PermissionProfile,
                    as: "permissionProfiles",
                    include: [
                        {
                            model: Permission,
                            as: "permission",
                            include: [
                                {
                                    model: ServicePermission,
                                    as: "permissionServices",
                                    include: [
                                        {
                                            model: Service,
                                            as: "service",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

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
        const { id } = req.params;
        const { name, description, permissionIds } = req.body;

        const profile = await Profile.findOne({ where: { id } });

        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        profile.name = name || profile.name;
        profile.description = description || profile.description;

        await profile.save();

        if (permissionIds && permissionIds.length > 0) {
            const permissions = await PermissionProfile.findAll({
                where: { profile_id: id },
            });

            await Promise.all(
                permissions.map((permission) => permission.destroy())
            );

            const selectedPermissions = await Permission.findAll({
                where: { id: permissionIds },
            });
            const permissionProfiles = selectedPermissions.map(
                (permission) => ({
                    permission_id: permission.id,
                    profile_id: profile.id,
                })
            );
            await PermissionProfile.bulkCreate(permissionProfiles);
        }

        res.status(200).send(profile);
    } catch (error) {
        console.log(error);
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
