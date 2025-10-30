import  Header  from '@/components/Header'
import AddTask from '@/components/AddTask'
import React, { useEffect, useState } from 'react'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import { toast } from 'sonner'
import axios from 'axios'
import api from '@/lib/axios'


const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setactiveTaskCount] = useState(0)
  const [completeTaskCount,setcompleteTaskCount] = useState(0)
  const [filter,setFilter] = useState("all")


  useEffect(()=>{
    fetchTask();
  },[])


  const fetchTask = async () =>{
      try {
        const res = await api.get("/tasks")
        
        setTaskBuffer(res.data.tasks)
        setactiveTaskCount(res.data.activeCount)
        setcompleteTaskCount(res.data.completeCount)
      
      } catch (error) {
        console.error(error)
        toast.error(error)
      }
  }

  const handleTaskChange = ()=>{
      fetchTask();
  }


  //lu ds task
  const filteredTask = taskBuffer.filter((task)=>{
      switch(filter){
        case "active" : 
              return task.status === "active"
              break;
        case "complete" : 
              return task.status === "complete"
              break;
        default : 
              return true
      }
  })

  return (


  <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
    }}
  />

    <div className='container pt-8 mx-auto relative z-1'>
          <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                {/* header */}
                <Header/>
                {/* add task */}
                <AddTask handleNewTaskAdded={handleTaskChange}/>
                {/* stats and filter */}
                <StatsAndFilters 
                activeTasksCount={activeTaskCount}
                completeTaskCount={completeTaskCount}
                filter ={filter}
                setFilter={setFilter} 
                 />
                {/* task list */}
                <TaskList 
                filterTask={filteredTask}
                filter={filter}
                handleTaskChange={handleTaskChange}
                />
                {/* phan trang va loc date */}
                <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                  {/* <TaskListPagination/> */}
                  <DateTimeFilter/>
                </div>
                {/* footer */}
                <Footer activeTaskCount={activeTaskCount} completeTaskCount={completeTaskCount}/>
          </div>
    </div>
  {/* Your Content/Components */}
    </div>





   
  )
}

export default HomePage