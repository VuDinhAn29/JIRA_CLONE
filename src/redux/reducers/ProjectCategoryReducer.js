import { GET_ALL_PROJECT_CATEGORY } from "../constants/Cyberbugs/CyberbugsReducer";

const stateDefault = {
    arrProjectCategory: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {
  switch (action.type) {
      
    case GET_ALL_PROJECT_CATEGORY : {
        state.arrProjectCategory = action.data;
    }

  default:
    return {...state};
  }
}

