const initialState = {
    projectList: [],
    arrProject: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ProjectCyberBugReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_PROJECT' :{
        state.projectList = action.projectList;
        return {...state};
    }
    case 'GET_ALL_PROJECT' :{
        return {...state,arrProject:action.arrProject}
    }
  default:
    return {...state}
  }
}
