import { takeLatest, call, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs/CyberbugsReducer";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { delay } from "redux-saga/effects";
import {history} from "../../../util/history"
import { projectService } from "../../../services/ProjectServices";
import { notifiFunction } from "../../../util/notificationCyberbugs/notificationCyberbugs";
import { userService } from "../../../services/UseServices";






function* createProjectSaga(action) {
    yield put({
        type: HIDE_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  cyberbugsService.createProjectAuthorization(action.newProject));

        // Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
           
            history.push("/projectmanagement");
        }
      
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);

    
}


//Saga dùng để get all project từ api

// eslint-disable-next-line require-yield
function* getListProjectSaga(action){
    try {
        const {data,status} = yield call(()=> cyberbugsService.getAllProject());

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: 'GET_LIST_PROJECT',
                projectList : data.content,
            })
        }
    } catch (error) {
        
    }
}

export function* theoDoiGetListProjectSaga(){
    yield takeLatest('GET_LIST_PROJECT_SAGA',getListProjectSaga)
}

//Update project

function* updateProjectSaga(action) {
    yield put({
        type: HIDE_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  cyberbugsService.updateProject(action.projectUpdate));

        // Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
          
            // history.push("/projectmanagement");
        }
        yield put({
            type:'GET_LIST_PROJECT_SAGA'
        })

        yield put({
            type:'CLOSE_DRAWER'
        })
    
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);

    
}


//delete project

function* deleteProjectSaga(action) {
    console.log(action);
    yield put({
        type: HIDE_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  projectService.deleteProject(action.IdProject));

        // Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
            // history.push("/projectmanagement");
            notifiFunction('success','Delete project successfully !')
        }
        else {
            notifiFunction('error','Delete project fail !')
        }
        yield put({
            type:'GET_LIST_PROJECT_SAGA'
        })
        
        yield put({
            type:'CLOSE_DRAWER'
        })
     
    
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoiDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);

    
}

//get project detail

function* getProjectDetailSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  projectService.getProjectDetail(action.projectId));

        // console.log('data',data);

        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content,
        })

       
     
    
        
    } catch (error) {
        console.log('404 not foud!');
        history.push('/projectmanagement')
    }

    yield put({
        type: HIDE_LOADING
    })


} 



export function* theoDoiGetProjectDetailSaga() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);

    
}

//get all project

function* getProjectAllSaga(action) {
    
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  projectService.getAllProject());

        // console.log('data',data);

        yield put({
            type: 'GET_ALL_PROJECT',
            arrProject: data.content,
        })

        yield put({
            type:'GET_USER_BY_PROJECT_ID_SAGA',
            idProject:data.content[0].id
        })
     
    
        
    } catch (error) {
        console.log('404 not foud!');
        history.push('/projectmanagement')
    }

    yield put({
        type: HIDE_LOADING
    })


} 



export function* theoDoiGetProjectAllSaga() {
    yield takeLatest('GET_ALL_PROJECT_SAGA', getProjectAllSaga);

    
}
