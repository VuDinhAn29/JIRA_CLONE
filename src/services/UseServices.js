import { BaseServices } from "./BaseServices";


export class UserService extends BaseServices {
    constructor(){
        super();
    }

    getUser = (keyWord) =>{
        return this.get(`/Users/getUser?keyword=${keyWord}`)
    }

    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject);
    }

    deleteUserFromProject = (userProject) =>{
        return this.post(`Project/removeUserFromProject`,userProject)
    }

    getUserByProjectId = (IdProject) =>{
        return this.get(`Users/getUserByProjectId?idProject=${IdProject}`)
    }

    signUpUser = (userDetails) =>{
        return this.post(`Users/signup`,userDetails)
    }

    editUser = (userDetails) =>{
        return this.put(`Users/editUser`,userDetails)
    }

    deleteUser = (IdUser) =>{
        return this.delete(`Users/deleteUser?id=${IdUser}`)
    } 

    
}

export const userService = new UserService();