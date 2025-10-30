import { json } from "express"
import Task from "../model/Task.js"




export const gettAllTasks = async (req,res)=>{
    try{
        
        const result = await Task.aggregate(
            [
                {
                    $facet :{
                        tasks:[{$sort:{createdAt :-1}}],
                        activeCount:[{$match:{status:"active"}},{$count:"count"}],
                        completeCount:[{$match:{status:"complete"}},{$count:"count"}],

                    }
                }
            ]
        )


        const tasks = result[0].tasks
        const activeCount = result[0].activeCount[0]?.count ||0;
        const completeCount = result[0].completeCount[0]?.count ||0;

        res.status(200).json({tasks , activeCount,completeCount})
    }catch(error){
        console.log(error)
        res.status(500).json({message:'jj'})
    }
}

export const createTasks = async (req,res)=>{
    try{
        const {title} = req.body;
        
        const task = new Task({title})
        const newTask = await task.save();
        res.status(201).json(newTask)
    }catch(error){
        console.log(error)
        res.status(500),json({message:"error"})
    }
    
}
export const updateTasks = async (req,res)=>{
    try {
        const {title,status,completeAt} = req.body;
        const updatedTasks = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completeAt
            },
            {
                new :true
            }
        );
        if(!updateTasks){
            return res.status(404).json({message:"task not found"})
        }
        res.status(200).json(updatedTasks)
    } catch (error) {
        console.log(error)
        res.status(500),json({message:"error"})
    }
}

export const deleteTasks = async (req,res)=>{
    try {
       const deleteT = await Task.findByIdAndDelete(req.params.id);
       if(!deleteTasks){
        return res.status(404).json({message:"task not found"})
       } 
       res.status(200).json(deleteT)
    } catch (error) {
        console.log(error)
        res.status(500),json({message:"error"})
    }
}