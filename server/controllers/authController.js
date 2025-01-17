const { use } = require('../routes/authRoute');
const adduserService = require('../services/addUser');
const loginUserService = require('../services/loginuser')

const adduser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await adduserService.registerUser(userData);  // Fixed typo here
        res.status(201).json({ message: "User registered successfully.",user }); // Status 201 for resource creation
    } catch (error) {
        console.error("Error occurred during user registration:", error.message);
        res.status(400).json({ message:error.message }); // More generic error message
    }
};

const loginController = async (req,res) => {
    try{
        const userData = req.body
        const token = await loginUserService.loginUser(userData)
        console.log(token)
        res.status(200).json({ "message":"User Logged In",token })
    }catch(err){
        console.error(`Error Occured During Login ${err}`)
        res.status(400).json({ message: "An error occurred while Login the user. Please try again." }); // More generic error message

    }
}

module.exports = { 
    adduser ,
    loginController
};
