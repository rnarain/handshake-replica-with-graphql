const Job = require("../Models/JobModel");
const createJob = async (args) => {
    var newJob = new Job({
        companyID: args.companyID,
        companyName: args.companyName,
        location: args.location,
        postedDate: new Date().toISOString(),
        deadLineDate: args.deadLineDate,
        salary: args.salary,
        description: args.description,
        category: args.category,
        title: args.title,
        jobApplicants: []
      });
  
        let savedjob = await newJob.save();
        if (savedjob) {
            return { status: 200, message: "job Created" };
        }
        else{
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    };
const changeApplicationStatus = async (args) => {
    let job = await  Job.update({ _id : args.id , 'jobApplicants.studentID' : args.studentID}, 
    { "$set": 
      {
        'jobApplicants.$.status': data.status,
      }  
    });
    if (job) {
            return { status: 200, message: "APPLICATION_STATUS_UPDATED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
};
const applyForJob = async (args) => {
    let newApplication = {
        studentID: args.studentID,
        studentName: args.name,
        status: 0,
        applicationDate: new Date().toISOString()
      }
    let job = await  Job.findById(args.jobID);
    if(job){
        job.jobApplicants.push(newApplication);
        let savedJob = await job.save();
        if (savedJob) {
                return { status: 200, message: "APPLIED_TO_JOB" };
            }
            else {
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
    else{
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};
exports.createJob = createJob;
exports.changeApplicationStatus = changeApplicationStatus;
exports.applyForJob = applyForJob;
