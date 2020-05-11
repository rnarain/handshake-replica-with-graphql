import { combineReducers } from 'redux';
import  studentProfileReducer  from './studentProfileReducer';
import  jobSearchReducer  from './jobSearchReducer';
import  studentMessageReducer  from './studentMessageReducer';
import  companyMessageReducer  from './companyMessageReducer';
import  companyJobApplicantReducer  from './companyJobApplicantReducer';






export default combineReducers({
    studentProfileReducer,
    jobSearchReducer,
    studentMessageReducer,
    companyMessageReducer,
    companyJobApplicantReducer
});