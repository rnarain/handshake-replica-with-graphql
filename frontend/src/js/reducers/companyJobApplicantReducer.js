import { CHANGE_APPLICATION_STATUS} from '../constants/action-types';

  const initialState = {
    applicationStatus : {
        id : null,
        status : null,
        studentID : null
    }
  };
  
  function companyJobApplicantReducer(state = initialState, action) {
      if(action.type === CHANGE_APPLICATION_STATUS){
        return Object.assign({}, state, {
            applicationStatus: action.payload,
        });
      }
      return state;
  }
  
export default companyJobApplicantReducer;