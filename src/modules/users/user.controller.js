const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [ ]

function getUsers( req, res ) {
    res.send(users);
}

function getUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );

    if( !user ) return res.send("User not found!");

    res.send( user );
}

function createUser ( req, res ) {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = users.find(user => user.email === email);

    if(user) return res.status(400).send("User already exists!");

    const newUser = {
        firstName, 
        lastName,
        email,
        password: hashedPassword
    }

    users.push(newUser);

    const modifiedUser = {...newUser};
    delete modifiedUser.password;

    res.status(201).send(modifiedUser);
}

function login(req, res) {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if(!user) return res.status(400).send('Invalid credential');

    const passwordMatched = bcrypt.compareSync(password, user.password);

    if(!passwordMatched) return res.status(400).send('Invalid credential');

    const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: "1h", issuer: user.email });

    const modifiedUser = {...user};
    delete modifiedUser.password;

    res.cookie("access_token", token, {
        httpOnly: true
    });

    res.status(200).send(modifiedUser); // jwt => json web token
}

function updateUser(req, res) {  
    const { firstName, lastName } = req.body;
    const email = req.user.email;
    
    const user = users.find(user => user.email === email);

    if(!user) return res.status(404).send("User not found!");

    user.firstName = firstName;
    user.lastName = lastName;

    res.send(user);
}

function deleteUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );
    
    if( !user ) return res.send("User not found!");

    users = users.filter( user => user.email !== req.params.email ); //reasign user array
    
    res.send(user);
}

function findUser(email) {
    const user = users.find(user => user.email === email);
    return user;
}

module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.findUser = findUser;