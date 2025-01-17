const jwt = require('jsonwebtoken');
const { secretkey } = require('../config/jwtUtils');

const generateToken = (user, type) => {
    // Ensure user and type are valid and not undefined
    try{
        if (!user || !type) {
            throw new Error('User and type must be provided');
        }
    
        const payload = {
            user, 
            type   // The type could be 'freelancer', 'client'
        };
        // console.log(payload)
        // console.log(secretkey)
        // Generate JWT token with a 1-hour expiration time
        const token = jwt.sign(payload, secretkey, { expiresIn: '1h' });
        return token
    }
    catch(error){
        console.log("Token Generate Error")
        
    }
   
};

module.exports = generateToken;
