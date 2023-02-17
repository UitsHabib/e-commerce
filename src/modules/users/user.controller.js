const users = [ {"name":"Mr Sahadat", "email":"sahadat@gmail.com"} ]

function getUsers( req, res ) {
    res.send(users);
}

module.exports.getUsers = getUsers;