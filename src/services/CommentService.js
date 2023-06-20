import { BaseServices } from "./BaseServices";


export class CommentService extends BaseServices{
     constructor(){
        super()
     }

     getAllComment = (taskId)=>{
        return this.get(`Comment/getAll?taskId=${taskId}`)
     }
     insertComment = (newComment) =>{
        return this.post(`Comment/insertComment`,newComment)
     }
     updateComment= (commentId,commentContent)=>{
        return this.put(`Comment/updateComment?id=${commentId}&contentComment=${commentContent}`)
     }
     deleteComment= (idComment) =>{
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
     }
}

export const commentService = new CommentService();