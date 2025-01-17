const projectModel = require('../../models/project');
const clientModel = require('../../models/client');
const freelanceModel = require('../../models/freelancer')
const mongoose = require('mongoose');

const updateProject = async (userData) => {
  try {
    console.log(userData);

    const { userid, frelancer_email, projectid } = userData;

    // Validate User ID
    if (!userid) {
      throw new Error('User ID is missing.');
    }


    // Validate Freelancer Email
    if (!frelancer_email) {
      throw new Error('Freelancer Email is missing.');
    }

    // Validate Project ID
    if (!projectid) {
      throw new Error('Project ID is missing.');
    }
 

    // Check if user exists
    const user = await clientModel.findOne({_id:new mongoose.Types.ObjectId(userid)});
    if (!user) {
      throw new Error(`No user found with ID: ${userid}`);
    }

    // Check if project exists
    const project = await projectModel.findOne({ id:projectid });
    if (!project) {
      throw new Error(`No project found with ID: ${projectid}`);
    }

    // Update project data
    const updatedProject = await projectModel.findOneAndUpdate(
      {id:projectid},
      { $addToSet: { freelancers: frelancer_email } }, // Avoid duplicate entries
      { new: true } // Return the updated document
    );

    console.log('Project successfully updated:', updatedProject);

    return updatedProject;
  } catch (error) {
    console.error('Error in updateProject:', error.message);
    throw new Error(error.message || 'An error occurred while updating the project.');
  }
};


const get_freelancer = async (userData) => {
    try {
      const { projectid } = userData;
  
      // Query the project by projectid
      const project = await projectModel.findOne({ id: projectid });
  
      // Check if the project exists
      if (!project) {
        throw new Error('Project not found');
      }
  
      // Get the freelancers array
      const freelance = project.freelancers;
  
      // Check if there are freelancers assigned to the project
      if (freelance.length === 0) {
        throw new Error('No freelancers assigned to this project');
      }
  
      // Create an array to store the freelancers data
      const freelancersData = [];
  
      // Loop through all freelancers and fetch their information
      for (const email of freelance) {
        console.log(`Searching for freelancer with email: ${email}`);
  
        // Fetch freelancer data by email
        const freelancer = await freelanceModel.findOne({ Email: email });
  
        // If freelancer is found, remove the password and push the data to freelancersData
        if (freelancer) {
          // Create a new object without the Password field
          const { Password, ...freelancerWithoutPassword } = freelancer.toObject();
          freelancersData.push(freelancerWithoutPassword);
        } else {
          console.log(`Freelancer with email ${email} not found.`);
        }
      }
  
      // Return the collected freelancer data
      return freelancersData;
    } catch (error) {
      console.error(error);
      throw new Error(error.message || 'An error occurred while fetching freelancers');
    }
  };
           
  

  //Delete a Freelancer

  const delete_freelancer = async (userData) => {
    try {
      const {     projectId, email } = userData;
  
      // Ensure projectId and email are provided
      if (!projectId || !email) {
        throw new Error('Project ID and email are required');
      }
  
      // Update the project document
      const updatedpro = await projectModel.updateOne(
        { id: projectId },
        { $pull: { freelancers: email } } // Use { freelancers: { email: email } } if it's an array of objects
      );
  
      if (updatedpro.modifiedCount === 0) {
        throw new Error('No freelancer found with that email or no update occurred');
      }
  
      return updatedpro;
    } catch (error) {
      throw new Error(error.message);
    }
  };

module.exports = { updateProject,get_freelancer ,delete_freelancer   };
