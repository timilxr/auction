import User from '../models/user.model.js';


export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'No User not found'});
    }
}

export const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'User not found'});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        console.log(user);
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'User not found'});
    }
}

export const createUser = async (req, res) => {
    const details = req.body;

    const newUser = new User(details);
    try{
        const user = await newUser.save();
        // console.log(Users);
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'Error creating User'});
    }
}

export const updateUser = async (req, res) => {
    const {fullName, email, phoneNumber, password, isAdmin} = req.body;
    const id = req.params.id;

    try{
        const user = await User.findById(id);
        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.password = password;
        user.isAdmin = isAdmin;
        // console.log(Users);
        try{
            const newUser = await user.save();
            res.status(200).json(newUser);
        }
        catch(error){
            res.status(400).json({message: error.message, info: 'User not updated'})
        }
    }
    catch(error){
        res.status(400).json({message: error.message, info: 'User not found'});
    }
}

export const login = async (req, res, next) => {
    const {matric, password} = req.body;
    console.log(req.body);

    await User.findOne({matric: matric, password: password}, {__v: 0, password: 0})
    .then(user=>{
        // check if user exists
        if(!user){
            return next(res.status(422).json({
                success: false,
                message: 'Matric or password incorrect',
            }));
        }
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user,
            });
    })
    .catch(error=>{
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'login failed',
        });
    })
}
