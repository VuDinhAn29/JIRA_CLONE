import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga'
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategory from './Cyberbugs/ProjectCategorySaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga  from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga  from "./Cyberbugs/PrioritySaga";

import * as CreateTaskSaga  from "./Cyberbugs/CreateTaskSaga";
import * as StatusSaga  from "./Cyberbugs/StatusSaga";

import * as CommentSaga  from "./Cyberbugs/CommentSaga";


export function * rootSaga(){
   
    yield all([
       ToDoListSaga.theoDoiActionGetTaskApi(),
       ToDoListSaga.theoDoiActionAddTaskApi(),
       ToDoListSaga.theoDoiActionDeleteTaskApi(),
       ToDoListSaga.theoDoiActionCheckTaskApi(),
       ToDoListSaga.theoDoiActionRejectTaskApi(),
       
       //Nghiệp vụ cyberbugs.....
       Cyberbugs.theoDoiSignin(),
       Cyberbugs.theoDoiGetUser(),
       Cyberbugs.theoDoiAddUserProjectSaga(),
       Cyberbugs.theoDoiRemoveUserProjectSaga(),
       Cyberbugs.theoDoiGetUserByProjectIdSaga(),
       Cyberbugs.theoDoiSignUpSaga(),
       Cyberbugs.theoDoiGetListUserSaga(),
       Cyberbugs.theoDoiEditUserSaga(),
       Cyberbugs.theoDoiDeleteUserSaga(),
       Cyberbugs.theoDoiSearchUserSaga(),
       
       ProjectCategory.theoDoigetAllProjectCategorySaga(),
       ProjectSaga.theoDoiCreateProjectSaga(),
       ProjectSaga.theoDoiGetListProjectSaga(),
       ProjectSaga.theoDoiUpdateProjectSaga(),
       ProjectSaga.theoDoiDeleteProjectSaga(),
       ProjectSaga.theoDoiGetProjectDetailSaga(),
       ProjectSaga.theoDoiGetProjectAllSaga(),

       TaskTypeSaga.theoDoigetAllTaskTypeSaga(),

       PrioritySaga.theoDoiGetAllPrioritySaga(),

       CreateTaskSaga.theoDoiCreateTaskSaga(),
       CreateTaskSaga.theoDoiGetTaskDetailSaga(),
       CreateTaskSaga.theoDoiUpdateTaskStatusSaga(),
       CreateTaskSaga.theoDoiUpdateTaskSaga(),
       CreateTaskSaga.theoDoiHandleChangePostApi(),

       StatusSaga.theoDoiGetAllStatusSaga(),

       CommentSaga.theoDoiGetAllCommentSaga(),
       CommentSaga.theoDoiInsertComment(),
       CommentSaga.theoDoiUpdateCommentSaga(),
       CommentSaga.theoDoiDeleteCommentSaga(),

       




    ])
}
