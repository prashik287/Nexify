const mongoose = require('mongoose');
const { Schema } = mongoose;
const Decimal128 = mongoose.Schema.Types.Decimal128;

// Define the project schema
const projectSchema = new Schema({
    id: { type: String, required: true, unique:true },  // Ensure _id is a String
    Project_name: { type: String, required: true },
    description: { type: String, required: true },
    Min_budget: { type: Decimal128, required: true },
    Max_budget: { type: Decimal128, required: true },
    status: {
        type: String,
        enum: ['open', 'Inprogress'],
        default: 'open',
    },
    deadline: { type: String, required: true },
    dash_stat: {
        type: String,
        enum: ['yes', 'no'],
        default: 'yes',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  // This is a reference to the Client model
        ref: 'client',  // Make sure you have the 'Client' model defined elsewhere
        required: true,  // Ensuring that a project must have a client assigned
    },
    freelancers:{
        type:[String]
    }
});

// Create the Project model
const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;
