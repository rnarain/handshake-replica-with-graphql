const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobSchema = new Schema({
    companyID: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    postedDate: { type: Date, required: true },
    deadLineDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Number, required: true },
    title: { type: String, required: true },
    jobApplicants: [
        {
            studentID: { type: String, required: true },
            studentName: { type: String, required: true },
            status: { type: Number, required: true },
            applicationDate: { type: Date, required: true },
            resumeURL: { type: String, required: true }
        }
    ]
}
    ,
    {
        versionKey: false
    });


module.exports = mongoose.model('job', jobSchema);