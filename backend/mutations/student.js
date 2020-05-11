const Student = require("../Models/StudentModel");
const addStudent = async (args) => {
    var newStudent = new Student({
    fname: args.fname,
    lname: args.lname,
    email: args.email,
    password: args.password,
    phone: null,
    dob: null,
    skills: null,
    careerObjective: null,
    profilePicURL: null,
    education: {
      college: args.college,
      yearOfPassing: null,
      major: null,
      yearOfStarting: null,
      gpa: 0,
      degreeType: null
    },
    experience:
    {
      company: null,
      location: null,
      startDate: null,
      endDate: null,
      title: null,
      description: null
    }
    });
  
      let student = await Student.findOne({ email: args.email });
        if (student) {
          return { status: 400, message: "User Already Exists" };
        }
        else {
            let savedStudent = await newStudent.save();
            if (savedStudent) {
                return { status: 200, message: "Student Created" };
            }
            else{
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            }
        }
    };
    const updateStudentName = async (args) => {
        let student = await Student.findById(args.id);
        if (student) {
            student.fname = args.fname;
            student.lname = args.lname;
            let savedStudent = await student.save();
            if (savedStudent) {
                return { status: 200, message: "NAME_UPDATED" };
            }
            else {
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            }
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    };
    const updateObjective = async (args) => {
        let student = await Student.findById(args.id);
        if (student) {
            student.careerObjective = args.careerObjective;
            let savedStudent = await student.save();
            if (savedStudent) {
                return { status: 200, message: "OBJECTIVE_UPDATED" };
            }
            else {
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            }
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    };
    const updateEducation = async (args) => {
        let student = await Student.findById(args.id);
        if (student) {
            student.college = args.college;
            student.major = args.major;
            student.yearOfStarting = args.yearOfStarting;
            student.yearOfPassing = args.yearOfPassing;
            student.gpa = args.gpa;
            student.degreeType = args.degreeType;
            let savedStudent = await student.save();
            if (savedStudent) {
                return { status: 200, message: "Education_UPDATED" };
            }
            else {
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            }
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    };
    const updateExperience = async (args) => {
        let student = await Student.findById(args.id);
        if (student) {
            student.company = args.company;
            student.location = args.location;
            student.startDate = args.startDate;
            student.endDate = args.endDate;
            student.title = args.title;
            student.description = args.description;
            let savedStudent = await student.save();
            if (savedStudent) {
                return { status: 200, message: "Education_UPDATED" };
            }
            else {
                return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            }
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }

exports.addStudent = addStudent;
exports.updateStudentName = updateStudentName;
exports.updateObjective = updateObjective;
exports.updateEducation = updateEducation;
exports.updateExperience = updateExperience;