const mongoose = require('mongoose');
const { MONGO_URI, DB_NAME } = require('../constants');

const connectDB = async() =>{

    try{
        const conn = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`,{
            serverSelectionTimeoutMS: 5000
        });

        console.log(`MongoDB Connected | HOST: ${conn.connection.host}  | DB: ${conn.connection.name}`);
    }
    catch(error){
         console.error("❌ MongoDB connection failed:", error.message);
         throw error;
    }
}

const gracefulShutdown = async(signal) => {
console.log(`⚠️ Received ${signal}. Closing MongoDB connection...`);

if(mongoose.connection.readyState === 1){
    await mongoose.connection.close();
}
 console.log("🔌 MongoDB disconnected");
  process.exit(0);
}

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((siganl)=>{
    process.on(siganl, ()=>gracefulShutdown(siganl));
})

module.exports = connectDB;