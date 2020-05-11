import { gql } from 'apollo-boost';

const studentLoginMutation = gql`
    mutation login( $email :String, $password: String){
        login(email: $email, password: $password){
            id
        }
    }
`;

const companyLoginMutation = gql`
    mutation companyLogin( $email :String, $password: String){
        companyLogin(email: $email, password: $password){
            id
        }
    }
`;

const updateStudentNameMutation = gql`
    mutation updateStudentName( $id :String, $fname: String , $lname: String){
        updateStudentName(id :$id , fname: $fname ,lname : $lname ){
            message
            status
        }
    }
`;
const updateObjectiveMutation = gql`
    mutation updateObjective( $id :String, $careerObjective: String){
        updateObjective(id :$id , careerObjective: $careerObjective){
            message
            status
        }
    }
`;
const updateAccountInfoMutation = gql`
    mutation updateAccountInfo( $id :String, $phone: String ,$email: String  ){
        updateAccountInfo(id :$id , phone: $phone , email:$email){
            message
            status
        }
    }
`;

const updateSkillsMutation = gql`
    mutation updateSkills( $id :String, $skills: String){
        updateSkills(id :$id , skills: $skills ){
            message
            status
        }
    }
`;
const updateEducationMutation = gql`
    mutation updateEducation( $id :String, $college: String , $major: String , $yearOfStarting :String,$yearOfPassing : String , $gpa : String , $degreeType : String ){
        updateEducation(id :$id , college: $college ,major : $major , yearOfStarting:  $yearOfStarting , yearOfPassing: $yearOfPassing ,gpa :$gpa ,degreeType : $degreeType  ){
            message
            status
        }
    }
`;
const updateExperienceMutation = gql`
    mutation updateExperience( $id :String, $company: String , $location: String , $startDate :String,$endDate : String , $title : String , $description : String ){
        updateExperience(id :$id , company: $company ,location : $location , startDate:  $startDate , endDate: $endDate ,title :$title ,description : $description  ){
            message
            status
        }
    }
`;
const updateCompanyDetailsMutation = gql`
    mutation updateCompanyDetails( $id :String, $name: String , $city: String , $email :String, $phone : String ){
        updateCompanyDetails(id :$id , name: $name ,city : $city , email:  $email , phone: $phone  ){
            message
            status
        }
    }
`;

const createJobMutation = gql`
    mutation createJob( $companyID :String, $companyName: String , $location: String , $postedDate :String,$deadLineDate : String , $salary : String , $description : String , $category : String  , $title : String ){
        createJob(companyID :$companyID , companyName: $companyName ,location : $location , postedDate:  $postedDate , deadLineDate: $deadLineDate ,salary :$salary ,description : $description ,category : $category ,title : $title  ){
            message
            status
        }
    }
`;

const changeApplicationStatusMutation = gql`
    mutation changeApplicationStatus( $id :String, $status: String){
        changeApplicationStatus(id :$id , status: $status){
            message
            status
        }
    }
`;

const applyForJobMutation = gql`
    mutation applyForJob( $jobID :String, $studentID: String , $name: String){
        applyForJob(jobID :$jobID , studentID: $studentID ,name : $name ){
            message
            status
        }
    }
`;

export {studentLoginMutation , companyLoginMutation , updateStudentNameMutation, 
    updateObjectiveMutation , updateAccountInfoMutation ,updateSkillsMutation ,
    updateEducationMutation , updateExperienceMutation ,updateCompanyDetailsMutation ,
    changeApplicationStatusMutation , applyForJobMutation , createJobMutation};
