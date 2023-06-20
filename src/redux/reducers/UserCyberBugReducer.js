import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs/CyberbugsReducer";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin : usLogin,
    userSearch: [],
    arrUSer: [],  //Array user cho the select create task
    listUser:[],
    userEdit:{}

}

export const UserLoginCyberBugsReducer = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }

        case 'GET_USER_SEARCH': {
            state.userSearch = action.lstUserSearch;
            return {...state};
        }

        case 'GET_USER_BY_PROJECT_ID' :{
            return {...state,arrUSer:action.arrUSer}
        }

        case 'GET_LIST_USER' :{
            return {...state,listUser:action.listUser}
        }
        
        case 'EDIT_USER': {
            return {...state,userEdit:action.userEdit}
        }

        default : return {...state};
    }
}