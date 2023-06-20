const initialState = {
    listComment: [
        {
            "user": {
              "userId": 4966,
              "name": "ab",
              "avatar": "https://ui-avatars.com/api/?name=ab"
            },
            "id": 8809,
            "userId": 4966,
            "taskId": 9887,
            "contentComment": "hi2",
            "deleted": false,
            "alias": "bfmopwcnkb9mdbsrxifk7a=="
          }
    ]
}

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'GET_ALL_COMMENT':{
          state.listComment = action.listComment
      return {...state}
  }


  default:
    return {...state}
  }
}
