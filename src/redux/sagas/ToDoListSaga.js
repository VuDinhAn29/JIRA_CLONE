// redux 2 loại action:
//  Loại 1: action => object(action thường)
// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)

import Axios from "axios";
import { call, fork, put, take } from "redux-saga/effects";
import { ADD_TASKLIST_API, CHECK_TASKLIST_API, DELETE_TASKLIST_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASKLIST_API } from "../constants/ToDoListConst";
import { takeLatest } from "redux-saga/effects";
import { ToDoListService, toDoListService } from "../../services/ToDoListService";
import { delay } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

function* getTaskApiAction(action) {
    // while(true){
    // yield take('getTaskApiAction') 
    //theo dõi action => xem action nào dispatch mới làm các công việc bên dưới
    // console.log('getTaskApi');
    //call api dispatch lên reducer ...

    // }

    //put giống dispatch action
    yield put({
        type: DISPLAY_LOADING
    })

    try {  
             
            let { data, status } = yield call(toDoListService.getTaskApi);
            yield delay(1000)
            
            if(status === STATUS_CODE.SUCCESS) {
                //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
                yield put({
                    type: GET_TASK_API,
                    taskList: data
                })
            }else{
                console.log('error');
            }
        
        } catch (error) {
            console.log('error');
        }
        yield put({
            type: HIDE_LOADING
        })
}

export function*  theoDoiActionGetTaskApi(){
      yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}

/*
     5/4/2023 An viết chức năng adđTask
     action saga lấy từ danh sách api

*/

function* addTaskApiAction(action){
    const {taskName} = action;
    console.log(toDoListService);
   //Gọi api 
   try {
      let {data,status} = yield call(()=>{
        return toDoListService.addTaskApi(taskName)
    });
    console.log(data);
    if(status===STATUS_CODE.SUCCESS){
        yield put({
            type: GET_TASKLIST_API,
        })
      }
   } catch (error) {
      console.log('err');
   }
   //Hiển thị loading
   //Thành công thì load lại task => cách gọi lại action saga load taskList
    
}

export function* theoDoiActionAddTaskApi(){
    yield takeLatest(ADD_TASKLIST_API, addTaskApiAction)
}

function* deleteTaskApiAction(action){
    const {taskName} = action;

    try {
        //Gọi api deletetask
        let{data,status} = yield call(()=>{
            return toDoListService.delTaskApi(taskName)
        })
        if(status===STATUS_CODE.SUCCESS){
             //Nếu thành công thì gọi lại action GET_TASKLIST_API(action saga thực thi)
            yield put({
                type: GET_TASKLIST_API,
            })
        }
    } catch (error) {
        console.log('err');
    }
}


export function* theoDoiActionDeleteTaskApi(){
    yield takeLatest(DELETE_TASKLIST_API,deleteTaskApiAction)
}

function* checkTaskApiAction(action){
    const {taskName} = action;
    try {
        let {data,status} = yield call(()=>{
            return toDoListService.checkTaskApi(taskName)
        })
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API,
            })
        }
    } catch (error) {
        console.log('err');
    }
}

export function* theoDoiActionCheckTaskApi(){
    yield takeLatest(CHECK_TASKLIST_API,checkTaskApiAction)
}

// generator function 
function* rejectTaskApiAction(action){
    const {taskName} = action;
    try {
        let {data,status} = yield call(()=>{
            return toDoListService.rejectTask(taskName)
        })
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API,
            })
        }
    } catch (error) {
        console.log('err');
    }
}

export function* theoDoiActionRejectTaskApi(){
    yield takeLatest(REJECT_TASKLIST_API,rejectTaskApiAction)
}