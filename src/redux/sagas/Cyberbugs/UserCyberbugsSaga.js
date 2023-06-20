
import { call, fork, put, takeLatest,delay, select } from "redux-saga/effects";
import { USER_SIGNIN_API, USLOGIN } from "../../constants/Cyberbugs/CyberbugsReducer";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { cyberbugsService } from "../../../services/CyberbugService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { userService } from "../../../services/UseServices";

import { notifiFunction } from '../../../util/notificationCyberbugs/notificationCyberbugs';


//Quản lý các action saga

function * signinSaga(action) {
    // console.log(action);
    // yield put({
    //     type: DISPLAY_LOADING
    // })
    // yield delay (500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => { return cyberbugsService.signinCyberBugs(action.userLogin)});
    //     //Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN,data.content.accessToken);
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content));    
        // console.log(data);

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        let history = yield select(state=>state.HistoryReducer.history);

        history.push('/projectmanagement');
 
    }catch(err){ 
        console.log(err)
    }

    // let res = yield call(()=>{
    //     return Axios({
    //         url:'http://casestudy.cyberlearn.vn/api/Users/signin',
    //         method:'POST'
    //     })
    // })

    // console.log('res',res);

    
    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function * theoDoiSignin(){
    yield takeLatest(USER_SIGNIN_API,signinSaga)
}


function* signUpSaga(action){
    try {
        const {data,status} = yield call(()=>{return userService.signUpUser(action.userDetails)})
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success', 'Create user successfully !')
        }
    } catch (error) {
        console.log(error);
        notifiFunction('error', error.response?.data.message)
    }
}

export function * theoDoiSignUpSaga(){
    yield takeLatest('SIGN_UP_USER_SAGA',signUpSaga)
}

//get user

function* getUserSaga(action) {
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  userService.getUser(action.keyWord));

       
            console.log(data);
            yield put({
                type:'GET_USER_SEARCH',
                lstUserSearch: data.content
            })
    
       
        
    } catch (error) {
        console.log('err');
    }


} 





export function* theoDoiGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);

    
}

// assignUser 

function* addUserProjectSaga(action) {
    // console.log('1',action.userProject);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  userService.assignUserProject(action.userProject));
            
            yield put({
                type:'GET_LIST_PROJECT_SAGA'
            })
            
    
       
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoiAddUserProjectSaga() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);

    
}

// removeUser 

function* removeUserProjectSaga(action) {
    console.log('1',action.userProject);
    try {
         //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() =>  userService.deleteUserFromProject(action.userProject));
        
            yield put({
                type:'GET_LIST_PROJECT_SAGA'
            })
            
    
       
        
    } catch (error) {
        console.log('err');
    }


} 



export function* theoDoiRemoveUserProjectSaga() {
    yield takeLatest('REMOVE_USER_PROJECT_API', removeUserProjectSaga);

    
}




function* getUserByProjectIdSaga(action) {
    try {
        const { data, status } = yield call(() =>  userService.getUserByProjectId(action.idProject));
        console.log('checkdata',data);
        
        if(status===STATUS_CODE.SUCCESS) {
                yield put({
                    type:'GET_USER_BY_PROJECT_ID',
                    arrUSer: data.content,
                })

        }
            
    
       
        
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type:'GET_USER_BY_PROJECT_ID',
                arrUSer:[]
            })
        }
    }

} 



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest('GET_USER_BY_PROJECT_ID_SAGA', getUserByProjectIdSaga);

    
}


function* getListUserSaga(action){
    try {
         const {data,status} = yield call(()=> userService.getUser(""));

         if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:'GET_LIST_USER',
                listUser: data.content
            })
         }
    } catch (error) {
        console.log('err',error);
    }
}

export function* theoDoiGetListUserSaga(){
    yield takeLatest('GET_LIST_USER_SAGA',getListUserSaga)
}

function* editUserSaga(action){
    try {
        const {data,status} = yield call(()=>userService.editUser(action.userDetails));
       
        if(status===STATUS_CODE.SUCCESS){
         
                notifiFunction('success', 'Edit User successfully !')
                yield put({
                    type:'CLOSE_DRAWER'
                })
                yield put({
                    type: 'GET_LIST_USER_SAGA'
                })
        }
    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiEditUserSaga(){
     yield takeLatest('EDIT_USER_SAGA',editUserSaga)
}

function* deleteUserSaga(action){
    try {
        const {data,status} = yield call(()=>userService.deleteUser(action.IdUser));
        if(status===STATUS_CODE.SUCCESS){
            notifiFunction('success', 'Delete User successfully !')
            yield put({
                type: 'GET_LIST_USER_SAGA'
            })
        }
    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiDeleteUserSaga(){
    yield takeLatest('DELETE_USER_SAGA',deleteUserSaga);
}

function* searchUserSaga(action){
    try {
       const {data,status} = yield call(()=>userService.getUser(action.keyWord));
       if(status===STATUS_CODE.SUCCESS){
            yield put({
                type: 'GET_LIST_USER',
                listUser: data.content
                
            })
       } 
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiSearchUserSaga(){
    yield takeLatest('SEARCH_USER_SAGA',searchUserSaga);
}
