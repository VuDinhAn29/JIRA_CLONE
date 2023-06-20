
import { act } from "react-dom/test-utils";
import { createTaskServices } from "../../../services/CreateTaskServices";
import {  taskServices } from "../../../services/TaskServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notifiFunction } from "../../../util/notificationCyberbugs/notificationCyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { call, takeLatest,put,delay, select } from "redux-saga/effects";


function* createTaskSaga (action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  createTaskServices.createTask(action.taskObject));

        // console.log('data',data);

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

        }

        yield put({
            type: 'CLOSE_DRAWER',
        })

        notifiFunction('success','Create task successfully !');

       
     
    
        
    } catch (error) {
        console.log(error.response.data);
    }

    yield put({
        type: HIDE_LOADING
    })


} 



export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);

    
}

function* getTaskDetailSaga(action){
     try {
        const {data,status} = yield call(()=> taskServices.getTaskDetail(action.taskId));
        yield put({
            type:'GET_TASK_DETAIL',
            taskDetailModal: data.content,
        })
     } catch (error) {
        console.log(error);
     }
} 

export function* theoDoiGetTaskDetailSaga(){
    yield takeLatest('GET_TASK_DETAIL_SAGA',getTaskDetailSaga)
}

function* updateTaskStatusSaga(action){
      const {taskStatusUpdate} = action;
    try {
        const {data,status} = yield call(()=> taskServices.updateStatusTask(taskStatusUpdate));
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type :'GET_PROJECT_DETAIL',
                projectId: taskStatusUpdate.projectId
            })

            yield put({
                type:'GET_TASK_DETAIL_SAGA',
                taskId:taskStatusUpdate.taskId
            })

        }
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiUpdateTaskStatusSaga(){
      yield takeLatest('UPDATE_STATUS_TASK_SAGA',updateTaskStatusSaga)
}

function * updateTaskSaga(action){

}

export function* theoDoiUpdateTaskSaga(){
    yield takeLatest('UPDATE_TASK_SAGA',updateTaskSaga)
}


function * handleChangePostApi(action){
      //Gọi action làm thay đổi taskDetail modal
      switch(action.actionType){
          case 'CHANGE_TASK_MODAL':{
            const {name,value} = action;
              yield put({
                  type:'CHANGE_TASK_MODAL',
                  name,
                  value,
              })
        }; break;
          case 'CHANGE_ASSIGNESS':{
            const {userSelected} = action;
            yield put({
                type:'CHANGE_ASSIGNESS',
                userSelected
            })
          } break;
          case 'REMOVE_USER_ASSIGN':{
             const {userId} = action;
             yield put({
                type:'REMOVE_USER_ASSIGN',
                userId,
             })
          } break;
      }

      //Save qua api updateTaskSaga
      //Lây dữ liệu từ state.taskDetailModal 
      let {taskDetailModal} = yield select(state=>state.TaskReducer);
      console.log('taskDetailModal sau khi thay đổi', taskDetailModal)
      //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

      const listUserAsign = taskDetailModal.assigness?.map((user,index)=>{
        return user.id;
      })

      const taskUpdateApi = { ...taskDetailModal, listUserAsign }
      try {
          const { data, status } = yield call(() => taskServices.updateTask(taskUpdateApi));
  
          if (status === STATUS_CODE.SUCCESS) {
              yield put({
                type :'GET_PROJECT_DETAIL',
                projectId: taskUpdateApi.projectId
              })
  
              yield put({
                type:'GET_TASK_DETAIL_SAGA',
                taskId:taskUpdateApi.taskId
              })
          }
      } catch(err) {
          console.log(err.response?.data);
          console.log(err);
      }
}

export function* theoDoiHandleChangePostApi(){
    yield takeLatest('HANDLE_CHANGE_API_POST_SAGA',handleChangePostApi)
}