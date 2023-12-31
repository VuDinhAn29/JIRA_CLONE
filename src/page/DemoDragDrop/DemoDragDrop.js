import { useSpring } from '@react-spring/web';
import React, { useRef, useState } from 'react'

const defaultValue = [
  { id: 1, taskName: 'Task 1' },
  { id: 2, taskName: 'Task 2' },
  { id: 3, taskName: 'Task 3' },
  { id: 4, taskName: 'Task 4' },
  { id: 5, taskName: 'Task 5' },
]

export default function DemoDragDrop(props) {

  const [taskList,setTaskList] = useState(defaultValue);
  const tagDrag = useRef({})
  const tagDragEnter = useRef({})
  //Animation
  const [propsSpring, set, stop] = useSpring(() => ({ from: { bottom: -25 }, to: { bottom: 0 },config:{duration:250},reset:true }));

  const handleDragStart = (e,task,index) =>{
    console.log(e.target);
    console.log(task);
    //Lưu lại giá trị của task đang drag
    tagDrag.current = task;
  }

  const handleDragEnter = (e,taskDragEnter,index) =>{
    let taskListUpdate = [...taskList];
    //Lấy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(task=>task.id === tagDrag.current.id);
    //Lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(task=>task.id === taskDragEnter.id);

    //Biến chứa giá trị thằng đang kéo 
    let temp = taskListUpdate[indexDragTag];
    //Lấy giá trị tại vị trí đang kéo gán = thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    //Lấy thằng kéo qua gán = đang kéo
    taskListUpdate[indexDragEnter] =temp;
    
    setTaskList(taskListUpdate);
  }


  return (
    <div className='container'>
        <div className='text-center display-4'>
                 Task list     
        </div>
        <div className='row'>
           <div className='col-2'></div>
           <div className='bg-dark p-5 col-4'>
               {taskList.map((task,index)=>{
                   return <div
                   onDragStart={(e)=>{handleDragStart(e,task,index)}} 
                   onDragEnter={(e)=>{handleDragEnter(e,task,index)}}
                   draggable="true"                    
                   key={index} 
                   className='bg-success text-white m-1 p-3 ' >
                        {task.taskName}
                   </div>
               })}
           </div>
           <div className='col-2 bg-primary'  style={{ height: 500 }}></div>
        </div>
    </div>
  )
}
