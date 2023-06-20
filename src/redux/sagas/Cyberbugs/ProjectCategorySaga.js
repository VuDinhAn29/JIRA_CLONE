import { takeLatest, call, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs/CyberbugsReducer";





function* getAllProjectCategorySaga(action) {
    // console.log(action);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  cyberbugsService.getAllProjectCategory() );

        // Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }
      
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoigetAllProjectCategorySaga() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}