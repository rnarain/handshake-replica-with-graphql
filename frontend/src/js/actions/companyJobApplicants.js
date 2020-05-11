import { CHANGE_APPLICATION_STATUS} from "../constants/action-types";
    
    export function changeApplicationStatus(payload) {
      console.log("dispatching the changeApplicationStatus action")
      return { type: CHANGE_APPLICATION_STATUS, payload };
    }
