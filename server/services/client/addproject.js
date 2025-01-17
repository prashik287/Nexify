const projectModel = require('../../models/project');
const clientModel = require('../../models/client');  // Assuming client model is available
const mongoose = require('mongoose')
const create_project = async (userData) => {
  try {
    const { projectName, description, budgetMin, budgetMax, deadline, status, createDashboard, userid } = userData;

    // Check if all required fields are provided
    if (!projectName || !description || !budgetMin || !budgetMax || !deadline || !status || !createDashboard || !userid) {
      throw new Error("All Fields are required!");
    }

    // Fetch client data to get the companyName
    const client = await clientModel.findOne(new mongoose.Types.ObjectId(userid) );
    console.log(client)
    
    if (!client) {
      throw new Error("Client not found for the provided userid");
    }

    const companyName = client.company_name;  // Assuming `companyName` is part of the client model

    if (!companyName) {
      throw new Error("Company name not found for the provided client");
    }

    // Function to generate a random 3-digit number
    function generateRandomNumber() {
      const num1 = Math.floor(Math.random() * 10); // 0-9
      const num2 = Math.floor(Math.random() * 10); // 0-9
      const num3 = Math.floor(Math.random() * 10); // 0-9

      // Return a 3-digit string
      return `${num1}${num2}${num3}`;
    }

    // Extract the first 3 letters of the project name (if available)
    const projectPrefix = projectName.slice(0, 3).toUpperCase();  // Uppercase first 3 letters of projectName

    // Extract the first 2 letters of the company name (if available)
    const companyPrefix = companyName.slice(0, 2).toUpperCase(); // Uppercase first 2 letters of companyName

    // Generate a random 3-digit number
    const randomDigits = generateRandomNumber();

    // Combine them to create the _id (format: "PROJCO123")
    const customId = `${projectPrefix}${companyPrefix}${randomDigits}`;

    // Create a new project object
    const newProject = new projectModel({
      id: customId,  // Set the generated _id
      Project_name: projectName,
      description: description,
      Min_budget: budgetMin,
      Max_budget: budgetMax,
      deadline: deadline,
      status: status,
      dash_stat: createDashboard,
      user: userid,  // Assuming this field comes from userData
      freelancers: ""  // Assuming an empty list for freelancers initially
    });

    // Save the project (using async/await)
    await newProject.save();
    console.log("Project created successfully!");
    return newProject;

  } catch (error) {
    console.error("Error Occurred: ", error.message);
    throw new Error("Error Occurred: " + error.message);
  }
};

module.exports= {create_project};
