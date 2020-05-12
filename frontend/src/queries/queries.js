import { gql } from 'apollo-boost';

const studentQuery = gql`
    query($id: String){
        student(id: $id) {
            fname,
            lname,
            email,
            password,
            phone,
            dob,
            skills,
            careerObjective,
            profilePicURL,
            education{
                college,
                major,
                yearOfStarting ,
                yearOfPassing ,
                gpa ,
                degreeType
            },
            experience{
                company,
                location,
                startDate,
                endDate,
                title,
                description
            }
        }
    }
`;

const studentsQuery = gql`
    query{
        students{
            id
            fname,
            lname,
            email,
            password,
            phone,
            dob,
            skills,
            careerObjective,
            profilePicURL,
            education{
                college,
                major,
                yearOfStarting ,
                yearOfPassing ,
                gpa ,
                degreeType
            },
            experience{
                company,
                location,
                startDate,
                endDate,
                title,
                description
            }
        }
    }
`;

const jobsByStudentIDQuery = gql`
    query($id: String){
        jobsByStudentID(id: $id) {
            id
            companyID
            companyName
            location
            postedDate
            deadLineDate
            salary
            description
            category
            title
        }
    }
`;

const jobsByCompanyIDQuery = gql`
    query($id: String){
        jobsByCompanyID(id: $id) {
            id
            companyID
            companyName
            location
            postedDate
            deadLineDate
            salary
            description
            category
            title
        }
    }
`;


const companyQuery = gql`
    query($id: String){
        company(id: $id) {
            email
            phone
            password
            name
            city
            description
            profilePicURL
        }
    }
`;

const appliedJobsByStudentIDQuery = gql`
    query($id: String){
        appliedJobsByStudentID(id: $id) {
            id
            title
            companyID
            companyName
            category
            jobApplicants{
                studentID
                status
                applicationDate
            }
        }
    }
`;

const applicantListByJobIDQuery = gql`
    query($id: String){
        applicantListByJobID(id: $id) {
            studentID
            studentName
            status
            applicationDate
        }
    }
`;


export { studentQuery , studentsQuery , jobsByCompanyIDQuery ,
    companyQuery , jobsByStudentIDQuery , appliedJobsByStudentIDQuery ,
    applicantListByJobIDQuery};