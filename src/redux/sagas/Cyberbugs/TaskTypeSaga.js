
import { call } from "redux-saga/effects";
import { takeLatest,put } from "redux-saga/effects";
import { taskTypeServices } from "../../../services/TaskTypeServices";


function* getAllTaskTypeSaga (action) {
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  taskTypeServices.getAllTaskType());

        // console.log('data',data);

        yield put({
            type: 'GET_ALL_TASK_TYPE',
            arrTaskType: data.content,
        })

       
     
    
        
    } catch (error) {
         console.log(error);
    }



} 



export function* theoDoigetAllTaskTypeSaga () {
    yield takeLatest('GET_ALL_TASK_TYPE_SAGA', getAllTaskTypeSaga );

    
}