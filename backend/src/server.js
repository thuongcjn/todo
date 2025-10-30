import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connect } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
const PORT = process.env.PORT || 5001


dotenv.config()

const app = express()

//midleware 
app.use(express.json())

app.use(cors({origin:"http://localhost:5173"}))


app.use("/api/tasks",taskRoute)

connect().then(()=>{
    app.listen(PORT,()=>{
        console.log('server on port 5001')
    })

})

