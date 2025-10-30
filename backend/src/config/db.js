import mongoose from 'mongoose'


export const connect = async () =>{
    try{
        await mongoose.connect(
          process.env.MONGODB_CONNECTION
        );

    console.log("done connect db")
    }catch (error){
        console.log(error)
        process.exit(1);//exit with error
    }
}