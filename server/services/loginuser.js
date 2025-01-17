const clientModel = require('../models/client');
const freelanceModel = require('../models/freelancer');
const bcryptjs = require('bcryptjs');
const generateToken = require('../utils/jwtUtils');

const loginUser = async (userData) => {
    const { email, password, join_as } = userData;

    try {
        let existing_user;

        // Ensure email and password are provided
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        // Authenticate for client
        if (join_as === "client") {
            existing_user = await clientModel.findOne({ email });
            if (!existing_user) {
                throw new Error("Client does not exist");
            }

            const passwordIsMatch = await bcryptjs.compare(password, existing_user.password); // Compare password

            if (!passwordIsMatch) {
                throw new Error("Invalid Credentials");
            }

            // If password matches, generate the token
            const token = generateToken(existing_user, "client");
            return token;

        // Authenticate for freelancer
        } else if (join_as === "freelancer") {
            console.log("Email: ", email); // Debugging to make sure email is correct

            // Check if the freelancer email field is correct: Use the same case (Email or email)
            existing_user = await freelanceModel.findOne({ Email: email }); // Ensure this matches the field in your model
            console.log("Existing User:", existing_user); // Check if the user is found

            if (! existing_user) {
                throw new Error("Freelancer does not exist");
            }
            console.log(password)
            
            const passwordIsMatch = await bcryptjs.compare(password, existing_user.Password); // Compare password

            if (!passwordIsMatch) {
                throw new Error("Invalid Credentials");
            }

            // If password matches, generate the token
            const token = generateToken(existing_user, "freelancer");
            return token;
        
        } else {
            throw new Error("Invalid account type");
        }
    } catch (error) {
        console.error("Error occurred during login:", error); // Improved logging for debugging
        throw new Error(`Error occurred: ${error.message}`); // Improved error message
    }
};

module.exports = { 
    loginUser
};
