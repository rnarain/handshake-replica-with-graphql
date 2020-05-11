import { SEND_MESSAGE,SET_MESSAGE} from "../constants/action-types";
    
    export function setMessages(payload) {
      console.log("dispatching the setMessages action")
      return { type: SET_MESSAGE, payload };
    }

    export function sendMessage(payload) {
        console.log("dispatching the sendMessage action")
        return { type: SEND_MESSAGE, payload };
      }
    