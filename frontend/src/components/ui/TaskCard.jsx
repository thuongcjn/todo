import React, { useState } from 'react'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './input'
import api from '@/lib/axios'





const TaskCard = ({task,index,handleTaskChange}) => {
  
  const [isEditing,setisEditing] = useState(false)
  const [updateTaskTitle ,setupdateTaskTitle] = useState(task.title || "")


  const deleteTask = async (taskId) =>{
    try {
        await api.delete(`/tasks/${taskId}`)
        handleTaskChange();
    } catch (error) {
      console.error(error)
    }
  }
  const handleKeyPress =(e)=>{
        if(e.key === "Enter"){
          updateTask();
        }
  }

  const updateTask = async () =>{
    try {
      setisEditing(false)
      await api.put(`/tasks/${task._id}`,{title:updateTaskTitle})
      handleTaskChange()
    } catch (error) {
        console.error(error)
    }
  }

  const toggleToast = async () =>{
      try {
        if(task.status === "active"){
          await api.put(`/tasks/${task._id}`,{
            status:"complete",
            completeAt: new Date().toISOString()
          })
        }else {
          await api.put(`/tasks/${task._id}`,{
            status:"active",
            completeAt:null
          })
        }
        handleTaskChange()
      } catch (error) {
          console.log(error)
      } 
  }
  return (
      <>
        <Card className={cn(
          "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
          task.status === "complete" && 'opacity-75'
        

        )}
        style={{amimationDelay:`${index * 50}ms`}}>

        <div className='flex items-center gap-4'>
          {/* nut tron */}
            <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "complete" ? 
              "text-success hover:text-succes/80" 
              :"text-muted-foreground hover:text-primary"
             )}
             onClick ={toggleToast}
            >
              {task.status === "complete" ? (
                  <CheckCircle2 className='size-5'/>
              ) : (<Circle className='size-5'/>

              )}
              
            </Button>


            {/* hien thi hoac chinh sua title */}
              <div className='flex-1 min-w-0 '>
                    {isEditing ? (
                      <Input
                        placeholder="can phai lam gi ?"
                        className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                        type="text"
                        value={updateTaskTitle}
                        onChange= {e => setupdateTaskTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={()=>{
                          setisEditing(false)
                          setupdateTaskTitle(task.title || "")
                        }}
                      />
                    ):(
                      <p className={cn(
                        "text-base transition-all duration-200",
                        task.status === "complete" ? 
                        "line-through text-muted-foreground"
                        : "text-foreground"
                      )}>
                        {task.title}
                      </p>

                    )}

                     {/* ngay tao va ngay hoan thanh */}
                <div className="flex items-center gap-2 mt-1">
                    <Calendar className='size-3 text-muted-foreground'/>
                    <span className='text-xs  text-muted-foreground'>
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                    {task.completeAt && (
                      <>
                          <span className='text-xs text-muted-foreground'>-</span>
                          <Calendar className='size-3 text-muted-foreground'/>
                          <span className='text-xs text-muted-foreground'>
                            {new Date(task.completeAt).toLocaleString()}
                          </span>
                      </>
                    )}



                </div>
              </div>

               

                {/* nut chinh va nut xoa */}
                 <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                  {/* edit btn */}
                  <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                  onClick={()=>{
                    setisEditing(true)
                    setupdateTaskTitle(task.title ||"")
                  }}
                  >
                      <SquarePen className='size-4 '/> 
                  

                  </Button>
                  {/* delete btn */}
                  <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                  onClick={()=>deleteTask(task._id)}
                  >
                      <Trash2 className='size-4 '/> 
                  

                  </Button>

                  </div>     

        </div>


        </Card>
      </>
  )
}

export default TaskCard