import { BaseServices } from "./BaseServices";


export class TaskServices extends BaseServices {
    constructor(){
        super();
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`);
    }

    updateStatusTask = (taskStatusUpdate) =>{
        return this.put(`Project/updateStatus`,taskStatusUpdate)
    }
    
    updateTask = (taskUpdate) =>{
        return this.post(`Project/updateTask`,taskUpdate)
    }

   
}

export const taskServices = new TaskServices();