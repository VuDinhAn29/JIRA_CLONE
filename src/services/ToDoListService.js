import Axios  from "axios"
import { Domain } from "../util/constants/settingSystem";
import { retry } from "redux-saga/effects";

export class ToDoListService {
    constructor(){

    }
    getTaskApi =() => {
       return Axios({
            url: `${Domain}/ToDoList/GetAllTask`,
            method: 'GET'
       })
    }

    addTaskApi = (taskName) =>{
        return Axios({
            url: `${Domain}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName:taskName
            }
        })
    }

    delTaskApi = (taskName) =>{
        return Axios({
            url: `${Domain}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        })
    }

    checkTaskApi = (taskName)=>{
        return Axios({
            url: `${Domain}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',
        })
    }

    rejectTask = (taskName) =>{
        return Axios({
            url: `${Domain}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',
        })
    }
}

export const toDoListService = new ToDoListService();