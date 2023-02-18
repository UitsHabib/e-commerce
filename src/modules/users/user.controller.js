const { object, string } = require('yup');
const users = [ {"name":"Mr Sahadat", "email":"sahadat@gmail.com"} ]

function getUsers( req, res ) {
    res.send(users);
}

function getUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );

    if( !user ) return res.send("User not found!");

    res.send( user );
}

function createUser ( req, res ) {
    const body = req.body;
    const name = body.name;
    const email = body.email;

    const createSchema = object().shape({
        name: string()
            .min(2,'Name must be minimum 2 characters long')
            .max(100,'Name must be maximum 100 characters long')
            .required('Name field is required!'),
        email:string()
            .email('This field should be a valid email address')
            .required('Email field is required')
    });

    const promise = createSchema.validate({ name, email }, { abortEarly: false });

    promise
        .then(function () {  
            const user = users.find( user => user.email === email );

            if( user ) return res.status(400).send("User already exists!");

            users.push( body );

            res.status(201).send(body);
        })
        .catch(function (err){
            const errorMsg = {
                path: err.inner[0].path,
                msg: err.inner[0].message
            }
            
            return res.status(400).send(errorMsg);
        })
}

function updateUser( req, res ) {  
    const body = req.body;

    const updateSchema = object().shape({
        name:string()
            .required('This field is required!')
            .min(2, 'This should be minimum two characters!')
            .max(100, 'This should be minimum two characters!')
    });

    const promise = updateSchema.validate({ name: body.name }, { abortEarly:false });

    promise
        .then(() => {
            const user = users.find( user => user.email === req.params.email );

            if( !user ) return res.status(404).send("User not found!");
        
            user.name = body.name;
        
            res.send(user);
        })
        .catch((err) => {
            const errorMsg = {
                path: err.inner[0].path,
                msg: err.inner[0].message
            }
            
            return res.status(400).send(errorMsg);
        });
}

function deleteUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );
    
    if( !user ) return res.send("User not found!");

    users = users.filter( user => user.email !== req.params.email ); //reasign user array
    
    res.send(user);
}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;