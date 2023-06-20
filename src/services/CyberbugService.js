
import axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem"


export const cyberbugsService = { 
    signinCyberBugs:  (userLogin) => {
       return axios({
            url:`${DOMAIN_CYBERBUG}/Users/signin`,
            method:'POST',
            data: userLogin
        }) 
    },
    getAllProjectCategory:() =>{
        return axios({
            url:`${DOMAIN_CYBERBUG}/ProjectCategory`,
            method: 'GET',
        })
    },
    createProject: (newProject)=>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProject`,
            method:'POST',
            data:newProject
        })
    },
    createProjectAuthorization: (newProject)=>{
        // console.log(localStorage.getItem(TOKEN))
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method:'POST',
            data:newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
        })
    },
    getAllProject:() =>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    },
    updateProject:(projectUpdate) =>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method:'PUT',
            data:projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}
