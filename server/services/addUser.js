const clientModel = require('../models/client');
const freelanceModel = require('../models/freelancer');
const bcryptjs = require('bcryptjs');

const registerUser = async (userData) => {
    const { join_as } = userData;
    try {
        if (join_as === "client") {
            const { first_name, email, password, birth_date, mobile_phone, company_name } = userData;
            
            // Ensure email is provided and valid
            if (!first_name || !email || !password || !birth_date || !mobile_phone || !company_name) {
                throw new Error("All fields are required for client.");
            }
            
            // Check if email is empty or null
            if (!email || email.trim() === "") {
                throw new Error("Email cannot be empty.");
            }

            let existingUser = await clientModel.findOne({ email: email });
            if (existingUser) {
                throw new Error("Client already exists.");
            }

            console.log("Hello Client");

            const hashedPassword = await bcryptjs.hash(password, 10);
            const newClient = new clientModel({
                name: first_name, // Consistent field name
                email: email,
                password: hashedPassword,
                dob: birth_date,  // Consistent field name
                mobile_no: mobile_phone, // Consistent field name
                company_name: company_name
            });
            await newClient.save();
            return newClient;
        } 
        
        else if (join_as === 'freelancer') {
            const { first_name, email, password, birth_date, mobile_phone, freelancer_skills,portfolio_url } = userData;
            console.log(email)
            // Ensure email is provided and valid
            if (!first_name || !email || !password || !birth_date || !mobile_phone || !freelancer_skills || !portfolio_url) {
                throw new Error("All fields are required for freelancer.");
            }
            
            // Check if email is empty or null
            if (!email || email.trim() === "") {
                throw new Error("Email cannot be empty.");
            }

            // Use 'email' for consistency with the field in the model
            let existingUser = await freelanceModel.findOne({ Email: email });
            if (existingUser) {
                throw new Error("Freelancer already exists.");
            }

            // Ensure that freelancer_skills is an array (validation)
            if (!Array.isArray(freelancer_skills)) {
                freelancer_skills = freelancer_skills.split(",").map(skill => skill.trim()); // Convert string to array if needed
            }

            const hashedPassword = await bcryptjs.hash(password, 10); // Hashing password for freelancer as well
            const newFreelancer = new freelanceModel({
                name: first_name, // Consistent field name
                Email: email,
                Password: hashedPassword, // Using hashed password
                DOB: birth_date, // Consistent field name
                Mobile_no: mobile_phone, // Consistent field name
                Skills: freelancer_skills, // Ensuring skills are passed as an array
                Portfolio: portfolio_url,
            });

            await newFreelancer.save();
            return newFreelancer;
        } else {
            throw new Error('Invalid user type. Please choose either "client" or "freelancer".');
        }
    } catch (err) {
        console.error(`Error occurred: ${err.message}`);
        throw new Error(err); // Rethrow the error if needed for further handling
    }
};

module.exports = { registerUser };
