
import mongoose from "mongoose";
 
const MONGOOSE_URL= process.env.MONGODB_URL
let isConnected=false
async function dbConnection() {

    if(isConnected){
        console.log("Mongo alrady connected !!")
        return
    }
    
    try {
        const db=await mongoose.connect(MONGOOSE_URL)
        isConnected=db.connections[0].readyState===1
        console.log("connected to mongodb",db)
        
    } catch (error) {
        console.log("Failed to connect to mongodb",error)
        throw error
        
    }
    
}
 export default dbConnection;