const graphql = require('graphql');
const Student = require("../Models/StudentModel");
const Company = require("../Models/CompanyModel");
const { addStudent , updateStudentName ,updateSkills ,
     updateEducation , updateExperience , updateObjective , updateAccountInfo } = require("../mutations/student")
const { updateCompanyDetails } = require("../mutations/company")
const { applyForJob , changeApplicationStatus , createJob , } = require("../mutations/job")

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        dob: { type: GraphQLString },
        skills: { type: GraphQLString },
        careerObjective: { type: GraphQLString },
        profilePicURL: { type: GraphQLString },
        education: { type: EducationType },
        experience: { type: ExperienceType }
    })
});
const EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        college : { type: GraphQLString },
        major : {type: GraphQLString},
        yearOfStarting : { type: GraphQLString },
        yearOfPassing : { type: GraphQLString },
        gpa : { type: GraphQLString },
        degreeType : {type: GraphQLString}
    })
});
const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        company : { type: GraphQLString },
        location : { type: GraphQLString },
        startDate : { type: GraphQLString },
        endDate : { type: GraphQLString },
        title : { type: GraphQLString },
        description :{ type: GraphQLString } 
    })
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        email : { type: GraphQLString },
        phone : { type: GraphQLString },
        password : { type: GraphQLString },
        name : { type: GraphQLString },
        city : { type: GraphQLString },
        description : { type: GraphQLString },
        profilePicURL : { type: GraphQLString },
    })
});

const JobType = new GraphQLObjectType({
    name: 'Job',
    fields: () => ({
        id: { type: GraphQLString },
        companyID: { type: GraphQLString },
        companyName: { type: GraphQLString },
        location: { type: GraphQLString },
        postedDate: { type: GraphQLString },
        deadLineDate: { type: GraphQLString },
        salary: {type: GraphQLInt},
        description: { type: GraphQLString },
        category: {type: GraphQLInt},
        title: { type: GraphQLString },
        jobApplicants: {
                        type: new GraphQLList(JobApplicantType),
                        resolve(parent, args) {
                            return parent.jobApplicants;
                        }
                    }
    })
});
const JobApplicantType = new GraphQLObjectType({
    name: 'JobApplicant',
    fields: () => ({
            studentID: { type: GraphQLString },
            studentName: { type: GraphQLString },
            status: {type: GraphQLInt},
            applicationDate: { type: GraphQLString },
            resumeURL: { type: GraphQLString }
    })
});



const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: StudentType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let student = await Student.findById(args.id);
                if (student) {
                    return student;
                }
            }
        },
        students:{
            type: new GraphQLList(StudentType),
            args: { },
            async resolve(parent, args) {
                let students = await Student.find({ });
                return students;
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let company = await Company.findById(args.id);
                if (company) {
                    return company;
                }
            }
        },
        loginCompany: {
            type: CompanyType,
            args: { 
                email: { type: GraphQLString },
                password: {type: GraphQLString} 
            },
            async resolve(parent, args) {
                let company = await Company.findOne({email : args.email , password: args.password});
                if (company) {
                    return company;
                }
            }
        },
        jobsByStudentID: {
            type: JobType,
            args: { 
                id : { type: GraphQLString }
            },
            async resolve(parent, args) {
                let jobs = await Job.find({ 'jobApplicants.studentID': { $ne: args.id } });
                if (jobs) {
                    return jobs;
                }
            }
        },
        jobsByCompanyID: {
            type: JobType,
            args: { 
                id : { type: GraphQLString }
            },
            async resolve(parent, args) {
                let jobs = await Job.find({'companyID': args.id });
                if (jobs) {
                    return jobs;
                }
            }
        },
        applicantListByJobID: {
            type: JobType,
            args: { 
                id : { type: GraphQLString }
            },
            async resolve(parent, args) {
                let jobs = await Job.findById(args.id);
                if (jobs) {
                    return jobs.jobApplicants;
                }
            }
        },
        appliedJobsByStudentID: {
            type: JobType,
            args: { 
                id : { type: GraphQLString }
            },
            async resolve(parent, args) {
                let jobs = await Job.find({'jobApplicants.studentID' :args.id});
                if (jobs) {
                    return jobs;
                }
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: StudentType,
            args: { 
                email: { type: GraphQLString },
                password: {type: GraphQLString} 
            },
            async resolve(parent, args) {
                let student = await Student.findOne({email : args.email , password: args.password});
                if (student) {
                    return student;
                }
            }
        },
        companyLogin: {
            type: CompanyType,
            args: { 
                email: { type: GraphQLString },
                password: {type: GraphQLString} 
            },
            async resolve(parent, args) {
                let company = await Company.findOne({email : args.email , password: args.password});
                if (company) {
                    return company;
                }
            }
        },
        addStudent: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                college: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                return addStudent(args);
            }
        },
        updateStudentName: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateStudentName(args);
            }
        },
        updateObjective: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                careerObjective: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateObjective(args);
            }
        },
        updateAccountInfo: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateAccountInfo(args);
            }
        },
        updateSkills: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                skills: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateSkills(args);
            }
        },

        updateEducation: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                college: { type: GraphQLString },
                major: { type: GraphQLString },
                yearOfStarting: { type: GraphQLString },
                yearOfPassing: { type: GraphQLString },
                gpa: { type: GraphQLString },
                degreeType: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return updateEducation(args);
            }
        },
        updateExperience: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                company: { type: GraphQLString },
                location: { type: GraphQLString },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return updateExperience(args);
            }
        },
        updateCompanyDetails: {
            type: StatusType,
            args: {
                id : {type: GraphQLString},
                name: { type: GraphQLString },
                city: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return updateCompanyDetails(args);
            }
        },
        createJob: {
            type: StatusType,
            args: {
                companyID: { type: GraphQLString },
                companyName: { type: GraphQLString },
                location: { type: GraphQLString },
                postedDate: { type: GraphQLString },
                deadLineDate: { type: GraphQLString },
                salary: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                title: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return createJob(args);
            }
        },
        changeApplicationStatus: {
            type: StatusType,
            args: {
                id: { type: GraphQLString },
                status: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                return changeApplicationStatus(args);
            }
        },
        applyForJob: {
            type: StatusType,
            args: {
                jobID : {type: GraphQLString},
                studentID: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return applyForJob(args);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});