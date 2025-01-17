const projectModel = require('../../models/project');

// Function to fetch all projects
const get_all = async () => {
  try {
    const projects = await projectModel.find({});
    console.log(projects)
    return projects;
  } catch (error) { 
    throw new Error("Error fetching projects: " + error.message); // Provide more descriptive error message
  }
};

module.exports = {
  get_all
};
