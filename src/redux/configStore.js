import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer'
import {ModalReducer} from './reducers/ModalReducer'
import reduxThunk from 'redux-thunk'

//middleware saga
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './sagas/rootSaga';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import HistoryReducer from './reducers/HistoryReducer';
import { UserLoginCyberBugsReducer } from './reducers/UserCyberBugReducer';
import { ProjectCyberBugReducer } from './reducers/ProjectCyberBugReducer';
import DrawerCyberbugsReducer from './reducers/DrawerCyberbugsReducer';
import { projectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';
import { CommentReducer } from './reducers/CommentReducer';

const middleWareSaga = createSagaMiddleware();



const rootReducer = combineReducers({
    //reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    ProjectCategoryReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCyberBugReducer,
    DrawerCyberbugsReducer,
    projectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer,
})



const store = legacy_createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);




export default store;


