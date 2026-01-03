const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    passwordHash: {
        type: String,
        select: false,
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'projects',
    }],
    credits: {
        type: Number,
        default: 0,
    }
});

const projectsSchema = new Schema({
    name: String,
    description: String,
    architecture: {
        diagram: {
            file: String
        },
        folderStructure: {
            file: String
        }
    },
    phases: [{
        description: String,
        plan: String,
        files: [String]
    }],
    files: [{
        name: String,
        path: String
    }]
});

const User = mongoose.model('user', userSchema);
const Projects = mongoose.model('projects', projectsSchema);

module.exports = { User, Projects };