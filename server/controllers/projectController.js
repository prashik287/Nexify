const addprojectService = require('../services/client/addproject');
const searcProjectService = require('../services/client/showproject');
const projectupdate = require('../services/client/updateproject')
const create_project1 = async (req, res) => {
    try {
        const userData = req.body;
        const project = await addprojectService.create_project(userData);
        res.status(200).json({ message: "New Project Created Successfully", project });
    } catch (error) {
        console.error("Error Occurred During Project Creation:", error.message);
        res.status(400).json({ message: error.message });
    }
};

const get_projects = async (req, res) => {
    try {
        const userData = req.body;
        const projects = await searcProjectService.get_project(userData);
        console.log(projects);
        res.status(200).json({
            message: "Projects Search Success",
            projects: projects
        });
    } catch (error) {
        console.error("Error Occurred:", error.message);
        res.status(404).json({ message: error.message });
    }
};

const get_assigned_proj = async (req, res) => {
    try {
        const userData = req.body;
        const projects = await searcProjectService.get_assigned(userData);
        
        if (!projects || projects.length === 0) {
            return res.status(404).json({
                message: "No projects found for the given client ID with freelancers assigned"
            });
        }

        res.status(200).json({
            message: "Search Successful",
            projects: projects
        });
    } catch (error) {
        console.error("Error Occurred:", error.message);
        res.status(500).json({
            message: error.message || "An error occurred while fetching assigned projects"
        });
    }
};

const get_unassigned = async (req, res) => {
    try {
        const userData = req.body;
        const projects = await searcProjectService.get_unsigned(userData);
        console.log(projects);
        res.status(200).json({
            message: "Unassigned Projects Found",
            projects: projects
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(404).json({
            message: "No Unassigned Projects Found"
        });
    }
};

const get_with_id = async (req, res) => {
    try {
            
        console.log(req.body);
        const userData = req.body           
        const projects = await searcProjectService.get_id(userData);
        console.log(projects);
        res.status(200).json({
            message: "Project Searched",
            project: projects
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(404).json({
            message: error.message
        });
    }
};



const project_update = async(req,res)=>{
    try {
        const userData = req.body
        const projects = await projectupdate.updateProject(userData)
        res.status(200).json({
            message :"Record Updated Successfully",
            projects:projects
        })
    } catch (error) {
        console.error("Error:",error.message)
        res.status(404).json({
            message: error.message
        })
    }
}


const return_freelance=async(req,res)=>{
    try {
        const userData = req.body
        const freelance = await projectupdate.get_freelancer(userData)
        res.status(200).json({
            freelancer:freelance                        
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

const remove_freelance = async(req,res)=>{
    try {
        const userData = req.body
        const updated_pro = await projectupdate.delete_freelancer(userData)
        res.status(200).json({
            message:"Freelancer Removed Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}
module.exports = { create_project1, get_projects, get_assigned_proj, get_unassigned, get_with_id, project_update,return_freelance,remove_freelance};
        