import { BaseServices } from "./BaseServices";


export class TaskTypeServices extends BaseServices {
    constructor(){
        super();
    }

    getAllTaskType = () => {
        return this.get(`TaskType/getAll`);
    }
    

   
}

export const taskTypeServices = new TaskTypeServices();