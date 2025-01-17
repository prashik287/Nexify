const project = require('../../models/project');
const mongoose = require('mongoose');

const get_project = async (userData) => {
    const { client_id } = userData;

    if (!client_id) {
        throw new Error("Client ID is required");
    }

    try {
        const projects = await project.find({ user: new mongoose.Types.ObjectId(client_id) });

        if (!projects || projects.length === 0) {
            throw new Error("No projects found for the given client ID");
        }

        return projects;
    } catch (error) {
        throw new Error("Error while fetching projects: " + error.message);
    }
};

const get_assigned = async (userData) => {
    try {
        const { client_id } = userData;
        if (!client_id) {
            throw new Error("Client ID is required");
        }

        const projects = await project.find({
            user: new mongoose.Types.ObjectId(client_id),
        });

        const filteredProjects = projects.filter(project =>
            project.freelancers && project.freelancers.some(freelancer => freelancer.trim() !== '')
        );

        if (!filteredProjects || filteredProjects.length === 0) {
            throw new Error("No projects found for the given client ID with freelancers assigned");
        }

        return filteredProjects;
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        throw new Error(error.message || "An error occurred while fetching assigned projects");
    }
};

const get_unsigned = async (userData) => {
    try {
        const { client_id } = userData;
        if (!client_id) {
            throw new Error("Client ID is required");
        }

        const projects = await project.find({
            user: new mongoose.Types.ObjectId(client_id),
            freelancers: ['']
        });

        if (!projects) {
            throw new Error("No Unassigned Projects found");
        }

        console.log(projects);
        return projects;
    } catch (error) {
        throw new Error("Error Occurred: " + error.message);
    }
};

const get_id = async (userData) => {
    const { projectid } = userData;
    console.log(userData)
    if (!projectid) {
        throw new Error("ProjectID not found");
    }

    try {
        const projecti = await project.findOne({ id: projectid });
        console.log(projecti);
        return projecti;
    } catch (error) {
        console.log(error);
        throw new Error(`Error Occurred: ${error.message}`);
    }
};

module.exports = { get_project, get_assigned, get_unsigned, get_id };
