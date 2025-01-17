const projService = require('../services/freelancer/projects');

const get_all_proj = async (req, res) => {
  try {
    // Get all projects from the service
    let projects = await projService.get_all();
    console.log(projects);

    // Return the projects with a success status and message
    res.status(200).json({
      message: "All Projects",
      projects: projects // Ensure the projects are sent inside the response object
    });
  } catch (error) {
    console.log(error);

    // Return a 500 Internal Server Error status code for server-side issues
    res.status(500).json({
      message: "Error fetching projects: " + error.message // Provide a more descriptive error message
    });
  }
};

module.exports = {
  get_all_proj
};
