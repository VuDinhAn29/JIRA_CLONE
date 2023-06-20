import { BaseServices } from "./BaseServices";


export class StatusServices extends BaseServices {
    constructor(){
        super();
    }

    getAllStatus = () =>{
        return this.get(`Status/getAll`);
    }
}

export const statusServices = new StatusServices();