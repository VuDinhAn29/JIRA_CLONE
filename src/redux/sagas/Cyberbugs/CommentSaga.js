
import { commentService } from "../../../services/CommentService";
import { call, put,takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../../util/constants/settingSystem";



function * getAllCommentSaga(action){
    try {
        const {data,status} = yield call(()=>commentService.getAllComment(action.taskId));
        if(status===STATUS_CODE.SUCCESS){
             yield put({
                type:'GET_ALL_COMMENT',
                listComment:data.content
             })
        }
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiGetAllCommentSaga(){
    yield takeLatest('GET_ALL_COMMENT_SAGA',getAllCommentSaga)
}

function * insertCommentSaga(action){
    try {
        const {data,status} = yield call(()=>commentService.insertComment(action.newComment));

    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiInsertComment(){
    yield takeLatest('INSERT_COMMENT_SAGA',insertCommentSaga)
}

function *updateCommentSaga(action){
    try {
        const {data,status} = yield call(()=>commentService.updateComment(action.commentId,action.commentContent));
          if(status===STATUS_CODE.SUCCESS){
              yield put({
                  type:'GET_ALL_COMMENT_SAGA',
                  taskId: action.taskId
              })

          }
       
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiUpdateCommentSaga(){
    yield takeLatest('UPDATE_COMMENT_SAGA',updateCommentSaga)
}

function *deleteCommentSaga(action){
    try {
        const {data,status} = yield call(()=>commentService.deleteComment(action.idComment));
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:'GET_ALL_COMMENT_SAGA',
                taskId: action.taskId
            })

        }
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiDeleteCommentSaga(){
    yield takeLatest('DELETE_COMMENT_SAGA',deleteCommentSaga);
}