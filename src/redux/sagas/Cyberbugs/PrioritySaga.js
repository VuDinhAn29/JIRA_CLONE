
import { call } from "redux-saga/effects";
import { takeLatest,put } from "redux-saga/effects";
import { priorityServices } from "../../../services/PriorityServices";


function* getAllPrioritySaga (action) {
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  priorityServices.getAllPriority());

        // console.log('data',data);

        yield put({
            type: 'GET_ALL_PRIORITY',
            arrPriority: data.content,
        })

       
     
    
        
    } catch (error) {
         console.log(error);
    }



} 



export function* theoDoiGetAllPrioritySaga () {
    yield takeLatest('GET_ALL_PRIORITY_SAGA', getAllPrioritySaga );

    
}