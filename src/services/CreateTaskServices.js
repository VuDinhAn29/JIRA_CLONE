import { BaseServices } from "./BaseServices";


export class CreateTaskServices extends BaseServices {
    constructor(){
        super();
    }

    createTask = (taskObject) => {
        return this.post(`Project/createTask`,taskObject);
    }
    

   
}

export const createTaskServices = new CreateTaskServices();