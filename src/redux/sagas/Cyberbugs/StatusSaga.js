import { call, put } from "redux-saga/effects";
import { statusServices } from "../../../services/StatusServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { takeLatest } from "redux-saga/effects";



function * getAllStatusSaga(action) {
    try {
        const {data,status} = yield call( () => statusServices.getAllStatus());
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_ALL_STATUS',
                arrStatus : data.content,
            })
        }
    } catch (error) {
        
    }
}

export function *theoDoiGetAllStatusSaga(){
    yield takeLatest('GET_ALL_STATUS_SAGA',getAllStatusSaga)
}