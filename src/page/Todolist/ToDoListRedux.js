import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddTaskApi, checkTaskApi, delTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';


export default function ToDoListRedux(props) {
    
    const {taskList} = useSelector(state=>state.ToDoListReducer);
    const dispatch = useDispatch();


    let [state, setState] = useState({
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }


        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }
    const getTaskList = () => {
        dispatch(getTaskListApi());
    }

    const addTask = (e) => {
        e.preventDefault();//Chặn sự kiện reload lại trang
        e.preventDefault(); //Dừng sự kiện submit form
        dispatch(AddTaskApi(state.values.taskName))
       
    }
    //Xử lý reject task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName))
    }

    //Xử lý done task
    const checkTask = (taskName) => {
        dispatch(checkTaskApi(taskName))
    }


    //Hàm xử lý xóa task
    const delTask = (taskName) => {
        dispatch(delTaskApi(taskName))
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Chặn sự kiện reload lại trang
    }


    useEffect(() => {
        getTaskList();


        return () => {

        }
    }, [])



    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i class="fa fa-check-circle"></i>
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskToDoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        rejectTask(item.taskName)
                    }}>
                        <i className="fa fa-undo"></i>
                    </button>
                </div>
            </li>
        })
    }
    return (
        <div className="card">
            <div className="card__header">
                <img src={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}
