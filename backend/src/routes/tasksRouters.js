import express from "express"
import  
{ 
    createTasks,
    deleteTasks, 
    gettAllTasks, 
    updateTasks
}  from "../controller/taskController.js";

const router = express.Router();



router.get("/" , gettAllTasks)
router.post("/" , createTasks)
router.put("/:id" , updateTasks)
router.delete("/:id" , deleteTasks)

export default router;