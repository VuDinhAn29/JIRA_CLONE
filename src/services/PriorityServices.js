import { BaseServices } from "./BaseServices";


export class PriorityServices extends BaseServices {
    constructor(){
        super();
    }

    getAllPriority = () => {
        return this.get(`Priority/getAll`);
    }
    

   
}

export const priorityServices = new PriorityServices();