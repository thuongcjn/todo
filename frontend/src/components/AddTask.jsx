import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle ,setnewTaskTilte]= useState("")
  const addTask = async ()=>{
    if(newTaskTitle.trim()){
        try {
          await api.post("/tasks",{title:newTaskTitle})
          toast.success(`add task ${newTaskTitle} succes `)
          handleNewTaskAdded();
        } catch (error) {
            console.error(error)
            toast.error(error)
        }

        setnewTaskTilte("");
    }else{
      toast.error("please enter your task")
    }
  }

  const handleKeyPress =(e)=>{
        if(e.key === "Enter"){
          addTask();
        }
  }



  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className='flex flex-col gap-3 sm:flex-row'>
            <Input
            type="text"
            placeholder="add task"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/50"
            value={newTaskTitle}
            onChange={(e)=>setnewTaskTilte(e.target.value)}
            onKeyPress={handleKeyPress}
            />
            <Button
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
            >
            <Plus className='size-5'/>
            Add
            </Button>

        </div>
    </Card>
  )
}

export default AddTask